(() => {
	const CommandCenter = {
		help () {
			var list = ['当前可用命令:'];
			list.push('help  : 显示本条信息');
			list.push('exit  : 离开新西伯利亚，回到上层元宇宙');
			list.push('info  : 显示本赛灵格当前状态');
			list.push('enter : 跨入新西伯利亚之门');
			newResultLine(list.join('\n'));
		},
		async exit () {
			GateOfNovosibirsk.canInput = false;
			newResultLine('再见，' + PlayerInfo.titles[GateOfNovosibirsk.Player.title] + GateOfNovosibirsk.Player.id);
			newResultLine('没想到你居然逃走了……', 'Mundus');
			await wait(1000);

			LoginResult.innerText = '';
			PanelStage.classList.remove('show');
			LoginStage.classList.add('show');
			LoginHintContainer.appendChild(CmdLineHint);
			GateOfNovosibirsk.canInput = true;
			GateOfNovosibirsk.stage = 0;
			GateOfNovosibirsk.launchGame();
		},
		info () {
			var v = GateOfNovosibirsk.Player;
			var t = `头衔: ${PlayerInfo.titles[v.title]}\n赛灵格属性: \n内存空间: ${v.slot}MB\n硬盘空间: ${v.bag}GB\n基础能量: ${v.life}\n基础转换率: ${v.speed}\n基础破坏力: ${v.attack}\n基础防护力: ${v.defence}`;
			newResultLine(t);
		},
		enter () {
			GateOfNovosibirsk.canInput = false;
			var line = newResultLine('正在将你的GHOST抽离SHELL，请稍等……', 'Mundus');
			var tag = newEle('span');
			tag.innerText = '　|';
			line.appendChild(tag);
			var spin = 0;
			var si = setInterval(() => {
				var s = spin - (spin >> 2 << 2);
				if (s === 0) {
					tag.innerText = '　/';
				}
				else if (s === 1) {
					tag.innerText = '　-';
				}
				else if (s === 2) {
					tag.innerText = '　\\';
				}
				else if (s === 3) {
					tag.innerText = '　|';
				}
				spin ++;
				if (spin === 8) {
					clearInterval(si);
					line.removeChild(tag);
					newResultLine(PlayerInfo.titles[GateOfNovosibirsk.Player.title] + GateOfNovosibirsk.Player.id + '，愿赛博之力与你同在！');
					startGame();
				}
			}, 200);
		},
	};

	const updateHint = () => {
		CMDHint.innerText = `[${GateOfNovosibirsk.Player.id}@novosibirsk ${GateOfNovosibirsk.CurrentPlace}]#`;
	};
	const newResultLine = (text, sprite, type) => {
		var line = newEle('div', 'cmdLine', 'reply');
		var hint = newEle('span', 'clh');
		hint.innerText = (sprite || 'Puppey') + ':';
		line.appendChild(hint);
		var c = newEle('span');
		c.innerText = text;
		line.appendChild(c);
		if (!!type) {
			line.classList.add(type);
		}
		CMDHistory.appendChild(line);
		return line;
	};
	const newInputLine = cmd => {
		var line = newEle('div', 'cmdLine');
		var hint = newEle('span', 'clh');
		hint.innerText = `[${GateOfNovosibirsk.Player.id}@novosibirsk ${GateOfNovosibirsk.CurrentPlace}]#`;
		line.appendChild(hint);
		var c = newEle('span');
		c.innerText = cmd;
		line.appendChild(c);
		CMDHistory.appendChild(line);
	};
	const cmdHandler = cmd => {
		if (cmd.length < 1) return;

		newInputLine(cmd);
		cmd = cmd.split(/ +/).filter(c => !!c);
		var action = cmd.splice(0, 1)[0];
		var handler = CommandCenter[action];
		if (!handler) {
			newResultLine(`指令【${action}】不存在！`, null, 'error');
		}
		else {
			handler(...cmd);
		}

		CMDLine.scrollIntoViewIfNeeded();
	};
	const startGame = () => {
		CmdLineHint.style.display = 'none';
		GateOfNovosibirsk.canInput = false;
		GateOfNovosibirsk.stage = 2;
		PanelStage.classList.add('fadeout');
		GateOfNovosibirsk.startGameLoop();
	};

	GateOfNovosibirsk.startGame = async data => {
		CMDHistory.innerHTML = '';

		GateOfNovosibirsk.Player = data;
		GateOfNovosibirsk.CurrentPlace = '~';

		LoginStage.classList.remove('show');
		PanelStage.classList.add('show');

		updateHint();
		CMDLine.appendChild(CmdLineHint);
		GateOfNovosibirsk.cmdHandler = cmdHandler;
		GateOfNovosibirsk.canInput = true;

		newResultLine(`欢迎${PlayerInfo.titles[data.title]}${data.id}的赛灵格接入新西伯利亚`);
		await wait(500);
		newResultLine(`输入【help】可查看当前可用指令`);

		await wait(1000 + 3000 * Math.random());
		if (GateOfNovosibirsk.stage === 1) {
			newResultLine('收到新邮件：\n新西伯利亚的时空能量出现异常波动，请前往探查真相！\n探索新西伯利亚请输入指令【enter】', 'Mundus', 'message');
		}
	};
}) ();