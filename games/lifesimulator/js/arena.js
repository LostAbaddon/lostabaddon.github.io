(() => {
	var index = Math.floor(Math.random() * 3);
	index = ['stone', 'scissors', 'cloth'][index];
	sessionStorage.set('newCard', index); // test
}) ();

const Arena = {};

(async () => {
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
		'shelton01.png',
		'somebody01.png',
		'sun01.webp',
		'sun02.jpg',
		'sun03.jpg',
		'xin01.png',
	];

	class Card {
		type = 0; // 0: 空牌; 1: 石头; 2: 剪刀; 3: 布
		point = 0;
		pic = 1;
		static Mode = 1; // 0: 纯石头剪刀; 1: 加上平牌比大小; 2: 花色加成; 3: 伤害点数; 4: 加成点数
		static NameList = ['空', '锤', '剪', '布'];

		constructor (type, point, pic) {
			this.type = type;
			this.point = point;
			this.pic = pic;
		}

		get name () {
			return Card.NameList[this.type] || Card.NameList[0];
		}

		fight (card) {
			if (this.type === 0) {
				if (card.type === 0) return 0;
				if (Card.Mode >= 3) return 0 - card.point;
				return -1;
			}
			if (card.type === 0) {
				if (Card.Mode >= 3) return this.point;
				return 1;
			}

			if (Card.Mode === 0) {
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
			if (Card.Mode === 1) {
				if (this.type === card.type) {
					if (this.point === card.point) return 0;
					if (this.point > card.point) return 1;
					return -1;
				}
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
			if (Card.Mode === 2) {
				let ego = this.point;
				let you = card.point;
				let powE, powU;
				if (this.type === card.type) {
					powE = 1;
					powU = 1;
				}
				else if (this.type === 1) {
					if (card.type === 2) {
						powE = 2;
						powU = 1;
					}
					else {
						powE = 1;
						powU = 2;
					}
				}
				else if (this.type === 3) {
					if (card.type === 2) {
						powE = 1;
						powU = 2;
					}
					else {
						powE = 2;
						powU = 1;
					}
				}
				else if (this.type - card.type === 1) {
					powE = 1;
					powU = 2;
				}
				else {
					powE = 2;
					powU = 1;
				}
				ego *= powE;
				you *= powU;
				if (ego === you) return 0;
				if (ego > you) return 1;
				return -1;
			}
			if (Card.Mode === 3) {
				if (this.type === card.type) {
					return this.point - card.point;
				}
				if (this.type === 1) {
					if (card.type === 2) return this.point;
					return 0 - card.point;
				}
				if (this.type === 3) {
					if (card.type === 2) return 0 - card.point;
					return this.point;
				}
				if (this.type - card.type === 1) return 0 - card.point;
				return this.point;
			}
			if (Card.Mode === 4) {
				let ego = this.point;
				let you = card.point;
				let powE, powU;
				if (this.type === card.type) {
					powE = 1;
					powU = 1;
				}
				else if (this.type === 1) {
					if (card.type === 2) {
						powE = 2;
						powU = 1;
					}
					else {
						powE = 1;
						powU = 2;
					}
				}
				else if (this.type === 3) {
					if (card.type === 2) {
						powE = 1;
						powU = 2;
					}
					else {
						powE = 2;
						powU = 1;
					}
				}
				else if (this.type - card.type === 1) {
					powE = 1;
					powU = 2;
				}
				else {
					powE = 2;
					powU = 1;
				}
				ego *= powE;
				you *= powU;
				return ego - you;
			}
			return 0;
		}
		showUI (ui) {
			var type = ui.querySelector('.type');
			var point = ui.querySelector('.point');
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
			point.innerText = this.point;
			pic.style.backgroundImage = 'url("./assets/' + CardList[this.pic] + '")';
			
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
				console.log(card);
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

	Arena.showMyCards = () => {};

	await initDB('game:arena');

	if (!!launchParams.mode || launchParams.mode === 0) {
		Card.Mode = launchParams.mode;
	}

	var newCard = sessionStorage.get('newCard', null);
	sessionStorage.removeItem('newCard');

	if (!!newCard) {
		let type = ({stone: 1, scissors: 2, cloth: 3})[newCard];
		let point = Math.ceil(Math.random() * 3);
		let card = new Card(type, point, 1);
		await showNewCard(card);
	}
}) ();