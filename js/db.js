(function (root) {
	"use strict";

	if (!root.indexedDB) return;
	const indexedDB = root.indexedDB;

	function TableOperator (db, table) {
		this.db = db;
		this.table = table;
	}
	TableOperator.prototype.initTableWithRecords = function (keyword, records) {
		var store = this.db.createObjectStore(this.table, {keyPath: keyword});
		records.map(function (record) {
			if (!record[keyword] && (record[keyword] !== 0)) return;
			store.add(record);
		});
	};
	TableOperator.prototype.getAllRecords = function (keywords, callback, onerror) {
		var type = typeof keywords;
		if (type === 'function') {
			onerror = callback;
			callback = keywords;
			keywords = null;
		}
		else if (keywords === '') {
			keywords = null;
		}
		else if (type === 'string') {
			keywords = [keywords];
		}
		var store = this.db.transaction(this.table).objectStore(this.table);
		var result = [];
		var request = store.getAll();
		request.onsuccess = function (event) {
			var rec;
			event.target.result.map(function (record) {
				if (!keywords) {
					result.push(record);
				}
				else {
					rec = {};
					keywords.map(function (key) {
						rec[key] = record[key];
					});
					result.push(rec);
				}
			});
			if (callback) callback(result, store);
		};
		request.onerror = function (event) {
			if (onerror) onerror(event.target.error);
		};
	};
	TableOperator.prototype.getAllRecordsWithIndex = function (index, key, keywords, callback, onerror) {
		var type = typeof key;
		if (type === 'function') {
			onerror = keywords;
			callback = key;
			keywords = null;
			key = null;
		}
		else if (type !== 'string') {
			onerror = callback;
			callback = keywords;
			keywords = key;
			key = null;
		}
		else if (key === undefined || key === null || key === '') {
			key = null;
		}
		type = typeof keywords;
		if (type === 'function') {
			onerror = callback;
			callback = keywords;
			keywords = null;
		}
		else if (keywords === '') {
			keywords = null;
		}
		else if (type === 'string') {
			keywords = [keywords];
		}
		var store = this.db.transaction(this.table).objectStore(this.table).index(index);
		var result = [];
		var request;
		if (!!key) {
			request = store.getAll(key);
		}
		else {
			request = store.getAll();
		}
		request.onsuccess = function (event) {
			var rec;
			event.target.result.map(function (record) {
				if (!keywords) {
					result.push(record);
				}
				else {
					rec = {};
					keywords.map(function (key) {
						rec[key] = record[key];
					});
					result.push(rec);
				}
			});
			if (callback) callback(result);
		};
		request.onerror = function (event) {
			if (onerror) onerror(event.target.error);
		};
	};
	TableOperator.prototype.queryRecordWithKey = function (key, onsuccess, onfailed, onerror) {
		var store = this.db.transaction(this.table).objectStore(this.table);
		var request = store.get(key);
		request.onsuccess = function (event) {
			var value = event.target.result;
			if (value) {
				if (onsuccess) onsuccess(value, store);
			}
			else {
				if (onfailed) onfailed(store);
			}
		};
		request.onerror = function (event) {
			if (onerror) onerror(event.target.error);
		};
	};
	TableOperator.prototype.addRecord = function (key, record, force, callback, onerror) {
		if (typeof force === 'function') {
			onerror = callback;
			callback = force;
			force = false;
		}
		else {
			force = !! force;
		}
		var db = this.db, table = this.table;
		var putRecord = function (isAdd) {
			var store = db.transaction(table, 'readwrite').objectStore(table);
			var request;
			if (isAdd) request = store.add(record);
			else request = store.put(record);
			request.onsuccess = function (event) {
				if (callback) callback(event.target.result, store);
			};
			request.onerror = function (event) {
				if (onerror) onerror(event.target.error);
			};
		};
		this.queryRecordWithKey(key,
			function found (old_value) {
				if (!force) {
					if (onerror) onerror({
						isDuplicated: true,
						message: 'Has Record with Key ' + key
					});
				}
				else {
					putRecord(false);
				}
			},
			function not_found () {
				putRecord(true);
			},
			onerror
		);
	};
	TableOperator.prototype.removeRecord = function (key, callback, onerror) {
		var db = this.db, table = this.table;
		this.queryRecordWithKey(key,
			function found () {
				var store = db.transaction(table, 'readwrite').objectStore(table);
				var request = store.delete(key);
				request.onsuccess = function (event) {
					if (callback) callback(store);
				};
				request.onerror = function (event) {
					if (onerror) onerror(event.target.error);
				};
			},
			function not_found () {
				if (onerror) onerror({
					isEmpty: true,
					message: 'No Record with Key ' + key
				});
			},
			onerror
		);
	};

	function DBOperator (db) {
		this.db = db;
		this.version = db.version;
		this.tables = [];
	}
	DBOperator.prototype.getTable = function (table, restore) {
		if (restore === undefined || restore === null) restore = true;
		if (this.tables[table]) {
			return this.tables[table];
		}
		else {
			table = new TableOperator(this.db, table);
			if (restore) this.tables[table] = table;
			return table;
		}
	};

	var DBManager = {};
	DBManager.openDB = function (info) {
		createDatabase(info.name, info.version, info.callbacks);
	};
	DBManager.deleteDB = function (dbName) {
		return deleteDatabase(dbName);
	};

	function createDatabase (dbName, dbVersion, callbacks) {
		if (!dbVersion) dbVersion = 1;
		var request = indexedDB.open(dbName, dbVersion);
		request.onerror = function (event) {
			var err = event.target.error;
			if (callbacks.onerror) callbacks.onerror(err);
		};
		request.onsuccess = function (event) {
			var db = new DBOperator(event.target.result);
			if (callbacks.onsuccess) callbacks.onsuccess(db);
		};
		request.onupgradeneeded = function (event) {
			var db = new DBOperator(event.target.result);
			var version = db.version;
			if (version === 1) {
				if (callbacks.oninit) callbacks.oninit(db, event.target.transaction);
			}
			else {
				if (callbacks.onupgradeneeded) callbacks.onupgradeneeded(db, event.target.transaction);
			}
		};
	}
	function deleteDatabase (dbName) {
		var result = false;
		try {
			indexedDB.deleteDatabase(dbName);
			result = true;
		}
		catch (err) {
			console.error(err.getMessage);
		}
		return result;
	}

	// Export
	root.CommonUtils.dbManager = DBManager;
}) (window);