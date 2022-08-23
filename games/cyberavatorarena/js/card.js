/**
 * Skill Type
 * 0:  生成
 * 1:  毁灭
 * 2:  绝对防御
 * 3:  黄金铠甲
 * 4:  镭射光束
 * 5:  神怒天罚
 * 6:  末日病毒
 * 7:  绝对零度
 * 8:  次元口袋
 * 9:  怪盗绅士
 * 10: 凤凰重生
 */

const SkillType = [
	'复制',
	'抹除',
	'绝对防御',
	'黄金铠甲',
	'镭射光束',
	'神怒天罚',
	'末日病毒',
	'绝对零度',
	'次元口袋',
	'怪盗绅士',
	'凤凰重生',
];

class Skill {
	name = "";
	poses = [];
	gates = [];
	count = 1;
	type = 0;
	level = 0;
	leftBound = 0;
	rightBound = 0;
	topBound = 0;
	bottomBound = 0;

	constructor (name, poses, gates, count=1, type=0, level=0) {
		this.name = name;
		this.poses = [[0, 0], ...poses];
		this.gates = [...gates];
		this.count = count;
		this.type = type;
		if (level <= 0) {
			this.level = count;
		}
		else {
			this.level = level;
		}

		[...this.poses, ...this.gates].forEach(b => {
			if (b[0] < this.leftBound) this.leftBound = b[0];
			if (b[0] > this.rightBound) this.rightBound = b[0];
			if (b[1] < this.topBound) this.topBound = b[1];
			if (b[1] > this.bottomBound) this.bottomBound = b[1];
		});
	}
}

class Hero {
	name = "";
	image = '';
	skills = [];
	extendCount = 1;
	extendSkills = [];
	combineSkill = null;
	cards = [];
	points = 0;

	constructor (name, pic, skills=[], exts=1) {
		this.name = name;
		this.image = pic;
		this.skills = [...skills];
		this.extendCount = exts;
	}
	copy () {
		return new Hero(this.name, this.image, this.skills, this.extendCount);
	}
	getCard () {
		var card = newEle('div', 'card', 'hero', 'animated'), ele;
		ele = newEle('div', 'avator');
		ele.style.backgroundImage = "url('" + this.image + "')";
		card.appendChild(ele);
		ele = newEle('div', 'name');
		ele.innerText = this.name;
		card.appendChild(ele);
		return card;
	}
}

const SkillList = [];
SkillList.push(new Skill('前进', [[0, 1]], [[0, 2]], 1, 0));
SkillList.push(new Skill('斜刺', [[1, 1]], [[2, 2]], 1, 1));
SkillList.push(new Skill('横扫', [[1, 1], [2, 2]], [[2, 1], [1, 2]], 2, 1));

const HeroList = [];
HeroList.push(new Hero('逐日魔', '../lifesimulator/assets/kid01.jpg', [SkillList[0], SkillList[1], SkillList[2]]));
HeroList.push(new Hero('追风者', '../lifesimulator/assets/shelton01.jpg', [SkillList[0], SkillList[1], SkillList[2]]));

window.CyberAvatorArena = window.CyberAvatorArena || {};
CyberAvatorArena.FameHall = {};

(() => {
	const LeftArea = ScnFameHall.querySelector('.container > .left');
	const RightArea = ScnFameHall.querySelector('.container > .right');

	var currIdx = 0;
	var cardList = [];
	var touchPoint = -1, movePoint = -1;

	const alignCards = () => {
		cardList.forEach((card, i) => {
			if (i <= currIdx) {
				card.ui.style.top = (80 - (currIdx - i) * 30) + 'px';
				card.ui.style.transform = 'translateZ(-' + ((currIdx - i) * 20) + 'px)';
			}
			else {
				card.ui.style.top = (200 + (i - currIdx) * 20) + 'px';
				card.ui.style.transform = 'translateZ(-' + (50 + (i - currIdx) * 5) + 'px) rotateX(-45deg)';
			}
		});
		changeCard(currIdx);
	};
	const changeCard = (id) => {
		var card = cardList[id];
		if (!card) return;
		console.log(id, card);
	};

	CyberAvatorArena.FameHall.enter = async () => {
		cardList.splice(0);
		cardList.push(...HeroList);
		cardList.push(...cardList.map(l => l.copy()));
		cardList.push(...cardList.map(l => l.copy()));
		cardList.push(...cardList.map(l => l.copy()));
		cardList.push(...cardList.map(l => l.copy()));
		cardList.push(...cardList.map(l => l.copy()));

		currIdx = 0;
		LeftArea.innerHTML = '';
		cardList.forEach((hero, i) => {
			var card = hero.getCard();
			hero.ui = card;
			LeftArea.appendChild(card);
		});
		await wait(0);
		alignCards();
		await wait(0);
		ScnFameHall.classList.remove('hide');
	};
	CyberAvatorArena.FameHall.leave = async () => {
		CyberAvatorArena.Welcome.addNewCmdLine('left hall of fame', true);
		ScnFameHall.classList.add('hide');
		await wait(500);

		await CyberAvatorArena.Welcome.show();
	};

	LeftArea.addEventListener('mousewheel', evt => {
		if (evt.deltaY === 0) return;
		if (evt.deltaY > 0) {
			if (currIdx >= cardList.length - 1) return;
			currIdx ++;
		}
		else {
			if (currIdx < 1) return;
			currIdx --;
		}
		alignCards();
	});
	LeftArea.addEventListener('touchstart', evt => {
		if (evt.touches.length !== 1) {
			touchPoint = -1;
			movePoint = -1;
			return;
		}
		var point = evt.touches[0];
		if (window.CyberAvatorArena.Screen.orientation === 'vertical') {
			touchPoint = point.clientX;
		}
		else {
			touchPoint = point.clientY;
		}
	});
	LeftArea.addEventListener('touchend', evt => {
		if (touchPoint < 1) return;
		var delta = Math.abs(touchPoint - movePoint);
		if (delta < 50) return;
		if (window.CyberAvatorArena.Screen.orientation === 'vertical') {
			if (movePoint > touchPoint) {
				if (currIdx >= cardList.length - 1) return;
				currIdx ++;
			}
			else {
				if (currIdx < 1) return;
				currIdx --;
			}
		}
		else {
			if (movePoint < touchPoint) {
				if (currIdx >= cardList.length - 1) return;
				currIdx ++;
			}
			else {
				if (currIdx < 1) return;
				currIdx --;
			}
		}
		alignCards();
	});
	LeftArea.addEventListener('touchmove', evt => {
		if (touchPoint < 0) return;
		if (evt.touches.length !== 1) {
			touchPoint = -1;
			movePoint = -1;
			return;
		}
		var point = evt.touches[0];
		if (window.CyberAvatorArena.Screen.orientation === 'vertical') {
			movePoint = point.clientX;
		}
		else {
			movePoint = point.clientY;
		}
	});
	LeftArea.addEventListener('touchcancel', evt => {
		touchPoint = -1;
	});
}) ();