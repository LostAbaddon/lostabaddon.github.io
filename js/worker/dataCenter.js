self.global=self;const SearchCenter={foliationalize(e,r=[],i=[]){e=e.replace(/(^\s+|\s+$)/g,"");var t=0,n=[];if(e.replace(/(reg\(|\(|\))/g,(l,s,o)=>{if(l==="reg(")n.push([o,t]),t++;else if(l==="(")t++;else if(l===")"){t--;let u=n[n.length-1];if(!u)return;t===u[1]&&n.push(o)}}),t!==0)throw new Error("\u67E5\u8BE2\u6307\u4EE4\u8BED\u6CD5\u9519\u8BEF\uFF0C\u672A\u95ED\u5408\uFF01");n=n.map(l=>l.length?l[0]:l);var a=n.length;if(Math.floor(a/2)*2!==a)throw new Error("\u67E5\u8BE2\u6307\u4EE4\u8BED\u6CD5\u9519\u8BEF\uFF0C\u672A\u95ED\u5408\uFF01");for(let l=a/2-1;l>=0;l--){let s=n[2*l],o=n[2*l+1],u=e.substring(s+4,o);u=u.match(/^\/(.*)\/([gi]*)/);let p=u[2]||"";p.indexOf("g")<0&&(p=p+"g"),u=u[1].replace(/\\/g,"\\\\").replace(/\//g,"\\/");let h=new RegExp(u,p),g=i.length;i[g]=h,e=e.substring(0,s)+"[REG:"+g+"]"+e.substring(o+1)}if(n=[],e.replace(/(T|C|K|reg)?(\\*)([\(\)（）])/g,(l,s,o,u,p)=>{var h=(o||"").length;h>>1<<1===h&&(s=s||"",p+=h+s.length,u==="("||u==="\uFF08"?(t===0&&n.push(s,p),t++):(t--,t===0&&n.push(p)))}),t!==0)throw new Error("\u67E5\u8BE2\u6307\u4EE4\u8BED\u6CD5\u9519\u8BEF\uFF0C\u672A\u95ED\u5408\uFF01");if(a=n.length,Math.floor(a/3)*3!==a)throw new Error("\u67E5\u8BE2\u6307\u4EE4\u8BED\u6CD5\u9519\u8BEF\uFF0C\u672A\u95ED\u5408\uFF01");for(let l=a/3-1;l>=0;l--){let s=3*l;if(n[s]){n[s]==="reg";continue}let o=n[s+1],u=n[s+2],p=e.substring(o+1,u),h=r.length;r[h]=p,r[h]=this.foliationalize(p,r),e=e.substring(0,o-1)+"[SUB:"+h+"]"+e.substring(u+1)}a=0;var f=[],c=[];return e.replace(/\s*([\+\-\*])\s*/g,(l,s,o)=>{var u=e.substring(a,o).replace(/(^\s*|\s*$)/g,"");if(!u)throw new Error("\u641C\u7D22\u6307\u4EE4\u51FA\u73B0\u7A7A\u8868\u8FBE\u5F0F\uFF01");a=o+l.length,c.push(s),f.push(u)}),f.push(e.substring(a).replace(/(^\s*|\s*$)/g,"")),f=f.map(l=>{var s="C",o=l;return l.indexOf("T(")===0?(s="T",o=l.replace(/(^T\(|\)$)/g,"")):l.indexOf("C(")===0?o=l.replace(/(^C\(|\)$)/g,""):l.indexOf("K(")===0?(s="K",o=l.replace(/(^K\(|\)$)/g,"")):l.indexOf("[SUB:")===0&&(s="G"),{type:s,exp:o}}),{parts:f,ops:c,subs:r,regs:i}},prepareCloudArticle(e,r,i){var t={},n={};for(let a in e){let f=e[a].data;if(!f)continue;let c=a.replace(r,""),l=a.replace(i,"");a.indexOf(r)>=0&&!!c.match(/^\/\w+\-\d+\.json$/i)?f.articles.forEach(s=>{if(s.type==="article"){var o="/"+s.sort+"/"+s.filename,u=t[o];(!u||s.publish>u.timestamp)&&(u={url:o,type:"cloud",title:s.title,keywords:"",content:s.description,author:s.author,timestamp:s.publish||0,score:0},t[o]=u)}}):a.indexOf(i)>=0&&!!l.match(/\.m[du]/i)&&(l.match(/\/info\.md/i)||(n[l]=f))}return t=Object.keys(t).map(a=>t[a]),t.forEach(a=>{var f=a.url,c=n[f];c&&(a.content=c)}),t},prepareEdgeArticle(e,r,i){var t=Object.keys(e).map(n=>{var a=e[n];return{url:a.id,type:"edge",title:a.title,keywords:a.category.map(f=>i[f]||f).join(", "),content:r[n].content,author:a.author,timestamp:a.publish||0,score:0}});return t},searchViaCommand(e,r){var i=e.ops.length,t=this.searchLogicly(e.parts[0],r,e.regs,e.subs);for(let n=0;n<i;n++){let a=e.ops[n],f=e.parts[n+1],c;a==="+"?c=r:c=t;let l=this.searchLogicly(f,c,e.regs,e.subs);if(!!l){if(a==="+")for(let s of l)t.add(s);else if(a==="*")t=l;else if(a==="-")for(let s of l)t.delete(s)}}return t},countKeyword(e,r){for(var i=0,t=0;;){let n=r.indexOf(e,t);if(n<0)break;i++,t=n+e.length}return i},searchLogicly(e,r,i,t){var n=new Set,a=e.exp,f=a.match(/^\[REG:(\d+)\]$/i);if(f?(a=f[1]*1,isNaN(a)?(f=!1,a=e.exp):(a=i[a],a?f=!0:(f=!1,a=e.exp))):f=!1,e.type==="G"){a=e.exp;let l=a.match(/^\[SUB:(\d+)\]$/i);if(l&&(l=l[1]*1,!isNaN(l)&&(l=t[l],l)))return this.searchViaCommand(l,r)}var c="content";if(e.type==="T"?c="title":e.type==="K"&&(c="keywords"),f)for(let l of r){let o=l[c].match(a);o?o=o.length:o=0,!(o<=0)&&(l.score+=Math.round(Math.log(o)*5+10),n.add(l))}else for(let l of r){let s=this.countKeyword(a,l[c]);s<=0||(l.score+=Math.round(Math.log(s)*5+10),n.add(l))}return n}};if(self.DataCenter={dbs:new Map,_waiters:new Map,waitForReady:e=>new Promise(r=>{var i=DataCenter.dbs.get(e);if(!!i&&i.ready)return r();var t=DataCenter._waiters.get(e);t||(t=new Set,DataCenter._waiters.set(e,t)),t.add(r)}),resumeWaiters(e){var r=DataCenter._waiters.get(e);if(!!r){var i=[...r];r.clear(),DataCenter._waiters.delete(e),i.forEach(t=>t())}},async _initAPIData(){var e="APIData",r=new CachedDB(e,2);DataCenter.dbs.set(e,r),r.onUpdate(()=>{r.open("data","url",10),r.open("index","url",10),console.log("DataCenter::APIData Updated")}),r.onConnect(()=>{console.log("DataCenter::APIData Connected")}),await r.connect(),DataCenter.resumeWaiters(e)},async _initBookShelf(){var e="localBookShelf",r=new CachedDB(e,1);DataCenter.dbs.set(e,r),r.onUpdate(()=>{r.open("article","id"),r.open("list","id",0,["publish"]),console.log("BookShelf::CacheStorage Updated")}),r.onConnect(()=>{console.log("BookShelf::CacheStorage Connected")}),await r.connect(),DataCenter.resumeWaiters(e)},async init(){await Promise.all([DataCenter._initAPIData(),DataCenter._initBookShelf()])},onConnect(e,r){if(e=DataCenter.get(e),!e)return r(null);e.onConnect(r)},onUpdate(e,r){if(e=DataCenter.get(e),!e)return r(null);e.onUpdate(r)},async get(e,r,i){var t=DataCenter.dbs.get(e);if(!!t&&(t.ready||await DataCenter.waitForReady(e),!!t.available))return await t.get(r,i)},async set(e,r,i,t){var n=DataCenter.dbs.get(e);return!n||(n.ready||await DataCenter.waitForReady(e),!n.available)?null:await n.set(r,i,t)},async all(e,r,i){var t=DataCenter.dbs.get(e);return!t||(t.ready||await DataCenter.waitForReady(e),!t.available)?null:await t.all(r,i)},async del(e,r,i){var t=DataCenter.dbs.get(e);return!t||(t.ready||await DataCenter.waitForReady(e),!t.available)?null:await t.del(r,i)},async clear(e,r){var i=DataCenter.dbs.get(e);return!i||(i.ready||await DataCenter.waitForReady(e),!i.available)?null:(i.clearCache(r),await i.clear(r))},async searchArticle(e,r="",i="",t={}){!!self.window&&!!self.window.Barn&&(r=r||Barn.API,i=i||Barn.DataGranary);var n=e,a=Date.now();try{e=SearchCenter.foliationalize(e)}catch(h){return console.error(h),h}var[f,c,l]=await Promise.all([DataCenter.all("APIData","data"),DataCenter.all("localBookShelf","article"),DataCenter.all("localBookShelf","list")]),s=SearchCenter.prepareCloudArticle(f,r,i),o=SearchCenter.prepareEdgeArticle(l,c,t),u=new Set([...s,...o]),p=SearchCenter.searchViaCommand(e,u);return p=[...p],p.sort((h,g)=>g.score-h.score),p=p.map(h=>({title:h.title,url:h.url,type:h.type,score:h.score/10})),a=Date.now()-a,console.log("Search ["+n+"] time used: "+a+"ms."),{match:p,timeused:a}},hex2array(e){return e=e.split("").map(r=>{r=parseInt(r,16).toString(2).split("").map(i=>i*1);for(let i=r.length;i<4;i++)r.unshift(0);return r}),e=e.flat(),e},async findLikelyArticle(e){var r=await DataCenter.get("APIData","index",e);if(!r||!r.likehood)return null;var i=DataCenter.hex2array(r.likehood),t=await DataCenter.all("APIData","index");t=Object.keys(t).map(a=>[a,t[a]]),t=t.filter(a=>!!a[1].likehood&&a[0]!==e);var n=[];return t.forEach(a=>{var f=DataCenter.hex2array(a[1].likehood),c=0;f.forEach((l,s)=>{l===i[s]&&c++}),n.push([a[0],a[1].title,c])}),n.sort((a,f)=>f[2]-a[2]),n.splice(10),n}},!self.window){importScripts("/js/lrucache.js"),importScripts("/js/cachedDB.js");let e=(r,i)=>async({data:t})=>{if(t==="suicide"){r.close();return}console.log("DataCenter::Task: "+(t.dbName||"all")+"/"+(t.store||"all")+"/"+t.action);var n=DataCenter[t.action],a=null;t.action==="searchArticle"?a=await DataCenter.searchArticle(t.command,...t.prefix,t.map):t.action==="findLikelyArticle"?a=await DataCenter.findLikelyArticle(t.articleId):n&&(a=await n(t.dbName,t.store,t.key,t.value)),i.postMessage({tid:t.tid,result:a})};self.onconnect!==void 0?(self.onconnect=({ports:r})=>{console.log("Shared-Worker DataCenter Connected!");var i=r[0];i.onmessage=e(i,i)},console.log("Shared-Worker DataCenter is READY!")):(self.onmessage=e(self,self),console.log("Dedicated-Worker DataCenter is READY!")),DataCenter.init()}
