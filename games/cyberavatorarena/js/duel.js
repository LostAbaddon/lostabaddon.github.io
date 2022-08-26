window.CyberAvatorArena = window.CyberAvatorArena || {};
CyberAvatorArena.Duel = {};

(() => {
	const HeroListArea = HeroChooer.querySelector('div.chooser_area');
	const EgoHeroArea = ScnArena.querySelector('div.hero_area.ego');
	const FoeHeroArea = ScnArena.querySelector('div.hero_area.foe');

	var duelMode = 0, teamMode = 0;

	const showHero = (hero, isEgo, containerHeight) => {
		var card = hero.getCard(), container = isEgo ? EgoHeroArea : FoeHeroArea;
		card.style.height = containerHeight + 'px';
		card.style.width = (containerHeight * 0.75) + 'px';
		container.querySelector('div.left').appendChild(card);
		console.log(hero, card, isEgo, containerHeight);
	};

	CyberAvatorArena.Duel.init = () => {
		CyberAvatorArena.Tool.initHorizontalScroller(HeroListArea);
		HeroListArea.addEventListener('click', ({target}) => {
			if (!target.classList.contains('card')) return;
			HeroChooer.querySelector('div.line.button').classList.remove('invalid');
			[].forEach.call(HeroListArea.children, node => {
				if (node === target) {
					node.classList.add('selected');
				}
				else {
					node.classList.remove('selected');
				}
			});
			HeroListArea.__chooseOne = target.__chooseId;
		});
	};
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
	CyberAvatorArena.Duel.getMyHeros = async () => {
		return await CyberAvatorArena.DB.all('myheros');
	};
	CyberAvatorArena.Duel.showModeChooser = () => new Promise(async res => {
		var last = CyberAvatorArena.Duel.showModeChooser.__res;
		if (!!last) {
			last();
		}
		CyberAvatorArena.Duel.showModeChooser.__res = res;

		[].forEach.call(DuelModeChooer.querySelectorAll('div.line[group]'), line => {
			var group = line.getAttribute('group');
			if (group === 'mode') line.classList.remove('hide');
			else line.classList.add('hide');
		});
		CyberAvatorArena.Duel.showModeChooser.__step = 0;
		CyberAvatorArena.Duel.showModeChooser.__mode = -1;
		CyberAvatorArena.Duel.showModeChooser.__team = -1;
		CyberAvatorArena.Duel.showModeChooser.__count = -1;
		await wait(0);
		DuelModeChooer.classList.add('show');
	});
	CyberAvatorArena.Duel.chooseMode = async target => {
		var notover = false;
		if (CyberAvatorArena.Duel.showModeChooser.__step === 0) {
			CyberAvatorArena.Duel.showModeChooser.__mode = target;
			CyberAvatorArena.Duel.showModeChooser.__step = 1;
			[].forEach.call(DuelModeChooer.querySelectorAll('div.line[group="mode"]'), line => {
				line.classList.add('hide');
			});
			[].forEach.call(DuelModeChooer.querySelectorAll('div.line[group="team"]'), line => {
				line.classList.remove('hide');
			});
			notover = true;
		}
		else if (CyberAvatorArena.Duel.showModeChooser.__step === 1) {
			CyberAvatorArena.Duel.showModeChooser.__team = target;
			CyberAvatorArena.Duel.showModeChooser.__step = 1;
			if (target === 1) {
				CyberAvatorArena.Duel.showModeChooser.__count = 2;
				CyberAvatorArena.Duel.showModeChooser.__step = 3;
			}
			else {
				[].forEach.call(DuelModeChooer.querySelectorAll('div.line[group="team"]'), line => {
					line.classList.add('hide');
				});
				[].forEach.call(DuelModeChooer.querySelectorAll('div.line[group="count"]'), (line, i) => {
					if (i === 0) {
						if (target === 2) {
							line.classList.remove('invalid');
						}
						else {
							line.classList.add('invalid');
						}
					}
					line.classList.remove('hide');
				});
				CyberAvatorArena.Duel.showModeChooser.__step = 2;
				notover = true;
			}
		}
		else if (CyberAvatorArena.Duel.showModeChooser.__step === 2) {
			CyberAvatorArena.Duel.showModeChooser.__count = target;
		}

		if (notover) return;

		DuelModeChooer.classList.remove('show');
		await wait(200);

		var res = CyberAvatorArena.Duel.showModeChooser.__res;
		if (!res) return;
		delete CyberAvatorArena.Duel.showModeChooser.__res;
		res([CyberAvatorArena.Duel.showModeChooser.__mode, CyberAvatorArena.Duel.showModeChooser.__team, CyberAvatorArena.Duel.showModeChooser.__count]);
	};
	CyberAvatorArena.Duel.showHeroChooser = (list, title) => new Promise(async res => {
		var last = CyberAvatorArena.Duel.showHeroChooser.__res;
		if (!!last) {
			last(-1);
		}
		CyberAvatorArena.Duel.showHeroChooser.__res = res;

		HeroChooer.querySelector('div.title').innerText = title;
		HeroChooer.querySelector('div.line.button').classList.add('invalid');
		HeroListArea.innerHTML = '';
		HeroListArea.__chooseOne = -1;
		list.forEach((hero, i) => {
			var ui = hero.getCard();
			ui.__chooseId = i;
			HeroListArea.appendChild(ui);
		});
		HeroChooer.classList.add('show');
		await wait(350);
		CyberAvatorArena.Duel.onResize();
	});
	CyberAvatorArena.Duel.chooseHero = () => {
		var res = CyberAvatorArena.Duel.showHeroChooser.__res;
		if (!res) return;
		delete CyberAvatorArena.Duel.showHeroChooser.__res;
		var choise = HeroListArea.__chooseOne;
		HeroListArea.__chooseOne = -1;
		HeroChooer.classList.remove('show');
		res(choise);
	};
	CyberAvatorArena.Duel.enter = async (mode, team, count) => {
		duelMode = mode;
		teamMode = team;

		const heroList = [...HeroList];
		const myHeros = await CyberAvatorArena.Duel.getMyHeros();
		var list = heroList.filter(hero => {
			return true;
			var info = myHeros[hero.name];
			if (!info) return;
			if (!info.got) return;
			return true;
		});
		var mySide = [], opSide = [];

		if (duelMode === 1) {
			// SvS
			if (team < 3) {
				// 1v1, 1vN
				let id = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择我方英雄');
				let hero = list[id];
				mySide.push(hero.copy());
				for (let i = 1; i < count; i ++) {
					let id = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择敌方第' + i + '位英雄');
					let hero = list[id];
					opSide.push(hero.copy());
				}
			}
			else {
				// TvT
				let half = count / 2;
				for (let i = 0; i < half; i ++) {
					let id = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择我方第' + (i + 1) + '位英雄');
					let hero = list[id];
					mySide.push(hero.copy());
				}
				for (let i = 0; i < half; i ++) {
					let id = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择敌方第' + (i + 1) + '位英雄');
					let hero = list[id];
					opSide.push(hero.copy());
				}
			}
		}
		else if (duelMode === 2) {
			// PvN
			if (team < 3) {
				// 1v1, 1vN
				let id = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择我方英雄');
				let hero = list[id];
				mySide.push(hero.copy());
				for (let i = 1; i < count; i ++) {
					let id = Math.floor(HeroList.length * Math.random());
					let hero = list[id];
					opSide.push(hero.copy());
				}
			}
			else {
				// TvT
				let half = count / 2;
				for (let i = 0; i < half; i ++) {
					let id = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择我方第' + (i + 1) + '位英雄');
					let hero = list[id];
					mySide.push(hero.copy());
				}
				for (let i = 0; i < half; i ++) {
					let id = Math.floor(HeroList.length * Math.random());
					let hero = list[id];
					opSide.push(hero.copy());
				}
			}
		}
		else {
			// PvP
			let id = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择你的英雄');
			let hero = list[id];
			mySide.push(hero.copy());
		}

		console.log(mySide, opSide);
		return;

		var width = CyberAvatorArena.Screen.width * 0.35;
		var height = CyberAvatorArena.Screen.height - 46;
		height = Math.min(width / 2, Math.floor(height * 0.35));
		EgoHeroArea.style.height = height + 'px';
		FoeHeroArea.style.height = height + 'px';
		EgoHeroArea.querySelector('div.left').style.width = (height * 0.75) + 'px';
		FoeHeroArea.querySelector('div.left').style.width = (height * 0.75) + 'px';

		showHero(myside, true, height);
		showHero(opside, false, height);

		ScnArena.classList.remove('hide');
	};
	CyberAvatorArena.Duel.leave = async () => {
		CyberAvatorArena.Welcome.addNewCmdLine('arena disconnected', true);
		ScnArena.classList.add('hide');
		await wait(500);

		await CyberAvatorArena.Welcome.show();
	};
	CyberAvatorArena.Duel.onResize = () => {
		var rect = HeroListArea.getBoundingClientRect();
		var height = rect.height - 10;
		var width = height * 0.75;
		[].forEach.call(HeroListArea.children, card => {
			card.style.width = width + 'px';
			card.style.height = height + 'px';
		});
		return;

		var width = CyberAvatorArena.Screen.width * 0.35;
		var height = CyberAvatorArena.Screen.height - 46;
		height = Math.min(width / 2, Math.floor(height * 0.35));
		EgoHeroArea.style.height = height + 'px';
		FoeHeroArea.style.height = height + 'px';
		EgoHeroArea.querySelector('div.left').style.width = (height * 0.75) + 'px';
		FoeHeroArea.querySelector('div.left').style.width = (height * 0.75) + 'px';
		EgoHeroArea.querySelector('div.left .card.hero').style.width = (height * 0.75) + 'px';
		EgoHeroArea.querySelector('div.left .card.hero').style.height = height + 'px';
		FoeHeroArea.querySelector('div.left .card.hero').style.width = (height * 0.75) + 'px';
		FoeHeroArea.querySelector('div.left .card.hero').style.height = height + 'px';
	};
}) ();