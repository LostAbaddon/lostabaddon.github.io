(()=>{const s=Symbol("update"),a=100,c=h=>!(isNaN(h)||typeof h!="number");class i{constructor(e=100){this.cache=new Map,this.secondary=new Map,this.limit=c(e)?e:a,this.length=0}set(e,t){this.cache.has(e)?this.cache.set(e,t):this[s](e,t)}get(e){var t=this.cache.get(e);return t!==void 0||(t=this.secondary.get(e),t!==void 0&&this[s](e,t)),t}del(e){this.cache.has(e)&&this.length--,this.cache.delete(e),this.secondary.delete(e)}has(e){return this.cache.has(e)||this.secondary.has(e)}clear(){this.cache.clear(),this.secondary.clear(),this.length=0}[s](e,t){this.length++,this.length>=this.limit&&(this.secondary=this.cache,this.cache=new Map,this.length=0),this.cache.set(e,t)}}self.LRUCache=i})();
