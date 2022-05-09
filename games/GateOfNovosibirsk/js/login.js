(() => {
	const HintDelay = 1500;
	const TotalMax = 60;
	const SingleMax = 25;

	var loginStage = 0;
	var playerData;
	var idList, newData = {id: '', will: 0, strength: 0, luck: 0};

	const showWelcome = () => {
		var hint = '', needRefresh = false;
		var list = Object.keys(idList).map(id => {
			var v = idList[id];
			if (isNaN(v.slot) || isNaN(v.bag) || isNaN(v.life) || isNaN(v.speed) || isNaN(v.attack) || isNaN(v.defence)) {
				GateOfNovosibirsk.DB.del('player', id);
				needRefresh = true;
				return "DATA ERROR";
			}
			var t = `${id} [ 头衔: ${PlayerInfo.titles[v.title]} 内存空间: ${v.slot}MB 硬盘空间: ${v.bag}GB 基础能量: ${v.life} 基础转换率: ${v.speed} 基础破坏力: ${v.attack} 基础防护力: ${v.defence} ]`;
			return t;
		});
		if (list.length === 0) {
			hint = '欢迎菜鸟来到元宇宙\n请用【login】指令登录你的账号';
		}
		else {
			hint = '欢迎老年回归元宇宙\n请用【login】指令登录你的账号\n\n';
			hint += list.map(id => id).join('\n');
		}
		hint += '\n\n可用指令：\n\n';
		hint += 'login [你的ID] : 登录元宇宙【新西伯利亚】\n';
		hint += 'wipeout : 清除当前所有账号 　';

		LoginHint.innerText = hint;

		if (needRefresh) {
			setTimeout(() => {
				location.reload();
			}, 1000);
		}
	};
	const newPlayer = async (retry=false) => {
		LoginStageHint.innerText = newData.id + '@metaverse create';
		GateOfNovosibirsk.canInput = false;

		if (!retry) {
			LoginResult.innerText = '赛灵格生成中，请稍等……';
			await wait(1000);
		}

		newData.bag = GateOfNovosibirsk.Basic.bag;
		newData.slot = GateOfNovosibirsk.Basic.slot;
		newData.life = GateOfNovosibirsk.Basic.life;
		newData.speed = GateOfNovosibirsk.Basic.speed;
		newData.attack = GateOfNovosibirsk.Basic.attack;
		newData.defence = GateOfNovosibirsk.Basic.defence;
		LoginResult.innerText = `新来的菜鸟${newData.id}注意，你当前所用的赛灵格为：\n内存空间: ${newData.slot}MB 硬盘空间: ${newData.bag}GB 基础能量: ${newData.life} 基础转换率: ${newData.speed} 基础破坏力: ${newData.attack} 基础防护力: ${newData.defence}\n确认请输入【ok】，取消生成输入【cancel】`;

		loginStage = 1;
		GateOfNovosibirsk.canInput = true;
	};
	const startGame = data => {
		var welcome = `赛灵格${data.id}就绪，正在登入元宇宙【新西伯利亚】`;

		LoginResult.innerText = welcome + ' |';
		GateOfNovosibirsk.stage = 1;
		GateOfNovosibirsk.canInput = false;

		var spin = 0;
		var si = setInterval(() => {
			var s = spin - (spin >> 2 << 2);
			if (s === 0) {
				LoginResult.innerText = welcome + ' /';
			}
			else if (s === 1) {
				LoginResult.innerText = welcome + ' -';
			}
			else if (s === 2) {
				LoginResult.innerText = welcome + ' \\';
			}
			else if (s === 3) {
				LoginResult.innerText = welcome + ' |';
			}
			spin ++;
			if (spin === 8) {
				clearInterval(si);
				GateOfNovosibirsk.startGame(data);
			}
		}, 200);
	};
	const createPlayer = async () => {
		LoginResult.innerText = '正在生成赛灵格数据，请稍等……';
		newData.title = "green";
		await GateOfNovosibirsk.DB.set('player', newData.id, newData);
		await wait(1000);
		startGame(newData);
	};

	GateOfNovosibirsk.launchGame = async () => {
		idList = await GateOfNovosibirsk.DB.all('player', null);

		GateOfNovosibirsk.cmdHandler = async cmd => {
			if (GateOfNovosibirsk.stage !== 0) return;
			cmd = cmd.split(/ +/).filter(c => !!c);
			if (cmd.length < 1) return;

			var action = cmd.splice(0, 1)[0];
			if (loginStage === 0) {
				if (action === 'wipeout') {
					LoginResult.innerText = '账号清理中……';
					idList = {};
					await GateOfNovosibirsk.DB.clear('player');
					LoginResult.innerText = '本元宇宙已清空';
					showWelcome();
					return;
				}
				if (action === 'login') {
					newData.id = cmd[0];
					if (!newData.id) {
						LoginResult.innerText = '指令错误！';
						return;
					}
					let data = idList[newData.id];
					if (!data) {
						newPlayer();
					}
					else {
						startGame(data);
					}
					return;
				}
				LoginResult.innerText = '指令不可用';
			}
			else if (loginStage === 1) {
				if (action === 'ok') {
					createPlayer();
					return;
				}
				// if (action === 'retry') {
				// 	newPlayer(true);
				// 	return;
				// }
				if (action = 'cancel') {
					loginStage = 0;
					LoginStageHint.innerText = 'guest@metaverse ~';
					LoginResult.innerText = '';
					return;
				}
			}
		};

		showWelcome();
	};
}) ();