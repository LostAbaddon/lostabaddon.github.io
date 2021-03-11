/* 更新于：2021/03/12 00:44:09 */
const CacheName = 'schwarzschild';
const CacheUrl = [
	'/',
	'/index.html',
	'/404.png',
	'/favicon.ico',
	'/webapp.json',
];
const channel = new BroadcastChannel('service-messages');

const cacheResource = async (req, res) => {
	var cache = await caches.open(CacheName);
	await cache.put(req, res);
};

self.addEventListener('install', evt => {
	console.log('[:>  SW Installed <:]');
	evt.waitUntil(async () => {
		await caches.delete(CacheName);
		var cache = await caches.open(CacheName);
		await cache.addAll(CacheUrl);
	});
});
self.addEventListener('fetch', evt => {
	if (evt.request.method !== 'GET') return;
	if (!evt.request.url.match(/^https?:\/\//i)) return;
	if (evt.request.url.indexOf(self.location.origin) < 0) return;
	var fullpath = evt.request.url.replace(self.location.origin, '');
	var pathname = fullpath.split('/');
	var filename = pathname[pathname.length - 1];
	pathname.pop();
	pathname = pathname.join('/');
	if (filename === 'priory.js') return;
	if (filename.match(/(mp3|mp4)$/i)) return;
	if (!!pathname.match(/^[\/\\]*api[\/\\]/i) || !!pathname.match(/^[\/\\]*api$/i)) return;
	// if (!fullpath.match(/^\/*#\/+|^\/*#$/)) caches.open(CacheName).then(cache => cache.add(fullpath)); // 将适合的请求都缓存起来
	caches.open(CacheName).then(cache => cache.add(fullpath)); // 将适合的请求都缓存起来
	evt.respondWith(caches.match(evt.request).then(cache => {
		if (cache) {
			return cache;
		}

		// 如果没有缓存，则问后台要
		var remote = fetch(evt.request).then(res => {
			cacheResource(evt.request, res.clone()).then(() => {
				channel.postMessage({
					event: 'cacheUpdated',
					url: evt.request.url,
					timestamp: Date.now(),
				});
			});
			return res;
		}).catch(e => {
			console.error(e);
		});

		return remote;
	}));
});