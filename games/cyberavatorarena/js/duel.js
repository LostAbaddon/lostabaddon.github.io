window.CyberAvatorArena = window.CyberAvatorArena || {};
CyberAvatorArena.Duel = {};

(() => {
	CyberAvatorArena.Duel.initCards = async () => {
		var timestamp = Date.now();
		await CyberAvatorArena.DB.set('myheros', '脚本编译器', {
			got: true,
			win: 0,
			lose: 0,
			timestamp
		});
		await CyberAvatorArena.DB.set('myheros', '特征码识别器', {
			got: true,
			win: 0,
			lose: 0,
			timestamp
		});
	};
	CyberAvatorArena.Duel.getMyHeroList = async () => {
		var list = await CyberAvatorArena.DB.all('myheros');
		list = Object.keys(list).map(name => list[name]);
		return list;
	};
	CyberAvatorArena.Duel.showModeChooser = () => new Promise(res => {
		var last = CyberAvatorArena.Duel.showModeChooser.__res;
		if (!!last) {
			last();
		}
		CyberAvatorArena.Duel.showModeChooser.__res = res;

		DuelModeChooer.classList.add('show');
	});
	CyberAvatorArena.Duel.chooseMode = async target => {
		DuelModeChooer.classList.remove('show');
		await wait(200);

		var res = CyberAvatorArena.Duel.showModeChooser.__res;
		if (!res) return;
		delete CyberAvatorArena.Duel.showModeChooser.__res;
		res(target);
	};
}) ();