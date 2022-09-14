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
	CardArea._selectArea = CardArea._cardArea.querySelector('div.skill_selector');
	CardArea._selectList = CardArea._selectArea.querySelector('div.list');

	ArenaArea._board = ArenaArea.querySelector('div.board');

	const ColorList = [
		'rgba(81, 168, 221, 1.0)',
		'rgba(219, 77, 109, 1.0)',
		'rgba(93, 172, 129, 1.0)',
		'rgba(106, 76, 156, 1.0)',
		'rgba(120, 120, 120, 1.0)',
		'rgba(215, 196, 187, 1.0)',
	];
	const InitEnergy = 3;
	const BasicCost = 1;

	var fighting = false;
	var board = [], boardWidth = 7, boardHeight = 7, boardSkill = [];
	var duelMode = 0, teamMode = 0;
	var mySide = [], opSide = [], allHeros = [], currHero = 0, selectedHero = 0;
	var currLoopIndex = 0;
	var pickStage = 0, pickingSkills = [];

	const resizeChooser = () => {
		var HEIGHT = CyberAvatorArena.Screen.height;
		var height;
		if (CyberAvatorArena.Screen.platform === 'mobile') {
			height = HEIGHT;
		}
		else {
			height = Math.min(450, HEIGHT);
		}
		height -= 120 + 15;
		var width = height * 0.75;
		[].forEach.call(HeroListArea.children, card => {
			card.style.width = width + 'px';
			card.style.height = height + 'px';
		});
	};
	const resizeArea = () => {
		var isMobile = CyberAvatorArena.Screen.platform === 'mobile';
		var width, height;
		var WIDTH, HEIGHT = CyberAvatorArena.Screen.height - 45;
		if (isMobile) {
			WIDTH = CyberAvatorArena.Screen.width * 0.6 - 158;
			height = HEIGHT * 0.6;
			width = WIDTH * 0.35;
		}
		else {
			WIDTH = CyberAvatorArena.Screen.width * 0.6 - 208;
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

		var right_width = CyberAvatorArena.Screen.width * 0.4 - 5;
		var right_height = HEIGHT - 11;
		var block_width, block_height;
		right_width = (right_width - 3) * 0.95;
		right_height = (right_height - 4) * 0.95;
		if (right_width < right_height / boardHeight * boardWidth) {
			right_height = right_width / boardWidth * boardHeight;
		}
		else {
			right_width = right_height / boardHeight * boardWidth;
		}
		block_width = right_width / boardWidth;
		block_height = right_height / boardHeight;
		ArenaArea._board.style.width = right_width + 'px';
		ArenaArea._board.style.height = right_height + 'px';
		[].forEach.call(ArenaArea._board.querySelectorAll('div.block'), block => {
			block.style.width = block_width + 'px';
			block.style.height = block_height + 'px';
			block.classList.remove('hide');
		});

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
		[].forEach.call(CardArea._selectList.querySelectorAll('div.skill'), card => {
			card.style.width = card_width + 'px';
			card.style.height = card_height + 'px';
		});
	};
	const arangeHeros = (isFirst=false) => {
		if (isFirst) allHeros.forEach(h => h.points = Math.random());
		allHeros.sort((ha, hb) => hb.points - ha.points);
		if (isFirst) allHeros.forEach(h => h.points = 0);

		currHero = allHeros.length - 1;
		// selectedHero = Math.max(...(mySide.map(hero => allHeros.indexOf(hero))));
		selectedHero = currHero;
		SideBar.innerHTML = '';
		allHeros.forEach((hero, i) => {
			hero.energy = InitEnergy + hero.points;
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
			hero.cards.push(getRandCard());
			[...hero.skills, ...hero.extendSkills, ...hero.combineSkill, ...hero.cards].forEach(skill => {
				skill.available = skill.count;
				skill.used = false;
			});
			SideBar.appendChild(tab);
		});

		currLoopIndex ++;
		var loopCount = newEle('div', 'loop_tab', 'hero_tab', 'animated');
		loopCount.innerText = `第${currLoopIndex}局`;
		SideBar.appendChild(loopCount);

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

		CardArea._heroArea.innerHTML = '';
		var avator = hero.getCard();
		avator.style.color = ColorList[hero.idx];
		CardArea._heroArea.appendChild(avator);

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

		resizeArea();
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
	const showBoard = () => {
		ArenaArea._board.innerHTML = '';
		board = [];

		for (let i = 0; i < boardHeight; i ++) {
			let line = [];
			for (let j = 0; j < boardWidth; j ++) {
				let g = newEle('div', 'block', 'animated', 'hide');
				g._x = j;
				g._y = i;
				g._owner = -1;
				ArenaArea._board.appendChild(g);
				line.push(g);
			}
			board.push(line);
		}
	};
	const clickBoard = async (x, y) => {
		if (pickStage > 0) return;

		var block = ArenaArea._board.querySelector('.block.current');
		if (!!block) block.classList.remove('current');

		block = board[y];
		if (!block) return;
		block = block[x];
		if (!block) return;
		if (block._owner !== -1) return;

		var hero = allHeros[currHero];
		block._owner = hero.idx;
		block.classList.add('owned');
		block.classList.add('current');
		block.style.backgroundColor = ColorList[hero.idx];
		hero.points ++;

		await useSkill(hero, x, y);
		// var did = await useSkill(hero, x, y);
		// if (!did) return;
		pickStage = 0;
		currHero --;
		selectedHero = currHero;
		if (currHero >= 0) {
			[].forEach.call(SideBar.querySelectorAll('.hero_tab'), (tab, i) => {
				if (i === currHero) {
					tab.classList.add('selected');
					tab.classList.add('current');
				}
				else {
					tab.classList.remove('selected');
					tab.classList.remove('current');
				}
			});
			changeHero();
		}
		else {
			ArenaArea.style.opacity = 0;
			await wait (300);
			ArenaArea.style.opacity = 1;
			await wait (300);
			arangeHeros();
		}
	};
	const useSkill = (hero, x, y) => new Promise(res => {
		useSkill._reses = useSkill._reses || [];
		useSkill._reses.push(res);

		useSkill._pos = [x, y];
		var friends = [], fList = [], plots = [], can = false;
		if (teamMode === 3) {
			if (mySide.includes(hero)) {
				mySide.forEach(h => {
					friends.push(h.idx);
					if (h !== hero) fList.push(...h.combineSkill.map(s => [s, h.idx]));
				});
			}
			else if (opSide.includes(hero)) {
				opSide.forEach(h => {
					friends.push(h.idx);
					if (h !== hero) fList.push(...h.combineSkill.map(s => [s, h.idx]));
				});
			}
		}
		hero.cards.forEach(s => {
			if (s.available <= 0) return;
			if (s.level >= hero.energy + BasicCost) return;
			var [active, choises] = s.check(0, hero, [x, y], board);
			if (!active) return;
			can = true;
			plots.push([true, s, choises]);
		});
		[...hero.skills, ...hero.extendSkills].forEach(s => {
			if (s.available <= 0) return;
			if (s.level >= hero.energy + BasicCost) return;
			var [active, choises] = s.check(0, hero, [x, y], board);
			if (!active) return;
			can = true;
			plots.push([false, s, choises]);
		});
		fList.forEach(([s, hid]) => {
			if (s.available <= 0) return;
			if (s.level >= hero.energy + BasicCost) return;
			var [active, choises] = s.check(1, hero, [x, y], board, friends, hid);
			if (!active) return;
			can = true;
			plots.push([false, s, choises]);
		});
		boardSkill.forEach(s => {
			if (s.available <= 0) return;
			if (s.level >= hero.energy + BasicCost) return;
			var [active, choises] = s.check(2, hero, [x, y], board);
			if (!active) return;
			can = true;
			plots.push([false, s, choises]);
		});

		if (!can) {
			pickStage = 0;
			res = useSkill._reses.pop();
			res(false);
			return;
		}

		pickStage = 1;
		pickingSkills = [...plots];
		CardArea._selectList.innerHTML = '';
		var m = CardArea._cardArea.querySelector('div.skill_list div.skill');
		pickingSkills.forEach((plot, i) => {
			var ui = plot[1].getCard(true);
			ui.classList.add('selecting');
			ui.style.width = m.style.width;
			ui.style.height = m.style.height;
			ui._idx = i;
			ui._plot = plot;
			CardArea._selectList.appendChild(ui);
		});
		CardArea._selectArea.classList.add('show');
		if (pickingSkills.length === 1) {
			let sk = pickingSkills[0];
			showSkillGates(0, sk[1], sk[2]);
		}
		else if (pickingSkills.length === 0) {
			pickStage = 0;
			res = useSkill._reses.pop();
			res(true);
			return;
		}

		return true;
	});
	const showSkillGates = async (idx, skill, gates) => {
		var hero = allHeros[currHero];
		var choosed = new Set();
		var latestPos = null;

		[].forEach.call(ArenaArea._board.querySelectorAll('div.block.waiting'), block => {
			block.classList.remove('waiting');
		});

		while (choosed.size < skill.count) {
			let points = [], used = [];
			gates.forEach(ps => {
				if (choosed.size > 0) {
					let has = ps.some(p => {
						var q = p.join(',');
						return choosed.has(q);
					});
					if (!has) return;
				}
				ps.forEach(p => {
					var q = p.join(',');
					if (choosed.has(q)) return;
					if (used.includes(q)) return;
					points.push(p);
					used.push(q);
				});
			});
			points.forEach(p => {
				var line = board[p[1]];
				if (!line) return;
				var block = line[p[0]];
				if (!block) return;
				block.classList.add('waiting');
			});
			if (points.length === 0) {
				break;
			}

			let point = await getSkillPoint();
			if (!!point) {
				pickStage = 2;
				let block = point.splice(2, 1)[0];
				[].forEach.call(CardArea._selectList.querySelectorAll('div.skill'), ui => {
					if (ui._plot[1] !== skill) {
						CardArea._selectList.removeChild(ui);
					}
				});
				block.classList.remove('waiting');
				choosed.add(point.join(','));

				if (skill.type === 0) {
					block._owner = hero.idx;
					block.classList.add('owned');
					block.style.backgroundColor = ColorList[hero.idx];
					hero.points ++;
					latestPos = point;
				}
				else if (skill.type === 1) {
					let owner = allHeros[block._owner];
					console.log(hero, block, owner, point, choosed);
				}

				[].forEach.call(ArenaArea._board.querySelectorAll('div.block.waiting'), block => {
					block.classList.remove('waiting');
				});
			}
			else {
				return;
			}
		}

		hero.energy -= skill.level + BasicCost;
		var info = pickingSkills[idx], shouldUpdateCards = false;
		if (info[0]) {
			let idx = hero.cards.indexOf(info[1]);
			if (idx >= 0) {
				hero.cards.splice(idx, 1);
				shouldUpdateCards = true;
			}
		}

		pickStage = 1;
		CardArea._selectArea.classList.remove('show');
		if (skill.type === 0) {
			hero.cards.push(getRandCard());
			shouldUpdateCards = true;
			if (!!latestPos) {
				let block = ArenaArea._board.querySelector('.block.current');
				if (!!block) block.classList.remove('current');
				block = board[latestPos[1]];
				if (!!block) {
					block = block[latestPos[0]];
					if (!!block) {
						block.classList.add('current');
					}
				}

				await useSkill(hero, ...latestPos);
			}
		}

		if (shouldUpdateCards) {
			showCards(hero);
			resizeArea();
		}

		if (!!useSkill._pos) {
			let [x, y] = useSkill._pos;
			delete useSkill._pos;
			await useSkill(hero, x, y);
		}

		res = useSkill._reses.pop();
		res(true);
	}
	const getSkillPoint = () => new Promise(res => {
		var last = getSkillPoint._res;
		if (!!last) last(null);
		getSkillPoint._res = res;
	});
	const choosePendingSkill = block => {
		var res = getSkillPoint._res;
		if (!res) return;
		delete getSkillPoint._res;
		res([block._x, block._y, block]);
	};
	const getRandCard = () => {
		var level = Math.floor(currLoopIndex / 5) + 1;
		var list = [], total = 0;
		SkillList.forEach(card => {
			if (card.level > level) return;

			var rate = 1 + card.level / level;
			total += rate;
			list.push([total, card.copy()]);
		});
		var value = total * Math.random();
		var target = list[0][1];
		list.some(([val, card]) => {
			if (val > value) return true;
			target = card;
		});
		return target;
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
		fighting = true;
		duelMode = mode;
		teamMode = team;
		if (count > 4) {
			boardWidth = 9;
			boardHeight = 9;
		}
		else {
			boardWidth = 7;
			boardHeight = 7;
		}

		const heroList = [...HeroList];
		const myHeros = await CyberAvatorArena.Duel.getMyHeros();
		var list = heroList.filter(hero => {
			if (hero.name === '测试人员') return true; // test
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
					let hero = HeroList[id];
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
					let hero = HeroList[id];
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
		allHeros.forEach((hero, i) => {
			hero.idx = i;
		});
		arangeHeros(true);

		showBoard();

		ScnArena.classList.remove('hide');
		await wait(1500);
		CyberAvatorArena.Duel.onResize();
	};
	CyberAvatorArena.Duel.leave = async () => {
		if (fighting) return;

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
		resizeArea();
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
			if (target.classList.contains('selecting')) {
				let skillInfo = pickingSkills[target._idx];
				showSkillGates(target._idx, skillInfo[1], skillInfo[2]);
			}
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
	ArenaArea._board.addEventListener('click', ({target}) => {
		if (!target.classList.contains('block')) return;

		if (pickStage === 0) {
			clickBoard(target._x, target._y);
		}
		else if ([1, 2].includes(pickStage)) {
			if (!target.classList.contains('waiting')) return;
			choosePendingSkill(target);
		}
	});
}) ();