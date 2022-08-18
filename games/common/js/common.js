const prepareDB = async (dbName, onUpdate) => {
	var cacheDB = new CachedDB(dbName, 1);
	cacheDB.onUpdate(() => {
		if (!!onUpdate) onUpdate(cacheDB);
		console.log(dbName + ': Updated');
	});
	cacheDB.onConnect(() => {
		console.log(dbName + ': Connected');
	});
	await cacheDB.connect();
	return cacheDB;
};

window.newToken = () => Math.floor(Math.random() * (36 ** 8)).toString(36) + Math.floor(Math.random() * (36 ** 8)).toString(36);
window.wait = (delay=0) => new Promise(res => setTimeout(res, delay));
window.getNow = () => {
	var now = new Date();
	var Y = now.getYear() + 1951;
	var M = now.getMonth() + 1;
	var D = now.getDate();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();

	if (M < 10) M = '0' + M;
	if (D < 10) D = '0' + D;
	if (h < 10) h = '0' + h;
	if (m < 10) m = '0' + m;
	if (s < 10) s = '0' + s;

	return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s;
};

localStorage.__proto__.get = function (key, def={}) {
	var item = this.getItem(key);
	if (!item) return def;
	try {
		item = JSON.parse(item);
	}
	catch (err) {
		return def;
	}
	return item;
};
localStorage.__proto__.set = function (key, value) {
	value = JSON.stringify(value);
	this.setItem(key, value);
};

window.newEle = (tag, ...cls) => {
	if (!!cls) cls = cls.flat(Infinity);
	else cls = [];
	var ele = document.createElement(tag);
	cls.forEach(c => {
		if (c.toString() === c) ele.classList.add(c);
		else setStyle(ele, c);
	});
	return ele;
};
window.setStyle = (ele, css) => {
	for (let item in css) {
		ele.style[item] = css[item];
	}
};

window.initDB = async (dbGameName, onInit) => {
	var db;
	try {
		db = await prepareDB(dbGameName, onInit);
	}
	catch (err) {
		alert(err);
		console.error(err);
		return;
	}
	return db;
};
window.utf8tobase64 = str => window.btoa(window.unescape(window.encodeURIComponent(str)));
window.base64toutf8 = str => window.decodeURIComponent(window.escape(window.atob(str)));
window.base64tobuffer = str => {
	var dec = window.escape(window.atob(str)), len = dec.length, result = [];
	for (let i = 0; i < len; i ++) {
		let s = dec.substr(i, 1);
		if (s === '%') {
			s = dec.substr(i + 1, 2);
			try {
				s = parseInt(s, 16);
			}
			catch (err) {
				console.error("输入 base64 字符串格式错误：", err);
				return null;
			}
			result.push(s);
			i += 2;
		}
		else {
			result.push(s.charCodeAt(0));
		}
	}
	result = new Uint8Array(result);
	return result;
};
window.buffertobase64 = (buf) => btoa(
	new Uint8Array(buf)
	.reduce((data, byte) => data + String.fromCharCode(byte), '')
);
window.encrypt = async context => {
	var key = base64tobuffer('ob5n5mojn0f6XgqSL1p/rIn9EiSOGUxFjpofSKb6PDc=');
	key = await window.crypto.subtle.importKey("raw", key, "AES-GCM", true, ["encrypt", "decrypt"]);
	var iv = base64tobuffer('lostabaddon');
	context = utf8tobase64(context);
	context = base64tobuffer(context);
	var info = await window.crypto.subtle.encrypt({
		name: "AES-GCM", iv
	}, key, context);
	info = buffertobase64(info);
	return info;
};
window.decrypt = async context => {
	var key = base64tobuffer('ob5n5mojn0f6XgqSL1p/rIn9EiSOGUxFjpofSKb6PDc=');
	key = await window.crypto.subtle.importKey("raw", key, "AES-GCM", true, ["encrypt", "decrypt"]);
	var iv = base64tobuffer('lostabaddon');
	context = base64tobuffer(context);
	var info = await window.crypto.subtle.decrypt({
		name: "AES-GCM", iv
	}, key, context);
	info = buffertobase64(info);
	info = base64toutf8(info);
	return info;
};

(async () => {
	var hashes = {};
	location.search.substr(1).split('&')
		.map(p => p.split('='))
		.forEach(p => {
			var k = p[0];
			if (!k) return;
			if (p.length === 1) {
				hashes[p[0]] = true;
			}
			else {
				let v = p[1], q = v * 1;
				if (q + '' === v) v = q;
				hashes[k] = v;
			}
		});
	window.launchParams = hashes;
})();