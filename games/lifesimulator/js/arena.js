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
		'shelton01.jpg',
		'somebody01.png',
		'sun01.webp',
		'sun02.jpg',
		'sun03.jpg',
		'xin01.png',
	];

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

	var newCard = sessionStorage.get('newCard', null);
	sessionStorage.removeItem('newCard');

	if (!!newCard) {
		let type = ({stone: 1, scissors: 2, cloth: 3})[newCard];
		let pic = Math.floor(Math.random() * CardList.length);
		let card = new Card(type, pic);
		await showNewCard(card);
	}
}) ();