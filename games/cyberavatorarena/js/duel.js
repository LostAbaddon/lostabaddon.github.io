window.CyberAvatorArena = window.CyberAvatorArena || {};
CyberAvatorArena.Duel = {};

(() => {
	const HeroListArea = HeroChooer.querySelector('div.chooser_area');
	const EgoHeroArea = ScnArena.querySelector('div.hero_area.ego');
	const FoeHeroArea = ScnArena.querySelector('div.hero_area.foe');

	var duelMode = 0;

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
	CyberAvatorArena.Duel.enter = async (mode) => {
		duelMode = mode;

		var myside = -1, opside = -1;

		if (duelMode >= 1 && duelMode <= 3) {
			var heroList = [...HeroList];
			var myHeros = await CyberAvatorArena.Duel.getMyHeros();
			var list = heroList.filter(hero => {
				return true;
				var info = myHeros[hero.name];
				if (!info) return;
				if (!info.got) return;
				return true;
			});

			if (duelMode === 1) {
				myside = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择第一个英雄');
				myside = list[myside];
				opside = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择第二个英雄');
				opside = list[opside];
			}
			else if (duelMode === 2) {
				myside = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择你的英雄');
				myside = list[myside];
				opside = Math.floor(HeroList.length * Math.random());
				opside = HeroList[opside];
			}
			else {
				myside = await CyberAvatorArena.Duel.showHeroChooser(list, '请选择你的英雄');
				myside = list[myside];
			}
		}

		if (!myside) {
			console.log('FUCK!!!');
		}
		else {
			myside = myside.copy();
		}
		if (!opside) {
			console.log('FUCK!!!');
		}
		else {
			opside = opside.copy();
		}

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