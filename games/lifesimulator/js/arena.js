const Arena = {};

(async () => {
	const ActiveCardLimit = 5;
	const CardList = [
		'bond01.jpg',
		'dfb01.png',
		'dog01.jpg',
		'girl01.jpg',
		'gong01.webp',
		'kid01.jpg',
		'qian01.jpg',
		'qian02.webp',
		'qian03.jpg',
		'shelton01.jpg',
		'somebody01.png',
		'sun01.webp',
		'sun02.jpg',
		'sun03.jpg',
		'xin01.png',
	];

	var DB;
	var MyCards, CurrentCards;

	class Card {
		type = 0; // 0: 空牌; 1: 石头; 2: 剪刀; 3: 布
		pic = 1;
		static NameList = ['空', '锤', '剪', '布'];

		constructor (type, pic) {
			this.type = type;
			this.pic = pic;
		}

		get name () {
			return Card.NameList[this.type] || Card.NameList[0];
		}

		fight (card) {
			if (this.type === 0) {
				if (card.type === 0) return 0;
				return -1;
			}
			if (card.type === 0) {
				return 1;
			}

			if (this.type === card.type) return 0;
			if (this.type === 1) {
				if (card.type === 2) return 1;
				return -1;
			}
			if (this.type === 3) {
				if (card.type === 2) return -1;
				return 1;
			}
			if (this.type - card.type === 1) return -1;
			return 1;
		}
		showUI (ui) {
			var type = ui.querySelector('.type');
			var pic = ui.querySelector('.pic');
			if (this.type === 1) {
				type.innerHTML = '<i class="fa-solid fa-hand-back-fist"></i>';
			}
			else if (this.type === 2) {
				type.innerHTML = '<i class="fa-solid fa-hand-peace"></i>';
			}
			else if (this.type === 3) {
				type.innerHTML = '<i class="fa-solid fa-hand"></i>';
			}
			else {
				type.innerHTML = '<i class="fa-solid fa-ban"></i>';
			}
			pic.style.backgroundImage = 'url("./assets/' + CardList[this.pic] + '")';
		}
		toString () {
			return '[' + this.type + ',' + this.pic + ']';
		}
		static fromString (str) {
			var [type, pic] = JSON.parse(str);
			return new Card(type, pic);
		}
	}

	const showNewCard = (card) => new Promise(res => {
		newPopup('获得新卡', {
			top: '50%',
			left: '50%',
			width:'240px',
			height:'360px',
			onActive: pop => {
				pop.style.transform = "translate(-50%, -50%)";
				card.showUI(NewCardInfo.querySelector('.card'));
				pop.UI.content.appendChild(NewCardInfo);

				pop.show();
			},
			onHide: pop => {
				document.body.appendChild(NewCardInfo);
				res();
			},
		});
	});
	const showBattleHint = (hint, done) => new Promise(res => {
		newPopup('战场提示', {
			top: '50%',
			left: '50%',
			width:'240px',
			height: done ? '200px' : '150px',
			onActive: pop => {
				BattleHintCloser.pop = pop;
				pop.style.transform = "translate(-50%, -50%)";
				BattleHint.querySelector('.hint').innerText = hint;
				pop.UI.content.appendChild(BattleHint);

				pop.show();
			},
			onHide: pop => {
				document.body.appendChild(BattleHint);
				res();
			},
		});
	});
	const addNewCard = async (card) => {
		var list = MyCards.map(card => card.toString());
		var has = list.includes(card.toString());
		if (has) return;
		MyCards.push(card);
		await Promise.all([
			showNewCard(card),
			saveCards()
		]);
	};
	const saveCards = async (isAll=true) => {
		if (isAll) {
			let mine = MyCards.map(card => card.toString());
			await DB.set('data', 'mine', mine);
		}
		else {
			await DB.set('data', 'active', CurrentCards);
		}
	};
	const newCardUI = (card, needIdx=true) => {
		var ui = newEle('div', 'card');
		var ele = newEle('div', 'pic');
		ui.appendChild(ele);
		ele = newEle('div', 'type');
		ui.appendChild(ele);
		if (needIdx) {
			ele = newEle('div', 'index');
			ui.appendChild(ele);
			ui._index = ele;
		}
		card.showUI(ui);
		return ui;
	};
	const updateCode = async () => {
		var list = CurrentCards.map(idx => {
			var card = MyCards[idx];
			if (card.pic < 10) return card.type + '0' + card.pic;
			return card.type + '' + card.pic;
		});
		for (let i = list.length; i < ActiveCardLimit; i ++) {
			list.push('000');
		}
		list = list.join('');
		var word = await encrypt(list);
		SpellShower.innerText = word;
	};
	const initCardList = async () => {
		var [mine, current] = await Promise.all([
			DB.get('data', 'mine'),
			DB.get('data', 'active')
		]);
		if (!mine) {
			MyCards = [];
			MyCards.push(new Card(1, Math.floor(Math.random() * CardList.length)));
			MyCards.push(new Card(2, Math.floor(Math.random() * CardList.length)));
			MyCards.push(new Card(3, Math.floor(Math.random() * CardList.length)));
			await saveCards();
			console.log('初始卡组生成完毕');
		}
		else {
			MyCards = mine.map(card => Card.fromString(card));
		}
		if (!current) {
			CurrentCards = [];
		}
		else {
			CurrentCards = current;
		}
		updateCode();
	};

	Arena.showMyCards = () => {
		newPopup('请组建你的卡组', {
			top: '5%',
			bottom: '5%',
			left: '5%',
			right:'5%',
			onActive: pop => {
				var area = MyCardList.querySelector("div.cardarea");
				area.innerHTML = '';
				MyCards.forEach((card, idx) => {
					var ui = newCardUI(card);
					ui.card = card;
					ui.index = idx;
					var i = CurrentCards.indexOf(idx);
					if (i >= 0) {
						ui.classList.add('selected');
						ui._index.innerText = i + 1;
					}
					area.appendChild(ui);
				});
				pop.UI.content.appendChild(MyCardList);

				pop.show();
			},
			onHide: pop => {
				document.body.appendChild(MyCardList);
			},
		});
	};
	Arena.startBattle = async (spell) => {
		var list = [];
		if (!!spell) {
			let result = await DB.get('data', spell);
			let done = false;
			let hint;
			if (result === undefined) {
				let enemy = await decrypt(spell);
				let len = Math.floor(enemy.length / 3);
				for (let i = 0; i < len; i ++) {
					let type = enemy.substr(i * 3, 1) * 1;
					let pic = enemy.substr(i * 3 + 1, 2) * 1;
					if (type === 0 || isNaN(type) || isNaN(pic)) continue;
					list.push(new Card(type, pic));
				}
				let name = launchParams.n;
				if (!!name) {
					hint = "你打开了通往" + name + '的传送门，\n打响了一场遭遇战！';
				}
				else {
					hint = "你打开了一道传送门，\n打响了一场遭遇战！";
				}
				BattleHintCloser.innerText = '开始战斗';
			}
			else {
				hint = '一个熟悉的骑士团被传送了过来，\n你们看了看彼此，发现是老熟人，于是哈喇了两句他们就回去了。';
				BattleHintCloser.innerText = '回家睡觉';
				done = true;
			}
			await showBattleHint(hint, done);
			if (done) return;
		}
		else {
			for (let i = 0; i < ActiveCardLimit; i ++) {
				list.push(new Card(Math.ceil(Math.random() * 3), Math.floor(Math.random() * CardList.length)));
			}
		}

		var paddingV = 10, paddingH = 20;
		var scoreM = 0, scoreE = 0, result = 0;
		var uiResult = ScnBattleField.querySelector('div.area.result');

		FieldEnemy.innerHTML = '';
		FieldEnemy._score = newEle('div', 'score', 'hint');
		FieldEnemy._score.innerText = '积分：' + scoreE;
		FieldEnemy.appendChild(FieldEnemy._score);
		[...list].reverse().forEach((card, i) => {
			var ui = newCardUI(card, false);
			ui.classList.add('animated');
			ui.style.top = (i * paddingV) + 'px';
			ui.style.left = (i * paddingH) + 'px';
			ui.style.marginTop = '0px';
			ui.style.marginLeft = '0px';
			card.ui = ui;
			FieldEnemy.appendChild(ui);
		});

		FieldMine.innerHTML = '';
		FieldMine._score = newEle('div', 'score', 'hint');
		FieldMine._score.innerText = '积分：' + scoreM;
		FieldMine.appendChild(FieldMine._score);
		var mine = CurrentCards.map(idx => MyCards[idx]);
		[...mine].reverse().forEach((card, i) => {
			var ui = newCardUI(card, false);
			ui.classList.add('animated');
			ui.style.bottom = (i * paddingV) + 'px';
			ui.style.left = (i * paddingH) + 'px';
			ui.style.marginBottom = '0px';
			ui.style.marginLeft = '0px';
			card.ui = ui;
			FieldMine.appendChild(ui);
		});

		uiResult.innerText = '';

		ScnWelcome.classList.add('gone');
		ScnBattleField.classList.remove('waiting');
		await wait(1000);

		for (let i = 0; i < ActiveCardLimit; i ++) {
			let cardM = mine[i] || new Card(0, 0);
			let cardE = list[i] || new Card(0, 0);
			let won = cardM.fight(cardE);
			if (cardM.ui) {
				cardM.ui.style.bottom = '50%';
				cardM.ui.style.left = '95%';
				cardM.ui.style.marginLeft = '-120px';
				cardM.ui.style.marginBottom = '-80px';
				cardM.ui.style.zIndex = i;
			}
			if (cardE.ui) {
				cardE.ui.style.top = '50%';
				cardE.ui.style.left = '95%';
				cardE.ui.style.marginLeft = '-120px';
				cardE.ui.style.marginTop = '-80px';
				cardE.ui.style.zIndex = i;
			}
			await wait(300);
			if (won === 1) {
				scoreM ++;
				if (cardM.ui) {
					cardM.ui.style.borderColor = 'green';
				}
				if (cardE.ui) {
					cardE.ui.style.borderColor = 'red';
				}
			}
			else if (won === -1) {
				scoreE ++;
				if (cardM.ui) {
					cardM.ui.style.borderColor = 'red';
				}
				if (cardE.ui) {
					cardE.ui.style.borderColor = 'green';
				}
			}
			FieldMine._score.innerText = '积分：' + scoreM;
			FieldEnemy._score.innerText = '积分：' + scoreE;
			await wait(300);
			if (cardM.ui) {
				cardM.ui.style.borderColor = '';
				if (won !== 1) {
					cardM.ui.style.opacity = 0;
				}
			}
			if (cardE.ui) {
				cardE.ui.style.borderColor = '';
				if (won !== -1) {
					cardE.ui.style.opacity = 0;
				}
			}
			await wait(1000);
		}

		await wait(300);
		if (scoreM > scoreE) {
			result = 1;
			uiResult.innerText = '恭喜！\n作战胜利！';
		}
		else if (scoreM < scoreE) {
			result = -1;
			uiResult.innerText = '遗憾……\n作战失败……';
		}
		else {
			result = 0;
			uiResult.innerText = '哈，居然战平了。';
		}
		if (!!spell) {
			await DB.set('data', spell, result);
		}

		await wait(1000);
		ScnWelcome.classList.remove('gone');
		ScnBattleField.classList.add('waiting');
	};

	MyCardList.addEventListener('click', ({target}) => {
		var idx = target.index, pos = CurrentCards.indexOf(idx);
		var changed = false;
		if (pos < 0) {
			if (CurrentCards.length < ActiveCardLimit) {
				CurrentCards.push(idx);
				target.classList.add('selected');
				changed = true;
			}
		}
		else {
			CurrentCards.splice(pos, 1);
			target.classList.remove('selected');
			target._index.innerHTML = '';
			changed = true;
		}
		if (changed) {
			let all = MyCardList.querySelectorAll('div.cardarea div.card');
			all = [].map.call(all, i => i);
			CurrentCards.forEach((idx, i) => {
				var card = all[idx];
				card._index.innerText = i + 1;
			});
			updateCode();
			saveCards(false);
		}
	});
	SpellPicker.addEventListener('click', () => {
		var spell = SpellShower.innerText;
		navigator.clipboard.writeText(spell);
	});
	BattleHintCloser.addEventListener('click', () => {
		if (!BattleHintCloser.pop) return;
		BattleHintCloser.pop.hide();
	});

	DB = await initDB('miniarena', db => {
		db.open("data", "id");
	});
	await initCardList();

	var newCard = sessionStorage.get('newCard', null);
	sessionStorage.removeItem('newCard');

	if (!!newCard) {
		let type = ({stone: 1, scissors: 2, cloth: 3})[newCard];
		let pic = Math.floor(Math.random() * CardList.length);
		let card = new Card(type, pic);
		await addNewCard(card);
	}

	if (!!launchParams.t) {
		Arena.startBattle(launchParams.t);
	}
}) ();