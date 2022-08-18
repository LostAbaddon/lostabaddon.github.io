// IndexDB Wrapper
(() => {
	class CachedDB {
		constructor (name, version) {
			this._name = name;
			this._version = version;
			this.conn = null;
			this.db = null;
			this.cbUpdates = [];
			this.cbConnects = [];
			this.caches = {};
			this.ready = false;
			this.available = false;
		}
		connect () {
			return new Promise((res, rej) => {
				this.conn = indexedDB.open(this.name, this.version);
				this.conn.onupgradeneeded = evt => {
					this.db = this.conn.result;
					this.cbUpdates.forEach(cb => cb(this));
				};
				this.conn.onsuccess = evt => {
					this.ready = true;
					this.available = true;
					this.db = this.conn.result;
					this.cbConnects.forEach(cb => cb(this));
					res(this);
				};
				this.conn.onerror = err => {
					this.ready = true;
					this.available = false;
					rej(err);
				};
			});
		}
		onConnect (cb) {
			this.cbConnects.push(cb);
		}
		onUpdate (cb) {
			this.cbUpdates.push(cb);
		}
		open (name, keyPath='id', cacheSize=0, indexes) {
			if (!this.db.objectStoreNames.contains(name)) {
				let store = this.db.createObjectStore(name, { keyPath });
				store.createIndex(keyPath, keyPath, { unique: true });
				if (!!indexes && indexes.length > 0) {
					indexes.forEach(idx => {
						store.createIndex(idx, idx, { unique: false });
					});
				}
			}
			if (cacheSize > 0) this.cache(keyPath, cacheSize);
		}
		cache (name, size) {
			if (!this.caches[name]) {
				this.caches[name] = new LRUCache(size);
			}
		}
		set (store, key, value) {
			return new Promise((res, rej) => {
				var tx = this.db.transaction([store], "readwrite");
				if (!tx) rej(new Error('Open IndexedDB Transaction Failed: ' + store));
				var cache = tx.objectStore(store);
				if (!store) rej(new Error('Open IndexedDB ObjectStore Failed: ' + store));

				var item = {};
				[...cache.indexNames].forEach(id => {
					item[id] = value[id];
				});
				item[cache.keyPath] = key;
				item.data = value;
				var result = cache.put(item);
				result.onsuccess = evt => {
					var ufc = this.caches[store];
					if (!!ufc) ufc.set(key, value);
					res(evt.result);
				};
				result.onerror = err => {
					rej(err);
				};
			});
		}
		get (store, key) {
			return new Promise((res, rej) => {
				var tx = this.db.transaction([store], "readonly");
				if (!tx) rej(new Error('Open IndexedDB Transaction Failed: ' + store));
				var cache = tx.objectStore(store);
				if (!store) rej(new Error('Open IndexedDB ObjectStore Failed: ' + store));
				var index = cache.index(cache.keyPath);

				var ufc = this.caches[store], result;
				if (!!ufc) {
					result = ufc.get(key);
					if (result !== undefined) return res(result);
				}

				result = index.get(key);
				result.onsuccess = evt => {
					if (!evt.target.result) res(undefined);
					else res(evt.target.result.data);
				};
				result.onerror = err => {
					rej(err);
				};
			});
		}
		all (store, idx, keys) {
			return new Promise((res, rej) => {
				var tx = this.db.transaction([store], "readonly");
				if (!tx) rej(new Error('Open IndexedDB Transaction Failed: ' + store));
				var cache = tx.objectStore(store);
				if (!store) rej(new Error('Open IndexedDB ObjectStore Failed: ' + store));
				var index;
				try {
					index = cache.index(idx || cache.keyPath);
				}
				catch (err) {
					rej(err);
					return;
				}

				var result = index.getAll();
				var getAll = !keys;
				if (!getAll) {
					if (typeof keys === 'string') {
						keys = [keys];
					}
					else if (!(keys instanceof Array)) {
						getAll = true;
					}
				}
				result.onsuccess = evt => {
					var list = evt.target.result;
					if (!list) return res(list);
					var isPrime = !idx || (idx === cache.keyPath);
					var result = isPrime ? {} : [];
					list.forEach(item => {
						if (isPrime) {
							let key = item[cache.keyPath];
							let data = item.data;
							if (getAll) {
								result[key] = data;
							}
							else {
								let d = {};
								keys.forEach(k => d[k] = data[k]);
								result[key] = d;
							}
						}
						else {
							result.push(item.data);
						}
					});
					res(result);
				};
				result.onerror = err => {
					rej(err);
				};
			});
		}
		del (store, key) {
			return new Promise((res, rej) => {
				var tx = this.db.transaction([store], "readwrite");
				if (!tx) rej(new Error('Open IndexedDB Transaction Failed: ' + store));
				var cache = tx.objectStore(store);
				if (!store) rej(new Error('Open IndexedDB ObjectStore Failed: ' + store));

				var result = cache.delete(key);
				result.onsuccess = evt => {
					var ufc = this.caches[store];
					if (!!ufc) ufc.del(key);
					res(evt.result);
				};
				result.onerror = err => {
					rej(err);
				};
			});
		}
		clear (store) {
			return new Promise((res, rej) => {
				var tx = this.db.transaction([store], "readwrite");
				if (!tx) rej(new Error('Open IndexedDB Transaction Failed: ' + store));
				var cache = tx.objectStore(store);
				if (!store) rej(new Error('Open IndexedDB ObjectStore Failed: ' + store));

				var result = cache.clear();
				result.onsuccess = evt => {
					var ufc = this.caches[store];
					if (!!ufc) ufc.clear();
					res(evt.result);
				};
				result.onerror = err => {
					rej(err);
				};
			});
		}
		clearCache (store) {
			var ufc = this.caches[store];
			if (!ufc) return;
			ufc.clear();
		}

		get name () {
			return this._name;
		}
		get version () {
			return this._version;
		}
	}

	window.CachedDB = CachedDB;
}) ();