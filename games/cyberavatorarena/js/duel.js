window.CyberAvatorArena = window.CyberAvatorArena || {};
CyberAvatorArena.Duel = {};

(() => {
	const HeroListArea = HeroChooer.querySelector('div.chooser_area');
	const SideBar = ScnArena.querySelector('div.container > div.side_bar');
	const CardArea = ScnArena.querySelector('div.container > div.card_area');
	const ArenaArea = ScnArena.querySelector('div.container > div.arena_area');

	CardArea._heroArea = CardArea.querySelector('div.hero_area');
	CardArea._infoArea = CardArea.querySelector('div.info_area');
	CardArea._cardArea = CardArea.querySelector('div.card_area');

	var fighting = false;
	var duelMode = 0, teamMode = 0;
	var mySide = [], opSide = [], allHeros = [], currHero = 0, selectedHero = 0;

	const resizeChooser = () => {
		var HEIGHT = CyberAvatorArena.Screen.height;
		var height;
		if (CyberAvatorArena.Screen.platform === 'mobile') {
			height = HEIGHT;
		}
		else {
			height = Math.min(450, HEIGHT);
		}
		height -= 120 + 10;
		var width = height * 0.75;
		[].forEach.call(HeroListArea.children, card => {
			card.style.width = width + 'px';
			card.style.height = height + 'px';
		});
	};
	const resizeArea = (WIDTH, HEIGHT) => {
		var width, height, isMobile = CyberAvatorArena.Screen.platform === 'mobile';
		if (isMobile) {
			height = HEIGHT * 0.6;
			width = WIDTH * 0.35;
		}
		else {
			height = Math.min(HEIGHT / 3, 300);
			width = WIDTH / 2;
		}
		width -= 5;
		height -= 5;

		var w = height * 0.75;
		if (w > width) {
			height = width / 0.75;
		}
		else {
			width = w;
		}

		CardArea._heroArea.style.width = width + 'px';
		CardArea._heroArea.style.height = height + 'px';
		CardArea._infoArea.style.left = (width + 15) + 'px';
		CardArea._infoArea.style.height = height + 'px';
		CardArea._cardArea.style.top = (height + 10) + 'px';

		var line_height, card_height, card_width;

		if (isMobile) {
			line_height = HEIGHT - height - 19 - 24 - 26;
			card_width = WIDTH - 37 - 22 - 10 * 3;
			card_width /= 4;
			card_height = line_height - 22;
			line_height = card_width / 0.75;
			if (card_height >= line_height) {
				card_height = (line_height + card_height) / 2;
			}
		}
		else {
			line_height = HEIGHT - height - 19 - 24 - 26 * 4 - 10 * 3;
			line_height /= 4;
			card_width = WIDTH - 37 - 22 - 10 * 7;
			card_width /= 8;
			card_height = line_height - 22;
			line_height = card_width / 0.75;
			if (card_height >= line_height) {
				card_height = (line_height + card_height) / 2;
			}
		}
		card_width = card_height * 0.75;
		line_height = card_height + 22;

		[].forEach.call(CardArea._cardArea.querySelectorAll('div.skill_list'), line => {
			line.style.height = line_height + 'px';
			[].forEach.call(line.querySelectorAll('div.skill'), card => {
				card.style.width = card_width + 'px';
				card.style.height = card_height + 'px';
			});
		});
	};
	const arangeHeros = (isFirst=false) => {
		if (isFirst) allHeros.forEach(h => h.points = Math.random());
		allHeros.sort((ha, hb) => hb.points - ha.points);
		if (isFirst) allHeros.forEach(h => h.points = 0);

		currHero = allHeros.length - 1;
		selectedHero = Math.max(...(mySide.map(hero => allHeros.indexOf(hero))));
		allHeros.forEach((hero, i) => {
			var tab = newEle('div', 'hero_tab', 'animated');
			if (i === selectedHero) {
				tab.classList.add('selected');
			}
			if (i === currHero) {
				tab.classList.add('current');
			}
			if (mySide.includes(hero)) {
				tab.classList.add('my_side');
			}
			else {
				tab.classList.add('op_side');
			}
			tab.innerText = hero.name + ' (' + hero.points + ')';
			tab._id = i;
			SideBar.appendChild(tab);
		});
		changeHero();
	};
	const changeHero = () => {
		var hero = allHeros[selectedHero];
		if (!hero) return;
		var isMine = mySide.includes(hero);
		if (isMine) {
			CardArea.classList.remove('op_side');
			ArenaArea.classList.remove('op_side');
		}
		else {
			CardArea.classList.add('op_side');
			ArenaArea.classList.add('op_side');
		}

		var rect = CardArea.getBoundingClientRect();
		var WIDTH = rect.width, HEIGHT = rect.height;

		CardArea._heroArea.innerHTML = '';
		CardArea._heroArea.appendChild(hero.getCard());

		[].forEach.call(CardArea._infoArea.querySelectorAll('div.line span.info'), line => {
			line.innerHTML = '';
		});
		[].forEach.call(CardArea._cardArea.querySelectorAll('div.legend'), ui => {
			if (ui.getAttribute('name') === 'hero') {
				ui.classList.add('selected');
			}
			else {
				ui.classList.remove('selected');
			}
		});
		[].forEach.call(CardArea._cardArea.querySelectorAll('div.skill_list'), ui => {
			if (ui.getAttribute('name') === 'hero') {
				ui.classList.add('selected');
			}
			else {
				ui.classList.remove('selected');
			}
		});

		showCards(hero);

		resizeArea(WIDTH, HEIGHT);
	};
	const showCards = (list, ui) => {
		if (Array.isArray(list)) {
			ui.innerHTML = '';
			list.forEach(skl => {
				var card = skl.getCard();
				ui.appendChild(card);
			});
		}
		else {
			showCards(list.skills, CardArea._cardArea.querySelector('div.skill_list[name="hero"]'));
			let array = [...list.extendSkills];
			for (let i = list.extendSkills.length; i < list.extendCount; i ++) {
				array.push(Skill.emptySkill());
			}
			showCards(array, CardArea._cardArea.querySelector('div.skill_list[name="extends"]'));
			array = [...list.combineSkill];
			for (let i = list.combineSkill.length; i < list.combineCount; i ++) {
				array.push(Skill.emptySkill());
			}
			showCards(array, CardArea._cardArea.querySelector('div.skill_list[name="combine"]'));
			if (mySide.includes(list)) {
				showCards(list.cards, CardArea._cardArea.querySelector('div.skill_list[name="hands"]'));
			}
			else {
				showCards([], CardArea._cardArea.querySelector('div.skill_list[name="hands"]'));
			}
		}
	};
	const showSkill = (skill, ui) => {
		[].forEach.call(CardArea._cardArea.querySelectorAll('div.skill'), card => {
			if (card === ui) {
				card.classList.add('selected');
			}
			else {
				card.classList.remove('selected');
			}
		});

		if (skill.type === -1) {
			CardArea._infoArea.querySelector('div.line span.info[type="name"]').innerText = '空';
			CardArea._infoArea.querySelector('div.line span.info[type="type"]').innerText = '无';
			CardArea._infoArea.querySelector('div.line span.info[type="desc"]').innerText = '无';
		}
		else {
			CardArea._infoArea.querySelector('div.line span.info[type="name"]').innerText = skill.name;
			CardArea._infoArea.querySelector('div.line span.info[type="type"]').innerText = SkillType[skill.type];
			CardArea._infoArea.querySelector('div.line span.info[type="desc"]').innerText = SkillDesc[skill.type];
		}
	};

	CyberAvatorArena.Duel.init = () => {
		CyberAvatorArena.Tool.initHorizontalScroller(HeroListArea);
		[].forEach.call(CardArea._cardArea.querySelectorAll('div.skill_list'), line => {
			CyberAvatorArena.Tool.initHorizontalScroller(line);
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
			last([-1, -1, -1]);
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
	CyberAvatorArena.Duel.chooseMode = async (target=-1) => {
		var notover = false;
		if (CyberAvatorArena.Duel.showModeChooser.__step === 0) {
			CyberAvatorArena.Duel.showModeChooser.__mode = target;
			if (target >= 0) {
				CyberAvatorArena.Duel.showModeChooser.__step = 1;
				[].forEach.call(DuelModeChooer.querySelectorAll('div.line[group="mode"]'), line => {
					line.classList.add('hide');
				});
				[].forEach.call(DuelModeChooer.querySelectorAll('div.line[group="team"]'), line => {
					line.classList.remove('hide');
				});
				notover = true;
			}
		}
		else if (CyberAvatorArena.Duel.showModeChooser.__step === 1) {
			CyberAvatorArena.Duel.showModeChooser.__team = target;
			if (target >= 0) {
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
			ui.classList.remove('selected');
			ui.__chooseId = i;
			HeroListArea.appendChild(ui);
		});
		HeroChooer.classList.add('show');
		await wait(350);
		resizeChooser();
	});
	CyberAvatorArena.Duel.chooseHero = async () => {
		var res = CyberAvatorArena.Duel.showHeroChooser.__res;
		if (!res) return;
		delete CyberAvatorArena.Duel.showHeroChooser.__res;
		var choise = HeroListArea.__chooseOne;
		HeroListArea.__chooseOne = -1;
		HeroChooer.classList.remove('show');
		await wait(300);
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

		mySide.splice(0);
		opSide.splice(0);
		allHeros.splice(0);
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

		mySide.forEach(h => allHeros.push(h));
		opSide.forEach(h => allHeros.push(h));
		arangeHeros(true);

		ScnArena.classList.remove('hide');
		await wait(1500);
		CyberAvatorArena.Duel.onResize();
	};
	CyberAvatorArena.Duel.leave = async () => {
		CyberAvatorArena.Welcome.addNewCmdLine('arena disconnected', true);
		ScnArena.classList.add('hide');
		await wait(500);

		await CyberAvatorArena.Welcome.show();
		SideBar.innerHTML = '';
		CardArea._heroArea.innerHTML = '';
		CardArea._infoArea.innerHTML = '';
	};
	CyberAvatorArena.Duel.onResize = () => {
		if (!!CyberAvatorArena.Duel.showHeroChooser.__res) resizeChooser();

		var rect = CardArea.getBoundingClientRect();
		resizeArea(rect.width, rect.height);
	};

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
	SideBar.addEventListener('click', ({target}) => {
		if (!target.classList.contains('hero_tab')) return;
		var last = SideBar.querySelector('.hero_tab.selected');
		if (!!last) {
			if (last === target) return;
			last.classList.remove('selected');
		}
		target.classList.add('selected');
		selectedHero = target._id;
		changeHero();
	});
	CardArea._cardArea.addEventListener('click', ({target}) => {
		if (target.classList.contains('skill')) {
			showSkill(target._skill, target);
		}
		else if (target.classList.contains('legend')) {
			let tgt = target.getAttribute('name');
			[].forEach.call(CardArea._cardArea.querySelectorAll('div.legend'), ui => {
				if (ui.getAttribute('name') === tgt) {
					ui.classList.add('selected');
				}
				else {
					ui.classList.remove('selected');
				}
			});
			[].forEach.call(CardArea._cardArea.querySelectorAll('div.skill_list'), ui => {
				if (ui.getAttribute('name') === tgt) {
					ui.classList.add('selected');
				}
				else {
					ui.classList.remove('selected');
				}
			});
		}
	});
}) ();