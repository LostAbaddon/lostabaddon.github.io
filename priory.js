const CacheName="schwarzschild",CacheUrl=["/","/index.html","/404.png","/favicon.ico","/webapp.json"];var CacheAfterLoad=!0;const prepare=async()=>{var a=await caches.keys();a.length>0&&a.forEach(async e=>{var t=await caches.open(e),r=await t.keys();r.forEach(c=>{var s=c.url;CacheUrl.includes(s)||CacheUrl.push(s)})})};CacheAfterLoad||prepare();const cacheResource=async(a,e)=>{var t=await caches.open(CacheName);await t.put(a,e)};self.addEventListener("install",a=>{console.log("[:>  SW Installed <:]"),self.skipWaiting(),a.waitUntil(async()=>{await caches.delete(CacheName),console.log("[:>  SW removed cache ("+CacheName+") <:]");var e=await caches.open(CacheName);await e.addAll(CacheUrl)})}),self.addEventListener("activate",async a=>{console.log("[:>  SW Activated <:]"),await caches.delete(CacheName),console.log("[:>  SW removed cache ("+CacheName+") <:]");var e=await caches.open(CacheName);await e.addAll(CacheUrl),globalThis.BroadcastChannel&&new BroadcastChannel("updater").postMessage(!0)}),self.addEventListener("fetch",a=>{if(a.request.method==="GET"){var e=a.request.url.replace(self.location.origin,"");e=e.split(/[\?\#]/)[0];var t=e.split("/"),r=t[t.length-1];if(t.pop(),t=t.join("/"),t=t||"/",filetype=r.match(/\.([^\\\/\?]+)(\?[^\\\/]+)?$/),filetype?filetype=filetype[1].toLowerCase():filetype="",!!t.match(/^(\/|\\|https?|ftps?)/i)&&!r.match(/hot-update\.js/i)&&!r.match(/priory\.js/i)&&!["mp3","mp4","wav","avi","rm","rmvb","ogg","map"].includes(filetype)){if(t.match(/^(ht|f)tps?/i)){if(!filetype||!["md","mu","txt","doc","docx","xls","xlsx","ppt","pptx","pdf","ps","jpg","jpeg","gif","png","webp","ico"].includes(filetype))return}else if(["json","mu","md"].includes(filetype))return;CacheAfterLoad?caches.open(CacheName).then(c=>{c.add(e)}):(e.match(/^\/*#\/+|^\/*#$/)||caches.open(CacheName).then(c=>c.add(e)),CacheUrl.includes(e)||caches.open(CacheName).then(c=>{c.add(e),CacheUrl.push(e)})),a.respondWith(caches.match(a.request).then(c=>{if(c)return c;var s=fetch(a.request).then(i=>(cacheResource(a.request,i.clone()).then(()=>{console.log("CacheUpaded: "+a.request.url)}),i)).catch(i=>{console.error("Fetch Failed: "+a.request.url),console.error(i)});return s}))}}});
