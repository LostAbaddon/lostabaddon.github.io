if(self.global=self,self.DataCenter={dbs:new Map,_waiters:new Map,waitForReady:e=>new Promise(a=>{var n=DataCenter.dbs.get(e);if(!!n&&n.ready)return a();var t=DataCenter._waiters.get(e);t||(t=new Set,DataCenter._waiters.set(e,t)),t.add(a)}),resumeWaiters(e){var a=DataCenter._waiters.get(e);if(!!a){var n=[...a];a.clear(),DataCenter._waiters.delete(e),n.forEach(t=>t())}},async _initAPIData(){var e="APIData",a=new CachedDB(e,1);DataCenter.dbs.set(e,a),a.onUpdate(()=>{a.open("data","url",10),console.log("DataCenter::APIData Updated")}),a.onConnect(()=>{console.log("DataCenter::APIData Connected")}),await a.connect(),DataCenter.resumeWaiters(e)},async _initBookShelf(){var e="localBookShelf",a=new CachedDB(e,1);DataCenter.dbs.set(e,a),a.onUpdate(()=>{a.open("article","id"),a.open("list","id",0,["publish"]),console.log("BookShelf::CacheStorage Updated")}),a.onConnect(()=>{console.log("BookShelf::CacheStorage Connected")}),await a.connect(),DataCenter.resumeWaiters(e)},async init(){await Promise.all([DataCenter._initAPIData(),DataCenter._initBookShelf()])},onConnect(e,a){if(e=DataCenter.get(e),!e)return a(null);e.onConnect(a)},onUpdate(e,a){if(e=DataCenter.get(e),!e)return a(null);e.onUpdate(a)},async get(e,a,n){var t=DataCenter.dbs.get(e);if(!!t&&(t.ready||await DataCenter.waitForReady(e),!!t.available))return await t.get(a,n)},async set(e,a,n,t){var r=DataCenter.dbs.get(e);return!r||(r.ready||await DataCenter.waitForReady(e),!r.available)?null:await r.set(a,n,t)},async all(e,a,n){var t=DataCenter.dbs.get(e);return!t||(t.ready||await DataCenter.waitForReady(e),!t.available)?null:await t.all(a,n)},async del(e,a,n){var t=DataCenter.dbs.get(e);return!t||(t.ready||await DataCenter.waitForReady(e),!t.available)?null:await t.del(a,n)},async clear(e,a){var n=DataCenter.dbs.get(e);return!n||(n.ready||await DataCenter.waitForReady(e),!n.available)?null:(n.clearCache(a),await n.clear(a))}},!self.window){importScripts("/js/lrucache.js"),importScripts("/js/cachedDB.js");let e=(a,n)=>async({data:t})=>{if(t==="suicide"){a.close();return}console.log("DataCenter::Task: "+t.dbName+"/"+t.store+"/"+t.action);var r=DataCenter[t.action],i=null;r&&(i=await DataCenter[t.action](t.dbName,t.store,t.key,t.value)),n.postMessage({tid:t.tid,result:i})};self.onconnect!==void 0?(self.onconnect=({ports:a})=>{console.log("Shared-Worker DataCenter Connected!");var n=a[0];n.onmessage=e(n,n)},console.log("Shared-Worker DataCenter is READY!")):(self.onmessage=e(port,self),console.log("Dedicated-Worker DataCenter is READY!")),DataCenter.init()}
