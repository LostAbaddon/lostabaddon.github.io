window.newToken = () => Math.floor(Math.random() * (36 ** 8)).toString(36) + Math.floor(Math.random() * (36 ** 8)).toString(36);
window.wait = (delay=0) => new Promise(res => setTimeout(res, delay));

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
const initDB = async () => {
	var db;
	try {
		db = await prepareDB('gon', db => {
			db.open("player", "id");
		});
	}
	catch (err) {
		alert(err);
		console.error(err);
		return;
	}
	GateOfNovosibirsk.DB = db;
};

window.GateOfNovosibirsk = {};
GateOfNovosibirsk.stage = 0;
GateOfNovosibirsk.cmdHandler = null;
GateOfNovosibirsk.canInput = true;
GateOfNovosibirsk.Basic = {
	bag: 15,
	slot: 5,
	life: 100,
	speed: 2,
	attack: 5,
	defence: 1,
};

(async () => {
	var hashes = {};
	location.search.substr(1).split('&')
		.map(p => p.split('='))
		.forEach(p => {
			var k = p[0];
			if (p.length === 1) {
				hashes[p[0]] = true;
			}
			else {
				let v = p[1], q = v * 1;
				if (q + '' === v) v = q;
				hashes[k] = v;
			}
		});
	if (!isNaN(hashes.speed)) {
		GateOfNovosibirsk.SpeedMode = hashes.speed;
	}
	if (hashes.test) {
		GateOfNovosibirsk.TestMode = true;
	}

	document.body.addEventListener('keyup', evt => {
		if (!GateOfNovosibirsk.canInput) {
			if (evt.code === 'Space') GateOfNovosibirsk.moveTrigger();
			else if (evt.key === 's') GateOfNovosibirsk.settingTrigger();
			else if (evt.key === 'p') GateOfNovosibirsk.showPackage();
			return;
		}

		if (evt.ctrlKey || evt.altKey || evt.metaKey) return;
		var key = evt.key || '';
		if (key === 'Enter') {
			let cmd = CmdLineHint.innerText;
			if (!!GateOfNovosibirsk.cmdHandler) GateOfNovosibirsk.cmdHandler(cmd);
			CmdLineHint.innerText = '';
			return;
		}
		else if (key === 'Backspace') {
			let t = CmdLineHint.innerText;
			CmdLineHint.innerText = t.substring(0, t.length - 1);
			return;
		}
		if (key.length !== 1) return;
		CmdLineHint.innerText = CmdLineHint.innerText + key;
	});

	await initDB();
	GateOfNovosibirsk.launchGame();
	if (!GateOfNovosibirsk.TestMode) return;

	await wait(100);
	GateOfNovosibirsk.cmdHandler('login lostabaddon');
	return;
	await wait(2000);
	GateOfNovosibirsk.cmdHandler('enter');
})();