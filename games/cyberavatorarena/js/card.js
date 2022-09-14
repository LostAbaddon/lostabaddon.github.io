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

class Skill {
	name = "";
	poses = [];
	gates = [];
	count = 1;
	type = 0;
	level = 0;
	offsetLeft = 0;
	offsetTop = 0;
	plots = [];
	ui = null;

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
		this.offsetLeft = Math.floor((5 - (rightBound + leftBound)) / 2);
		this.offsetTop = Math.floor((5 - (bottomBound + topBound)) / 2);

		var plots = [];
		plots.push(Skill.normalize(this.poses, this.gates));
		plots.push(Skill.normalize(...Skill.flip(this.poses, this.gates)));
		var rs = Skill.rotate(this.poses, this.gates);
		plots.push(Skill.normalize(...rs));
		plots.push(Skill.normalize(...Skill.flip(...rs)));
		rs = Skill.rotate(...rs);
		plots.push(Skill.normalize(...rs));
		plots.push(Skill.normalize(...Skill.flip(...rs)));
		rs = Skill.rotate(...rs);
		plots.push(Skill.normalize(...rs));
		plots.push(Skill.normalize(...Skill.flip(...rs)));

		var used = [];
		this.plots = plots.filter(rs => {
			var id = rs[0].map(ps => ps.join(',')).join(';');
			id = id + '|' + rs[1].map(ps => ps.join(',')).join(';');
			if (used.includes(id)) return false;
			used.push(id);
			return true;
		});
	}
	getCard (isNew=false) {
		if (!!this.ui && !isNew) return this.ui;
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
		ele.innerText = SkillType[this.type] || '无';
		ui.appendChild(ele);
		ui._skill = this;

		this.ui = ui;
		return ui;
	}
	check (activeType, hero, curr, board, friends=[], owner) {
		// activeType: 0: 角色技能、拓展技能、手牌; 1: 合体技能; 2: 世界技能
		var choises = [], active = false;

		this.plots.forEach(([poses, gates]) => {
			poses.forEach(p => {
				var dx = curr[0] - p[0];
				var dy = curr[1] - p[1];
				var hasO = activeType !== 1, hasH = hasO;
				var can = !poses.some(p => {
					var x = dx + p[0];
					var y = dy + p[1];
					var block = board[y];
					if (!block) return true;
					block = block[x];
					if (!block) return true;
					if (activeType === 1) {
						if (block._owner !== hero.idx) hasO = true;
						if (block._owner === owner) hasH = true;
						if (!friends.includes(block._owner)) return true;
					}
					else {
						if (block._owner !== hero.idx) return true;
					}
				});
				if (!hasO || !hasH || !can) return;

				var result = [];
				if (this.type === 2) {
					active = active || activeType === 2;
					poses.forEach(p => {
						var x = dx + p[0];
						var y = dy + p[1];
						result.push([x, y]);
					});
				}
				else if (this.type === 3) {
					active = active || activeType !== 2;
					poses.forEach(p => {
						var x = dx + p[0];
						var y = dy + p[1];
						result.push([x, y]);
					});
				}
				else if ([4, 5].includes(this.type)) {
					active = true;
				}
				else {
					gates.forEach(g => {
						var x = dx + g[0];
						var y = dy + g[1];
						var b = board[y];
						// if (this.type === 0) active = true;
						if (!b) return;
						b = b[x];
						if (!b) return;
						if (this.type === 0) {
							if (b._owner === -1) {
								active = true;
								result.push([x, y]);
							}
						}
						else if (this.type === 9) {
							if (activeType === 1) {
								if (friends.includes(b._owner)) {
									active = true;
									result.push([x, y]);
								}
							}
							else {
								if (b._owner === hero.idx) {
									active = true;
									result.push([x, y]);
								}
							}
						}
						else {
							if (b._owner >= 0) {
								if (activeType === 1) {
									if (!friends.includes(b._owner)) {
										active = true;
										result.push([x, y]);
									}
								}
								else {
									if (b._owner !== hero.idx) {
										active = true;
										result.push([x, y]);
									}
								}
							}
						}
					});
					if (result.length > 0) choises.push(result);
				}
			});
		});
		return [active, choises];
	}
	copy () {
		var poses = [...this.poses];
		poses.splice(0, 1);
		return new Skill(this.name, poses, this.gates, this.count, this.type, this.level);
	}
	static emptySkill () {
		return new Skill('空', [], [], 0, -1, 0);
	}
	static normalize (poses, gates) {
		var ps = [], gs = [];
		var dx = poses[0][0], dy = poses[0][1];
		poses.forEach(p => {
			if (p[0] < dx) dx = p[0];
			if (p[1] < dy) dy = p[1];
		});
		gates.forEach(p => {
			if (p[0] < dx) dx = p[0];
			if (p[1] < dy) dy = p[1];
		});
		poses.forEach(p => {
			ps.push([p[0] - dx, p[1] - dy]);
		});
		gates.forEach(p => {
			gs.push([p[0] - dx, p[1] - dy]);
		});
		return [ps, gs];
	}
	static rotate (poses, gates) {
		var ps = [], gs = [];
		poses.forEach(p => {
			ps.push([p[1], 0 - p[0]]);
		});
		gates.forEach(p => {
			gs.push([p[1], 0 - p[0]]);
		});
		return [ps, gs];
	}
	static flip (poses, gates) {
		var ps = [], gs = [];
		poses.forEach(p => {
			ps.push([p[0], 0 - p[1]]);
		});
		gates.forEach(p => {
			gs.push([p[0], 0 - p[1]]);
		});
		return [ps, gs];
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
	ui = null;

	constructor (name, pic, skills=[], exts=1, cmbs=0) {
		this.name = name;
		this.image = pic;
		this.skills = skills.map(s => s.copy());
		this.extendCount = exts;
		this.combineCount = cmbs;
	}
	copy () {
		return new Hero(this.name, this.image, this.skills, this.extendCount, this.combineCount);
	}
	getCard (isNew=false) {
		if (!!this.ui && !isNew) return this.ui;
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
		card._card = this;

		this.ui = card;
		return card;
	}
}

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
				card._ui.style.top = (80 - (currIdx - i) * 30) + 'px';
				card._ui.style.transform = 'translateZ(-' + ((currIdx - i) * 20) + 'px)';
			}
			else {
				card._ui.style.top = (200 + (i - currIdx) * 20) + 'px';
				card._ui.style.transform = 'translateZ(-' + (50 + (i - currIdx) * 5) + 'px) rotateX(-45deg)';
			}
		});
		changeCard(currIdx);
	};
	const changeCard = (id) => {
		var card = cardList[id];
		if (!card) return;

		var ui = card.getCard(true);
		ui.classList.add('got');
		RightArea.__cardArea.innerHTML = '';
		RightArea.__cardArea.appendChild(ui);
		RightArea.__skillArea.innerHTML = '';
		card.skills.forEach(skill => {
			var ui = skill.getCard(true);
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

	CyberAvatorArena.FameHall.init = () => {
		CyberAvatorArena.Tool.initHorizontalScroller(RightArea.__skillArea);
	};
	CyberAvatorArena.FameHall.enter = async () => {
		cardList.splice(0);
		cardList.push(...HeroList);
		var ownList = await CyberAvatorArena.Duel.getMyHeros();

		currIdx = 0;
		LeftArea.innerHTML = '';
		cardList.forEach((hero, i) => {
			var info = ownList[hero.name];
			var card = hero.getCard(true);
			if (!!info && !!info.got) {
				card.classList.add('got');
			}
			hero._ui = card;
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
		LeftArea.innerHTML = '';
		RightArea.__cardArea.innerHTML = '';
		RightArea.__skillArea.innerHTML = '';
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
}) ();