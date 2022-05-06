const TerrainInfo = {
	plain: {
		name: '草地',
		color: "rgb(102, 193, 140)",
	},
	water: {
		name: '小河',
		color: "rgb(176, 213, 223)",
	},
	swamp: {
		name: '沼泽',
		color: "rgb(49, 74, 67)",
	},
	beach: {
		name: '河滩',
		color: "rgb(110, 85, 47)",
	},
	forest: {
		name: '树林',
		color: "rgb(32, 127, 76)",
	},
	passway: {
		name: '道路',
		color: "rgb(140, 75, 49)",
	},
	urban: {
		name: '市区',
		color: "rgb(232, 176, 4)",
	},
	ruin: {
		name: '遗迹',
		color: "rgb(72, 37, 34)",
	},
	mountain: {
		name: '山地',
		color: "rgb(183, 141, 18)",
	},
	canyon: {
		name: '峡谷',
		color: "rgb(138, 105, 19)",
	},
	house: {
		name: '房屋',
		color: "rgb(249, 244, 220)",
	},
	landscape: {
		name: '建筑',
		color: "rgb(252, 210, 23)",
	},
};

const HouseInfo = {
	// Sculpture
	fountain: {
		name: "中央喷泉",
		icon: ["fa-solid", "fa-arrow-up-from-ground-water"],
		desc: "每天凌晨增加5点能量，路过也能恢复1点能量。",
		action: (role) => {
			role.base.life += 1;
			return ["增加1点能量", 0];
		},
	},
	devilsculpture: {
		name: "恶魔雕像",
		icon: ["fa-solid", "fa-spaghetti-monster-flying"],
		desc: "会施加虚弱光环，请小心避开哦！",
		action: (role, isNight, isRuin, cfg) => {
			if (isNight) {
				role.base.life -= 3;
				role.base.attack -= 2;
				role.base.defence -= 1;
				return ["被夜间虚弱光环影响，降低3点能量、2点破坏力与1点防护力", 0];
			}
			else {
				let idx = Math.floor(Math.random() * 3);
				if (idx === 1) {
					role.base.attack -= 2;
					return ["被夜间虚弱光环影响，降低2点破坏力", 0];
				}
				else if (idx === 2) {
					role.base.defence -= 1;
					return ["被夜间虚弱光环影响，降低1点防护力", 0];
				}
				else {
					role.base.life -= 3;
					return ["被夜间虚弱光环影响，降低3点", 0];
				}
			}
		},
	},

	// Building
	chargeStation: {
		name: "充能站",
		icon: ["fa-solid", "fa-gas-pump"],
		desc: "增加1点防护力",
		action: (role, isNight, isRuin) => {
			if (isRuin) {
				return ["该充能站已废弃，啥事都没发生……", 0];
			}
			else {
				role.base.defence += 1;
				return ["成功为护盾补充能量，增加了1点防护力。", 8];
			}
		},
	},
	gym: {
		name: "健身房",
		icon: ["fa-solid", "fa-dumbbell"],
		desc: "增加2点破坏力",
		action: (role, isNight, isRuin) => {
			if (isRuin) {
				return ["该健身房已废弃，啥事都没发生……", 0];
			}
			else {
				role.base.attack += 2;
				return ["锻炼了身体，增加了5点力量上限。", 20];
			}
		},
	},
	dataCenter: {
		name: "计算中心", // 提升智慧
		icon: ["fa-brands", "fa-nfc-directional"],
		desc: "在这里，你可以与元宇宙沟通",
		action: (role, isNight, isRuin) => {
			console.log('获得剧情碎片！');
			if (isRuin) {
				return ["数据中心被毁……", 0];
			}
			else {
				return ["获得一枚世界碎片", 20];
			}
		},
	},
	church: {
		name: "静思堂",
		icon: ["fa-solid", "fa-place-of-worship"],
		desc: "提升2点能量与1点转换速率",
		action: (role, isNight, isRuin) => {
			if (isRuin) {
				return ["该静思堂已废弃，啥事都没发生……", 0];
			}
			else {
				role.base.life += 2;
				role.base.speed ++;
				return ["锻炼了身心，增加了2点能量、提升了1点转换速率", 35];
			}
		},
	},
	medical: {
		name: "医院",
		icon: ["fa-solid", "fa-house-medical"],
		desc: "增加3点能量与1点防护力",
		action: (role, isNight, isRuin) => {
			if (isRuin) {
				return ["该医院已废弃，啥事都没发生……", 0];
			}
			else {
				role.base.life += 3;
				role.base.defence ++;
				return ["增加了3点能量与1点防护力。", 45];
			}
		},
	},
	library: {
		name: "图书馆",
		icon: ["fa-solid", "fa-book-open-reader"],
		desc: "传说这里被封存着上古知识",
		action: (role, isNight, isRuin) => {
			console.log('到达图书馆');
			if (isRuin) {
				return ["该健身房已废弃，啥事都没发生……", 0];
			}
			else {
				return ["锻炼了身体，增加了5点力量上限。", 60];
			}
		},
	},
	hall: {
		name: "市政大厅",
		icon: ["fa-solid", "fa-archway"],
		desc: "新任市长一直强调身体是革命的本钱，他自己就是一位体格健壮的政客，而且，我也不清楚，总之他的政敌都莫名其妙地消失了。",
		action: async (role, isNight, isRuin, utils) => {
			if (isRuin) return ['', 0];
			var house = utils.pickRuinHouses();
			if (house.length === 0) {
				await utils.addFinalEventPath();
				return ['', 0];
			}
			house = house[Math.floor(house.length * Math.random())];
			utils.rebuildRuin(...house.pos);
			var name = '一栋被废弃的房子';
			if (house.type) {
				let name = HouseInfo[house.type];
				name = !!name ? name.name : '一栋神秘的房子';
			}
			await utils.showFightResult('市政信息', ['重建了' + name]);
			return ['一栋废墟被重建了', 55, 1];
		},
	},
	cemetery: {
		name: "墓园", // 生化类事件
		icon: ["fa-solid", "fa-cross"],
		desc: "自从上一任守夜人离奇失踪后，这里就再无人烟了。每天，镇上的人都不敢靠近这里，因为这里现在充斥着让人不寒而栗的都市传说。",
		action: (role, isNight, isRuin) => {
			console.log('来到墓园');
			return ['', 0]
		},
	},
	manor: {
		name: "庄园", // 精神类事件
		icon: ["fa-brands", "fa-fort-awesome"],
		desc: "这里住着一位虔诚的求道者，他声称已经发现了世界的真相，但从那以后便从人们的视野中消失不见了。",
		action: (role, isNight, isRuin) => {
			console.log('来到庄园');
			return ['', 0]
		},
	},
	mineral: {
		name: "矿场", // 电子类事件
		icon: ["fa-solid", "fa-industry"],
		desc: "这是一块奇怪的地方，曾在这里工作过的人都说，在矿井地下有一种说不清楚的压迫感，和小镇的气息完全不符。",
		action: (role, isNight, isRuin) => {
			console.log('来到矿场');
			return ['', 0]
		},
	},
	laboratory: {
		name: "实验室",
		icon: ["fa-solid", "fa-microscope"],
		desc: "神秘的实验室，总是传来奇怪的声响，而且已经十多年没人见到过实验室主任了，而且它的周围总是萦绕着诡异的傀儡传闻。",
		action: (role, isNight, isRuin) => {
			console.log('来到实验室');
			return ['', 0]
		},
	},
	secretLab: {
		name: "林中小屋", // BOSS出生点
		icon: ["fa-solid", "fa-chess-rook"],
		desc: "隐藏在禁林中的神秘小屋，但从来没有人找到过这块地方。",
		action: (role, isNight, isRuin) => {
			console.log('来到林中小屋');
			return ['', 0]
		},
	},

	residential: {
		name: "民居",
		icon: ["fa-solid", "fa-house-chimney-window"],
		desc: "可作为凌晨苏醒点，且恢复2点力量。",
		action: (role, isNight, isRuin) => {
			return ['', 0]
		},
	},
	restaurant: {
		name: "酒吧",
		icon: ["fa-solid",  "fa-champagne-glasses"],
		desc: "和黑道贩子交换零件，但打开之前你也不知道会换来什么",
		action: async (role, isNight, isRuin, utils) => {
			if (isRuin) {
				return ["该酒吧已废弃，啥事都没发生……", 0];
			}
			else if (role.package.key > 0) {
				let eq;
				if (isNight) {
					let others = role.package.bag.filter(eq => !role.equips.includes(eq));
					if (others.length === 0) {
						eq = Math.floor(role.equips.length * Math.random());
						eq = role.equips[eq];
					}
					else {
						eq = Math.floor(others.length * Math.random());
						eq = others[eq];
					}
				}
				else {
					eq = Math.floor(role.package.bag.length * Math.random());
					eq = role.package.bag[eq];
				}
				let price = Math.floor(eq.props.length / 5 + 1);
				if (role.package.key < price) {
					return ['没有足够的钥匙，无法完成黑市交易', 15];
				}
				role.package.key -= price;
				let neq = utils.newEquipment(eq.props.length, true);
				let msg = ['用钥匙和黑市贩子完成交易', '用' + eq.fullname + '换来了' + neq.fullname + '。'];
				eq.name = neq.name;
				eq.fullname = neq.fullname;
				eq.type = neq.type;
				eq.life = neq.life;
				eq.speed = neq.speed;
				eq.attack = neq.attack;
				eq.defence = neq.defence;
				eq.props.splice(0, eq.props.length);
				eq.props.push(...neq.props);
				await utils.showFightResult('黑市交易', msg);
				return [msg.join('，'), 30];
			}
			else {
				return ["没有黑市贩子想要的门钥匙，灰溜溜地走了。", 15];
			}
		},
	},
	_storehouse: [],
	storehouse: {
		name: "仓库",
		icon: ["fa-solid", "fa-warehouse"],
		desc: "用钥匙可以往仓库里存放零件的复制品哦！",
		action: (role, isNight, isRuin, utils) => {
			var msg, time = 30, copy = [], l;
			var store = [...role.package.bag];

			if (role.package.key > 0) {
				role.package.key --;

				if (HouseInfo._storehouse.length === 0) {
					msg = '仓库中空空如也，啥都没有……';
					time = 1;
				}
				else if (!isRuin) {
					let n = role.equips.length + role.bag - role.package.bag.length;
					l = HouseInfo._storehouse.length;
					for (let i = Math.max(0, l - n); i < l; i ++) {
						let eq = HouseInfo._storehouse[i];
						let deq = {
							type: eq.type,
							name: eq.name,
							fullname: eq.fullname,
							life: eq.life,
							speed: eq.speed,
							attack: eq.attack,
							defence: eq.defence,
							props: eq.props.map(halo => [...halo]),
						};
						utils.addEquipmentIntoBag(deq);
					}
					msg = "从仓库中取出" + n + '件零件';
					time = n * 3;
				}
				else {
					msg = '废墟仓库的门坏了，无法取出零件';
					time = 5;
				}
			}
			else {
				msg = '没有钥匙启动仓库，无法提取零件';
				time = 1;
			}

			l = HouseInfo._storehouse.length + store.length - 50;
			if (l > 0) {
				HouseInfo._storehouse.splice(0, l);
			}
			store.forEach(eq => {
				var deq = {
					type: eq.type,
					name: eq.name,
					fullname: eq.fullname,
					life: eq.life,
					speed: eq.speed,
					attack: eq.attack,
					defence: eq.defence,
					props: eq.props.map(halo => [...halo]),
				};
				HouseInfo._storehouse.push(deq);
			});

			return [msg, time];
		},
	},
	refitor: {
		name: "改装屋",
		icon: ["fa-solid", "fa-gears"],
		desc: "可以升级装备的好地方",
		action: async (role, isNight, isRuin, utils) => {
			if (isRuin) {
				let msg;
				if (isNight) {
					let monster = {
						name: "二重身魔",
						base: {
							life: role.base.life,
							speed: role.base.speed,
							attack: role.base.attack,
							defence: role.base.defence,
						},
						halo: [],
						equips: [],
						icon: [...role.icon],
					};
					let level = 0;
					role.equips.forEach(eq => {
						if (eq.props.length > level) level = eq.props.length;
					});
					for (let i = 0; i <= role.slot; i ++) {
						let eq = utils.newEquipment(level + (Math.random() > 0.5 ? 1 : 0), true);
						monster.equips.push(eq);
					}
					utils.updateRoleInfo(monster);
					let died = await utils.hitMonster([monster], true);
					if (died) {
						msg = "晚上来到闹鬼的改装屋，遇到了二重身魔并被它暴揍了一顿，";
						let others = role.package.bag.filter(eq => !role.equips.includes(eq));
						let eq;
						if (others.length === 0) {
							eq = Math.floor(role.equips.length * Math.random());
							eq = role.equips.splice(eq, 1)[0];
							msg += '被摧毁了一件装备中的零件。';
						}
						else {
							eq = others[Math.floor(others.length * Math.random())];
							msg += '被摧毁了一件闲置的零件。';
						}
						eq = role.package.bag.indexOf(eq);
						role.package.bag.splice(eq, 1);
					}
					else {
						msg = "晚上来到闹鬼的改装屋，遇到了二重身魔并战胜了它，获得了它的所有装备。";
						monster.equips.forEach(eq => utils.addEquipmentIntoBag(eq));
					}
					await utils.showFightResult(!died, msg.replace('。', '').split('，'));
				}
				else {
					let eq = role.package.bag[Math.floor(role.package.bag.length * Math.random())];
					if (!eq) {
						msg = "白天来到被闹鬼的改装屋，鬼被一件装备都没有的你给吓跑了……";
					}
					else {
						msg = "白天来到被闹鬼的改装屋，导致一件装备被降级。";
						let idx = Math.floor(eq.props.length * Math.random());
						eq.props.splice(idx, 1);
						eq.fullname = utils.getEquipName(eq);
					}
					await utils.showFightResult('零件被降级', msg.replace('。', '').split('，'));
				}
				return [msg, 60];
			}
			else {
				let list, msg;
				if (isNight) {
					list = role.package.bag;
					msg = "升级了一件随机零件";
				}
				else {
					list = role.equips;
					msg = "升级了一件装备中的零件";
				}
				if (list.length === 0) return ['无可用零件可供升级', 10];

				let price = Math.floor(list.length / 5 + 1);
				if (role.package.key < price) {
					return ["没有足够的钥匙，零件无法升级。", 25];
				}
				role.package.key -= price;

				let idxs = [], level = Infinity;
				list.forEach(eq => {
					if (eq.props.length < level) {
						level = eq.props.length;
						idxs = [eq];
					}
					else if (eq.props.length === level) {
						idxs.push(eq);
					}
				});
				let eq = idxs[Math.floor(Math.random() * idxs.length)];
				msg = [msg + '：', eq.fullname, '升级为'];
				utils.addEquipHalo(eq);
				eq.fullname = utils.getEquipName(eq);
				msg.push(eq.fullname);
				await utils.showFightResult('升级零件', msg);
				return [msg.join("，").join("：，", "："), 45];
			}
		},
	},
	school: {
		name: "学校",
		icon: ["fa-solid", "fa-school"],
		desc: "学者们在这里研究怎么用普通零件融合出更强的零件",
		action: async (role, isNight, isRuin, utils) => {
			if (isRuin) {
				return ["该学校已废弃……", 3];
			}

			var cost = role.package.key === 0 ? 5 : 3;

			var using = [], waits = [];
			role.package.bag.forEach((eq, i) => {
				if (role.equips.includes(eq)) {
					using.push(eq);
				}
				else {
					waits.push(i);
				}
			});
			var total = waits.length;
			using = using.filter(eq => Math.round((eq.props.length + 1) * cost) <= total);
			if (using.length === 0) {
				return ['没有足够的闲置零件来升级零件', cost];
			}

			var target = using[Math.floor(using.length * Math.random())];
			var name = target.fullname;
			var count = Math.round((target.props.length + 1) * cost);
			role.package.key = 0;

			var removes = [];
			for (let i = 0; i < count; i ++) {
				let idx = Math.floor(waits.length * Math.random());
				idx = waits.splice(idx, 1)[0];
				removes.push(idx)
			}
			removes.sort((a, b) => b - a);
			removes.forEach(i => {
				role.package.bag.splice(i, 1);
			});

			utils.addEquipHalo(target);
			target.fullname = utils.getEquipName(target);

			var msg = ["用所有钥匙及" + count + "件闲置零件", "升级了一件零件：", name , "升级为", target.fullname];
			await utils.showFightResult("零件炼成", msg);

			return [msg.join(''), cost];
		},
	},
	bookshop: {
		name: "咖啡书店",
		icon: ["fa-solid", "fa-book-open"],
		desc: "白天路过可恢复力量，晚上路过可恢复意志",
		action: (role, isNight, isRuin) => {
			var name, value, luck, time;
			if (isRuin) {
				value = 1;
				luck = -1;
			}
			else {
				value = 2;
				luck = 1;
			}
			if (isNight) {
				name = "意志";
				role.will = Math.min(role.will + value, role.maxWill);
				role.luck += luck;
				time = 45;
			}
			else {
				name = "力量";
				role.strength = Math.min(role.strength + value, role.maxStrength);
				role.luck += luck;
				time = 30;
			}
			if (luck < 0) return [`恢复了${value}点${name}但损失了${-luck}点运气`, time];
			else if (luck === 0) return [`恢复了${value}点${name}`, time];
			else return [`恢复了${value}点${name}与${luck}点运气`, time];
		},
	},
	comproom: {
		name: "元宇宙碎片",
		icon: ["fa-solid", "fa-laptop-code"],
		desc: "在这里，你可以与元宇宙沟通",
		action: (role, isNight, isRuin) => {
			if (Math.random() > role.luck / 60) return ['', 0];
			if (isRuin) {
				return ["数据中心被毁……", 0];
			}
			else {
				let rnd = Math.random();
				if (rnd < 0.2) {
					if (role.luck <= 5) return ['', 0];
					role.luck --;
					console.log('获得剧情碎片！');
					return ["同1点运气换取了一枚世界碎片", 10];
				}
				else if (rnd < 0.6) {
					if (role.strength <= 5) return ['', 0];
					role.strength -= 5;
					console.log('获得剧情碎片！');
					return ["同5点力量换取了一枚世界碎片", 10];
				}
				else {
					if (role.will <= 5) return ['', 0];
					role.will -= 5;
					console.log('获得剧情碎片！');
					return ["同5点意志换取了一枚世界碎片", 10];
				}
			}
		},
	},
	printroom: {
		name: "3D打印室",
		icon: ["fa-solid", "fa-cash-register"],
		desc: "用当前所有素材换取最强傀儡的复制品",
		action: async (role, isNight, isRuin, utils) => {
			if (isRuin) {
				return ["3D打印室被毁……", 0];
			}

			if (role.package.key < 1) {
				return ['钥匙不够，无法打印', 1];
			}

			var msg = [], list = [...role.package.bag];
			var num = Math.min(role.slot, role.package.bag.length);
			msg.push("复制了" + num + '份零件：');
			for (let i = 0; i < num; i ++) {
				let eq = Math.floor(list.length * Math.random());
				eq = list.splice(eq, 1)[0];
				msg.push(eq.fullname);
				eq = JSON.parse(JSON.stringify(eq));
				utils.addEquipmentIntoBag(eq);
			}


			await utils.showFightResult("复制零件", msg);
			return [msg.join('，').replace("：，", "："), num * 2];
		},
	},
	haunted: {
		name: "凶宅",
		icon: ["fa-solid", "fa-ghost"],
		desc: "这个地方闹鬼了……",
		action: async (role, isNight, isRuin, utils) => {
			var rate = 0.3;
			if (isRuin) rate *= 2;
			if (Math.random() > rate) {
				return ['路过一处鬼屋，背脊凉飕飕的……', 0];
			}
			var msg, monsters = [];
			if (isNight) {
				msg = "深夜误入鬼屋，遭遇两头二重身魔，";
				let monster = {
					name: "二重身魔A",
					base: {
						life: Math.ceil(role.base.life / 2),
						speed: role.base.speed,
						attack: role.base.attack,
						defence: role.base.defence,
					},
					halo: [],
					equips: [],
					icon: [...role.icon],
				};
				let level = 0;
				role.equips.forEach(eq => {
					if (eq.props.length > level) level = eq.props.length;
				});
				level = Math.max(level - 1, 0);
				for (let i = 0; i < role.slot - 1; i ++) {
					let eq = utils.newEquipment(level, true);
					monster.equips.push(eq);
				}
				utils.updateRoleInfo(monster);
				monsters.push(monster);

				monster = {
					name: "二重身魔B",
					base: {
						life: Math.ceil(role.base.life / 2),
						speed: role.base.speed,
						attack: role.base.attack,
						defence: role.base.defence,
					},
					halo: [],
					equips: [],
					icon: [...role.icon],
				};
				for (let i = 0; i < role.slot - 1; i ++) {
					let eq = utils.newEquipment(level, true);
					monster.equips.push(eq);
				}
				utils.updateRoleInfo(monster);
				monsters.push(monster);
			}
			else {
				msg = "误入鬼屋遭遇二重身魔，";
				let monster = {
					name: "二重身魔",
					base: {
						life: role.base.life,
						speed: role.base.speed,
						attack: role.base.attack,
						defence: role.base.defence,
					},
					halo: [],
					equips: [],
					icon: [...role.icon],
				};
				for (let i = 0; i < role.slot; i ++) {
					let oeq = role.equips[i];
					if (!oeq) continue;
					let eq = utils.newEquipment(oeq.props.length, true);
					monster.equips.push(eq);
				}
				monster.equips.push(utils.newEquipment());
				utils.updateRoleInfo(monster);
				monsters.push(monster);
			}

			var died = await utils.hitMonster(monsters, true);
			if (died) {
				msg += "并被暴揍了一顿，";
				let others = role.package.bag.filter(eq => !role.equips.includes(eq));
				let eq;
				if (others.length === 0) {
					role.base.life -= 10;
					role.base.speed -= 1;
					role.base.attack -= 5;
					role.base.defence -= 2;
					msg += '被降低了一圈属性。';
				}
				else {
					eq = others[Math.floor(others.length * Math.random())];
					eq = role.package.bag.indexOf(eq);
					role.package.bag.splice(eq, 1);
					msg += '被摧毁了一件闲置的零件。';
				}
			}
			else {
				msg += "战斗胜利后获得了一堆装备。";
				monsters.forEach(mon => {
					mon.equips.forEach(eq => utils.addEquipmentIntoBag(eq));
				});
			}
			await utils.showFightResult(!died, msg.replace('。', '').split('，'));
			return [msg, 60];
		},
	},
};