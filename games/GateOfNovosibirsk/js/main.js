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

	GateOfNovosibirsk.DB = await initDB('gon', db => {
		db.open("player", "id");
	});
	GateOfNovosibirsk.launchGame();
	if (!GateOfNovosibirsk.TestMode) return;

	await wait(100);
	GateOfNovosibirsk.cmdHandler('login lostabaddon');
	return;
	await wait(2000);
	GateOfNovosibirsk.cmdHandler('enter');
})();