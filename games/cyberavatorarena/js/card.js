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
	'摧毁',
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
const SkillDesc = [
	'复制自身程序到指定门位。',
	'摧毁门位处的代码。',
	'满足构型的程序阵列不会被摧毁类程序移除（不必由当前生成程序触发，但不满足构型的程序阵列不拥有绝对防御）。',
	'通过阵列构型激活后，下次己方遭遇程序摧毁时，摧毁无效（无论同时有多少门位被触发）。',
	'选择赛博空间的一行或一列，其上所有程序被摧毁（对绝对防御和黄金铠甲无效）。',
	'指定一个3x3区域，将其中所有非己方程序摧毁（对绝对防御无效）。',
	'门位上程序所属各赛博格移除一张升级槽或外部接口槽中程序卡。',
	'门位上程序所属各赛博格，下一轮无作为跳过。',
	'立刻获得一张程序卡。',
	'抽取门位上程序所属各赛博格的手牌中的一张程序卡。',
	'选择一个已经存在的程序，它将被认定为当前程序，触发所有可触发的程序一次。',
];

class Skill {
	name = "";
	poses = [];
	gates = [];
	count = 1;
	type = 0;
	level = 0;
	offsetLeft = 0;
	offsetTop = 0;

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

		var leftBound = 0, rightBound = 0;
		var topBound = 0, bottomBound = 0;
		[...this.poses, ...this.gates].forEach(b => {
			if (b[0] < leftBound) leftBound = b[0];
			if (b[0] > rightBound) rightBound = b[0];
			if (b[1] < topBound) topBound = b[1];
			if (b[1] > bottomBound) bottomBound = b[1];
		});
		this.offsetLeft = Math.floor((5 - (rightBound - leftBound)) / 2);
		this.offsetTop = Math.floor((5 - (bottomBound - topBound)) / 2);
	}
	getCard () {
		var ui = newEle('div', 'skill', 'animated'), ele, grid = [];
		ele = newEle('div', 'map');
		ui.appendChild(ele);
		for (let i = 0; i < 5; i ++) {
			let line = [];
			for (let j = 0; j < 5; j ++) {
				let g = newEle('span', 'grid');
				ele.appendChild(g);
				line.push(g);
			}
			grid.push(line);
		}
		this.poses.forEach(([x, y]) => {
			let g = grid[4 - y - this.offsetTop];
			if (!g) return;
			g = g[x + this.offsetLeft];
			if (!g) return;
			g.classList.add('pos');
		});
		this.gates.forEach(([x, y]) => {
			let g = grid[4 - y - this.offsetTop];
			if (!g) return;
			g = g[x + this.offsetLeft];
			if (!g) return;
			g.classList.add('gate');
		});
		ele = newEle('div', 'name');
		ele.innerText = this.name;
		ui.appendChild(ele);
		ele = newEle('div', 'level');
		ele.innerText = this.count + '/' + this.level;
		ui.appendChild(ele);
		ele = newEle('div', 'type');
		ele.innerText = SkillType[this.type];
		ui.appendChild(ele);
		return ui;
	}
}

class Hero {
	name = "";
	image = '';
	skills = [];
	extendCount = 1;
	extendSkills = [];
	combineCount = 0;
	combineSkill = [];
	cards = [];
	points = 0;

	constructor (name, pic, skills=[], exts=1, cmbs=0) {
		this.name = name;
		this.image = pic;
		this.skills = [...skills];
		this.extendCount = exts;
		this.combineCount = cmbs;
	}
	copy () {
		return new Hero(this.name, this.image, this.skills, this.extendCount, this.combineCount);
	}
	getCard () {
		var card = newEle('div', 'card', 'hero', 'animated'), ele;
		ele = newEle('div', 'avator');
		ele.style.backgroundImage = "url('" + this.image + "')";
		card.appendChild(ele);
		ele = newEle('div', 'name');
		ele.innerText = this.name;
		card.appendChild(ele);
		ele = newEle('div', 'point', 'extend');
		ele.innerText = '拓:' + this.extendCount;
		card.appendChild(ele);
		ele = newEle('div', 'point', 'combine');
		ele.innerText = '合:' + this.combineCount;
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
	RightArea.__cardArea = RightArea.querySelector('div.card_container');
	RightArea.__skillArea = RightArea.querySelector('div.skill_container');
	RightArea.__descArea = RightArea.querySelector('div.skill_description');

	var currIdx = 0;
	var cardList = [];
	var cardTouchPoint = -1, cardMovePoint = -1;
	var skillTouchPoint = -1, skillScrollLeft = -1;
	var skillCardWidth = 0, skillCardHeight = 0;

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

		var ui = card.getCard();
		RightArea.__cardArea.innerHTML = '';
		RightArea.__cardArea.appendChild(ui);
		RightArea.__skillArea.innerHTML = '';
		card.skills.forEach(skill => {
			var ui = skill.getCard();
			ui.__skill = skill;
			ui.style.width = skillCardWidth + 'px';
			ui.style.height = skillCardHeight + 'px';
			RightArea.__skillArea.appendChild(ui);
		});
		showSkillDetail(card.skills[0]);
	};
	const showSkillDetail = skill => {
		var area = RightArea.__descArea;
		area.querySelector('span[name="name"]').innerText = skill.name;
		area.querySelector('span[name="type"]').innerText = SkillType[skill.type];
		area.querySelector('span[name="desc"]').innerText = SkillDesc[skill.type];
		area.querySelector('span[name="level"]').innerText = skill.level;
		area.querySelector('span[name="poses"]').innerText = skill.poses.length;
		area.querySelector('span[name="gates"]').innerText = skill.gates.length;
	};

	CyberAvatorArena.FameHall.enter = async () => {
		cardList.splice(0);
		cardList.push(...HeroList);

		currIdx = 0;
		LeftArea.innerHTML = '';
		cardList.forEach((hero, i) => {
			var card = hero.getCard();
			hero.ui = card;
			LeftArea.appendChild(card);
		});

		CyberAvatorArena.FameHall.onResize();
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
	CyberAvatorArena.FameHall.onResize = () => {
		var width = Math.min(225, CyberAvatorArena.Screen.width / 4);
		var height = Math.min(200, CyberAvatorArena.Screen.height * 0.4);
		LeftArea.style.width = width + 'px';
		RightArea.style.left = width + 'px';
		RightArea.__cardArea.style.width = width + 'px';
		RightArea.__skillArea.style.left = width + 'px';
		RightArea.__skillArea.style.height = height + 'px';
		RightArea.__descArea.style.left = width + 'px';
		RightArea.__descArea.style.top = height + 'px';
		skillCardHeight = height - 20;
		skillCardWidth = skillCardHeight * 0.75;
		[].forEach.call(RightArea.__skillArea.children, card => {
			card.style.width = skillCardWidth + 'px';
			card.style.height = skillCardHeight + 'px';
		});
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
			cardTouchPoint = -1;
			cardMovePoint = -1;
			return;
		}
		var point = evt.touches[0];
		if (window.CyberAvatorArena.Screen.orientation === 'vertical') {
			cardTouchPoint = point.clientX;
		}
		else {
			cardTouchPoint = point.clientY;
		}
	});
	LeftArea.addEventListener('touchend', evt => {
		if (cardTouchPoint < 1) return;
		var delta = Math.abs(cardTouchPoint - cardMovePoint);
		if (delta < 50) return;
		if (window.CyberAvatorArena.Screen.orientation === 'vertical') {
			if (cardMovePoint > cardTouchPoint) {
				if (currIdx >= cardList.length - 1) return;
				currIdx ++;
			}
			else {
				if (currIdx < 1) return;
				currIdx --;
			}
		}
		else {
			if (cardMovePoint < cardTouchPoint) {
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
		if (cardTouchPoint < 0) return;
		if (evt.touches.length !== 1) {
			cardTouchPoint = -1;
			cardMovePoint = -1;
			return;
		}
		var point = evt.touches[0];
		if (window.CyberAvatorArena.Screen.orientation === 'vertical') {
			cardMovePoint = point.clientX;
		}
		else {
			cardMovePoint = point.clientY;
		}
	});
	LeftArea.addEventListener('touchcancel', evt => {
		cardTouchPoint = -1;
	});
	RightArea.__skillArea.addEventListener('mousewheel', ({deltaY}) => {
		var max = RightArea.__skillArea.scrollWidth - RightArea.__skillArea.offsetWidth;
		RightArea.__skillArea.scrollLeft = Math.max(Math.min(RightArea.__skillArea.scrollLeft + deltaY, max), 0);
	});
	RightArea.__skillArea.addEventListener('touchstart', evt => {
		if (evt.touches.length !== 1) {
			skillTouchPoint = -1;
			return;
		}
		var point = evt.touches[0];
		if (window.CyberAvatorArena.Screen.orientation === 'vertical') {
			skillTouchPoint = point.clientY;
		}
		else {
			skillTouchPoint = point.clientX;
		}
		skillScrollLeft = RightArea.__skillArea.scrollLeft;
	});
	RightArea.__skillArea.addEventListener('touchend', evt => {
		skillTouchPoint = -1;
		skillScrollLeft = -1;
	});
	RightArea.__skillArea.addEventListener('touchmove', evt => {
		if (skillTouchPoint < 0) return;
		if (evt.touches.length !== 1) {
			skillTouchPoint = -1;
			return;
		}
		var point = evt.touches[0], x;
		if (window.CyberAvatorArena.Screen.orientation === 'vertical') {
			x = point.clientY;
		}
		else {
			x = point.clientX;
		}
		var max = RightArea.__skillArea.scrollWidth - RightArea.__skillArea.offsetWidth;
		RightArea.__skillArea.scrollLeft = Math.max(Math.min(skillScrollLeft - x + skillTouchPoint, max), 0);
		evt.preventDefault();
	});
	RightArea.__skillArea.addEventListener('touchcancel', evt => {
		skillTouchPoint = -1;
		skillScrollLeft = -1;
	});
	RightArea.__skillArea.addEventListener('click', ({target}) => {
		if (!target.classList.contains('skill')) return;
		[].forEach.call(RightArea.__skillArea.children, card => {
			if (card === target) {
				card.classList.add('selected');
			}
			else {
				card.classList.remove('selected');
			}
		});
		showSkillDetail(target.__skill);
	});
}) ();