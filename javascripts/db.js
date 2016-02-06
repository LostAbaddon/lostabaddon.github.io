(function (root) {
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
		else if (type === 'string') {
			keywords = [keywords];
		}
		var store = this.db.transaction(this.table).objectStore(this.table);
		var result = [];
		var request = store.openCursor()
		request.onsuccess = function (event) {
			var cursor = event.target.result;
			var rec;
			if (cursor) {
				if (!keywords) {
					result.push(cursor.value);
				}
				else {
					rec = [];
					keywords.map(function (key) {
						rec[key] = cursor.value[key];
					});
					result.push(rec);
				}
				cursor.continue();
			}
			else {
				if (callback) callback(result);
			}
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
		var putRecord = function () {
			var store = db.transaction(table, 'readwrite').objectStore(table);
			var request = store.put(record);
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
					putRecord();
				}
			},
			putRecord,
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
				if (callbacks.oninit) callbacks.oninit(db);
			}
			else if (version !== dbVersion) {
				if (callbacks.onupgradeneeded) callbacks.onupgradeneeded(db);
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

CommonUtils.dbManager.deleteDB('LifeGame');
CommonUtils.dbManager.openDB({
	name: 'LifeGame',
	version: 1,
	callbacks: {
		onsuccess: function (db) {
			console.log('Open Success!');
			console.log(db);
			var table = db.getTable('LifeGame');
			table.getAllRecords(
				function (records) {
					console.log(records);
					table.queryRecordWithKey(2,
						function (record) {
							console.log(record);
							table.addRecord(2,
								{
									Life: 20,
									value: 48
								},
								true,
								function () {
									console.log('Added');
									table.removeRecord(1,
										function () {
											console.log('Removed');
											table.getAllRecords(function (records) {
												console.log(records);
											});
										}
									);
								},
								function (err) {
									console.error(err);
								}
							);
						},
						function () {
							console.log('Not Found');
						},
						function (err) {
							console.error(err);
						}
					);
				},
				function (err) {
					console.error(err);
				}
			);
		},
		onerror: function (err) {
			console.log('Open Failed!');
			console.log(err);
		},
		oninit: function (db) {
			console.log('Open Init!');
			console.log(db);
			var table = db.getTable('LifeGame');
			table.initTableWithRecords('Life', [
				{
					Life: 1,
					value: 1,
				},
				{
					Life: 2,
					value: 2,
				},
				{
					Life: 3,
					value: 3,
				},
			]);
		},
		onupgradeneeded: function (db) {
			console.log('Open Upgraded!');
			console.log(db);
		},
	},
});