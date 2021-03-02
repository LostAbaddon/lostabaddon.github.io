(() => {
	// 运行参数
	const Grid = Devices.isMobile ? 16 : 26;
	const Size = 1000;
	const Star = 4;
	const Win = 5;
	const Piece = 0.8;
	const PlayerColors = [
		"rgb(22,24,35)",
		"rgb(233,231,239)"
	];
	const PlayerNames = [ '黑子', '白子' ];
	const PlayerUIs = [ 'black', 'white' ];
	const AIPlayers = [];
	const ScorePower = 2;
	const DistrCount = 6;
	const Delay = 250;
	const DrawStrategy = false;
	const GameModeOption = {
		forbidden: false,
		startWithInits: 0,
		getDBName () {
			return (GameModeOption.forbidden ? 'f' : 'n') + GameModeOption.startWithInits;
		}
	};

	// 常用参数
	const TPI = 2 * Math.PI;

	// 运行变量
	var ctx;
	var size;
	var pad;
	var margin;
	var radius;
	var player;
	var aiList = [];
	var roleList = [];
	var RushGo;
	var PlayerHints = [];
	var LoopCountUI;
	var ResultPad, ResultHint, ResultRestart, ResultGM;
	var RoleSelector, RoleSelectorListj, AddNewRole;
	var GameModePad;
	var winCount = [];
	var currentPos = [];
	var record = [];
	var recordLast = null;
	var recordIndex = 0;
	var reviewing = false;
	var roleSelecting = false;
	var trainCode = -1;

	// 交互
	const onClick = (evt) => {
		if (reviewing || window.RushGo.pause) return;

		var rect = GoBoard.getBoundingClientRect();
		var p = rect.width / (Grid + 1), m = p / 2;
		var x = evt.x - rect.x, y = evt.y - rect.y;
		x = Math.round((x - m) / p);
		y = Math.round((y - m) / p);
		if (x < 0 || y < 0 || x > Grid || y > Grid) return;
		// 座子
		if (window.RushGo.loopCount < GameModeOption.startWithInits) {
			if (!checkInitGo(RushGo, x, y)) return;
		}

		var start = window.RushGo.timeStart[player];
		if (start === 0) {
			start = Date.now();
			window.RushGo.timeStart[player] = start;
		}
		window.RushGo.timeUsed[player] += Date.now() - start;
		posGo(x, y);
	};
	const onKey = (evt) => {
		if (window.RushGo.pause || roleSelecting) return;

		if (evt.key === 'n') {
			if (!window.RushGo.finished) return;
			restartRushGo();
		}
		else if (evt.key === 'm') {
			if (!window.RushGo.finished) return;
			chooseGameMode();
		}
		else if (evt.key === 'r') {
			if (!window.RushGo.finished) return;
			reviewRushGo();
		}
		else if (evt.key === 'ArrowUp') {
			if (!reviewing) return;
			if (recordIndex === 0) return;
			recordIndex --;
			showReview();
		}
		else if (evt.key === 'ArrowDown') {
			if (!reviewing) return;
			var total = record.length - 1;
			if (recordIndex === total) return;
			recordIndex ++;
			showReview();
		}
		else if (evt.key === 'Home') {
			if (!reviewing) return;
			recordIndex = 0;
			showReview();
		}
		else if (evt.key === 'End') {
			if (!reviewing) return;
			recordIndex = record.length - 1;
			showReview();
		}
	};
	const restartRushGo = async () => {
		document.body.classList.remove('reviewing');
		reviewing = false;
		window.RushGo.finished = false;
		ResultPad.classList.remove('show');
		ResultPad.classList.remove('init');
		ResultRestart.innerHTML = '再来一局';

		for (let i = 0; i < 2; i ++) {
			let ai = aiList[i];
			if (!!ai && !!ai.loadMap) await ai.loadMap();
		}

		newRushGo();
		if (trainCode > 0) {
			let fun = initGo['game' + trainCode];
			if (!!fun) fun();
		}

		for (let i = 0; i < 2; i ++) {
			window.RushGo.timeUsed[i] = 0;
			window.RushGo.timeStart[i] = 0;
		}

		player = window.RushGo.starter;
		if (AIPlayers.includes(player)) {
			let p = Math.round(Grid / 2);
			posGo(p, p);
		}
		else {
			drawAll();
		}
	};
	const chooseGameMode = () => {
		GameModePad.classList.add('show');
	};
	const reviewRushGo = () => {
		if (window.RushGo.pause || reviewing) return;
		reviewing = true;
		recordIndex = record.length - 1;
		document.body.classList.add('reviewing');
		ResultPad.classList.remove('show');
	};
	const showReview = () => {
		ctx.clearRect(0, 0, Size + margin * 2, Size + margin * 2);
		drawPad();

		var rec = record[recordIndex];
		rec.forEach(r => {
			drawPiece(r[1], r[2], PlayerColors[r[0]]);
		});

		var last = rec[recordIndex];
		drawStar(last[1], last[2], 'rgb(200,60,35)');
		// var scores = last[4];
		// for (let i = 0; i < 2; i ++) {
		// 	if (!!scores) PlayerHints[i]._score.innerHTML = scores[i] || 0;
		// }
		var strategy = last[5];
		if (DrawStrategy && !!strategy) drawStrategy(strategy);

		LoopCountUI.innerHTML = (recordIndex + 1) + ' / ' + window.RushGo.loopCount;
	};
	const refreshRoleList = () => {
		var roleList = window.RushGo.AIManager.load();
		var roleHTML = '';
		roleList.forEach((role, i) => {
			var html = '<span class="name">' + role.name;
			if (role.type === 'human') {
				html += '（人）';
			}
			else if (role.type === 'aiOne') {
				html += '（AI）';
			}
			html += ' ' + role.score + '分';
			html += '</span><span class="score black">先手胜率： ' + role.blackWin + ' / ' + role.blackLose + ' / ' + role.blackCount;
			html += '</span><span class="score white">后手胜率： ' + role.whiteWin + ' / ' + role.whiteLose + ' / ' + role.whiteCount;
			html = '<div class="role" role="' + role.type + '" index="' + i + '">' + html + '</div>';
			if (role.type === 'aiOne') {
				let h = '<div class="intro">';
				h += '类型：AI1<span class="sep"></span>';
				h += '进攻：' + role.char[0] + '<span class="sep"></span>';
				h += '忍耐：' + role.char[1] + '<span class="sep"></span>';
				h += '预判深度：' + role.char[2] + '<span class="sep"></span>';
				h += '广度：' + role.char[3] + '<span class="sep"></span>';
				h += '换位：' + (role.char[5] ? '是' : '否') + '<span class="sep"></span>';
				h += '外势倾向：' + role.char[4];
				h += '</div>';
				html += h;
			}
			else if (role.type === 'aiTwo') {
				let h = '<div class="intro">';
				h += '类型：AI2<span class="sep"></span>';
				h += '进攻：' + role.char[0] + '<span class="sep"></span>';
				h += '忍耐：' + role.char[1] + '<span class="sep"></span>';
				h += '预判深度：' + role.char[2] + '<span class="sep"></span>';
				h += '广度：' + role.char[3] + '<span class="sep"></span>';
				h += '换位：' + (role.char[5] ? '是' : '否') + '<span class="sep"></span>';
				h += '外势倾向：' + role.char[4];
				h += '</div>';
				html += h;
			}
			else if (role.type === 'aiThree') {
				let h = '<div class="intro">';
				h += '类型：AI3<span class="sep"></span>';
				h += '进攻：' + role.char[0] + '<span class="sep"></span>';
				h += '忍耐：' + role.char[1] + '<span class="sep"></span>';
				h += '预判深度：' + role.char[2] + '<span class="sep"></span>';
				h += '广度：' + role.char[3] + '<span class="sep"></span>';
				// h += '换位：' + (role.char[5] ? '是' : '否') + '<span class="sep"></span>';
				h += '外势倾向：' + role.char[4] + '<span class="sep"></span>';
				h += '深思广度：' + role.char[6] + '<span class="sep"></span>';
				h += '深思减速：' + role.char[7] + '<span class="sep"></span>';
				h += '旁支权重：' + role.char[8];
				h += '</div>';
				html += h;
			}
			else if (role.type === 'aiFour') {
				let h = '<div class="intro">';
				h += '类型：AI3<span class="sep"></span>';
				h += '进攻：' + role.char[0] + '<span class="sep"></span>';
				h += '忍耐：' + role.char[1] + '<span class="sep"></span>';
				h += '预判深度：' + role.char[2] + '<span class="sep"></span>';
				h += '广度：' + role.char[3] + '<span class="sep"></span>';
				// h += '换位：' + (role.char[5] ? '是' : '否') + '<span class="sep"></span>';
				h += '外势倾向：' + role.char[4] + '<span class="sep"></span>';
				h += '深思广度：' + role.char[6] + '<span class="sep"></span>';
				h += '深思减速：' + role.char[7] + '<span class="sep"></span>';
				h += '旁支权重：' + role.char[8];
				h += '</div>';
				html += h;
			}
			roleHTML += html;
		});
		RoleSelectorList.innerHTML = roleHTML;
	};
	const startSelectRole = (id) => {
		if (!window.RushGo.finished) return; // 对局中不能替换AI
		if (roleSelecting) return; // 角色选择不能多次出发
		roleSelecting = true;

		refreshRoleList();

		RoleSelector._id = id;
		RoleSelector.classList.add('show');
	};
	const chooseRole = (id, aiID) => {
		var player = window.RushGo.AIManager.AIList[aiID];
		var role = player.type;
		if (role === 'human') {
			let index = AIPlayers.indexOf(id);
			if (index >= 0) AIPlayers.splice(index, 1);
		}
		else if (role === 'aiTwo') {
			let index = AIPlayers.indexOf(id);
			if (index < 0) AIPlayers.push(id);
			aiList[id] = new window.RushGo.AITwo(id, ...(player.char));
		}
		else if (role === 'aiThree') {
			let index = AIPlayers.indexOf(id);
			if (index < 0) AIPlayers.push(id);
			aiList[id] = new window.RushGo.AIThree(id, ...(player.char));
		}
		else if (role === 'aiFour') {
			let index = AIPlayers.indexOf(id);
			if (index < 0) AIPlayers.push(id);
			aiList[id] = new window.RushGo.AIFour(id, ...(player.char));
		}
		else {
			let index = AIPlayers.indexOf(id);
			if (index < 0) AIPlayers.push(id);
			aiList[id] = new window.RushGo.AIOne(id, ...(player.char));
		}
		PlayerHints[id]._name.innerHTML = player.name;
		roleList[id] = aiID;
		roleSelecting = false;
		RoleSelector.classList.remove('show');
		for (let i = 0; i < 2; i ++) winCount[i] = 0;
	};
	const initGameModePad = () => {
		var option;
		try {
			option = JSON.parse(localStorage.gameOption);
			GameModeOption.forbidden = option.forbidden;
			GameModeOption.startWithInits = option.startWithInits;
		} catch {}
		GameModePad.querySelector('input[name="ForbiddenHands"][value="' + GameModeOption.forbidden + '"]').checked = true;
		GameModePad.querySelector('input[name="StartWithInits"][value="' + GameModeOption.startWithInits + '"]').checked = true;

		GameModePad.querySelector('span.btn.start').addEventListener('click', () => {
			[].forEach.call(GameModePad.querySelectorAll('input[name="ForbiddenHands"]'), ui => {
				if (!ui.checked) return;
				GameModeOption.forbidden = ui.value === 'true';
			});
			[].forEach.call(GameModePad.querySelectorAll('input[name="StartWithInits"]'), ui => {
				if (!ui.checked) return;
				GameModeOption.startWithInits = ui.value * 1;
			});
			localStorage.gameOption = JSON.stringify(GameModeOption);
			GameModePad.classList.remove('show');
		});
	};
	const checkInitGo = (board, x, y) => {
		var win = Win - 1;
		// if (player === window.RushGo.starter && GameModeOption.forbidden) win --;
		for (let i = 0; i <= Grid; i ++) {
			let l = board[i];
			for (let j = 0; j <= Grid; j ++) {
				let g = l[j];
				if (g < 0) continue;
				if (Math.abs(i - x) < win && Math.abs(j - y) < win) return false;
			}
		}
		return true;
	};

	// 功能函数
	const newRushGo = () => {
		window.RushGo.loopCount = 0;
		RushGo = [];
		for (let i = 0; i <= Grid; i ++) {
			let line = [];
			for (let j = 0; j <= Grid; j ++) line[j] = -1;
			RushGo[i] = line;
		}
		record = [];
		recordLast = null;
	};
	const copyRushGo = (board) => {
		if (!board) board = RushGo;
		var result = [];
		for (let i = 0; i <= Grid; i ++) {
			let line = [];
			let l = board[i];
			for (let j = 0; j <= Grid; j ++) line[j] = l[j];
			result[i] = line;
		}
		return result;
	};
	const valueStatus = (strategy) => {
		var values = new window.RushGo.ValueField(), score = 0;
		for (let i = 0; i <= Grid; i ++) {
			let line = strategy[i];
			for (let j = 0; j <= Grid; j ++) {
				let s = line[j];
				if (!s) continue;
				if (s.state.state === window.RushGo.State.Alone) continue;

				let pos = [i, j];
				if (s.state.state === window.RushGo.State.MustWin) values.mustWins.push(pos);
				else if (s.state.state === window.RushGo.State.WillWin) values.willWins.push(pos);
				else if (s.state.state === window.RushGo.State.MayWin) values.mayWins.push(pos);
				else if (s.state.state === window.RushGo.State.MayLose) values.mayLoses.push(pos);
				else if (s.state.state === window.RushGo.State.WillLose) values.willLoses.push(pos);
				else if (s.state.state === window.RushGo.State.MustLose) values.mustLoses.push(pos);
				else {
					values.normals.push([pos, s.state.score]);
					score += s.state.score;
				}
			}
		}
		return [score, values];
	};
	const analyzeRush = (board, player, isEnemy, rangeMind=0) => {
		var result = [];
		for (let i = 0; i <= Grid; i ++) {
			let line = [];
			for (let j = 0; j <= Grid; j ++) {
				if (board[i][j] !== -1) continue;
				// if (((x === 11 || x === 12) && y === 13) || (x === 1 && y < 11)) {
				if (i === 6 && j === 2) {
					window.testInfo = {x:i, y:j, player};
				}
				else {
					window.testInfo = undefined;
				}
				// 分别计算空白位置在四个方向上的价值、状态（必胜、可胜、一般、空置、无价值）、同色相连子数以及气数
				let s1 = analyzeLine1(board, i, j, player, isEnemy, rangeMind);
				let s2 = analyzeLine2(board, i, j, player, isEnemy, rangeMind);
				let s3 = analyzeLine3(board, i, j, player, isEnemy, rangeMind);
				let s4 = analyzeLine4(board, i, j, player, isEnemy, rangeMind);
				let ss = new window.RushGo.CrossPoint(isEnemy, s1, s2, s3, s4);
				if (GameModeOption.forbidden && player === window.RushGo.starter) {
					let threes = 0;
					let c = Win - 3;
					if (s1.pointCount === c && s1.emptyCount === 2) threes ++;
					if (s2.pointCount === c && s2.emptyCount === 2) threes ++;
					if (s3.pointCount === c && s3.emptyCount === 2) threes ++;
					if (s4.pointCount === c && s4.emptyCount === 2) threes ++;
					if (threes === 2) {
						ss.state.state = window.RushGo.State.Forbidden;
						ss.state.score = 0;
					}
				}
				line[j] = ss;
			}
			result[i] = line;
		}
		return result;
	};
	const analyzeLine1 = (board, x, y, player, isEnemy, rangeMind=0) => {
		var half1 = new window.RushGo.HalfLine(), half2 = new window.RushGo.HalfLine(), z, es, outter;
		z = x;
		es = 0;
		outter = false;
		while (true) {
			z ++;
			let c = board[z];
			if (!!c)  c = c[y];
			// 边界
			if (c === undefined) {
				break;
			}
			// 空格
			else if (c === -1) {
				// 内层结构
				if (!outter) {
					half1.borderType = 2;
					outter = true;
					half1.emptyCount = 1;
					es = 2;
				}
				else if (half1.neighbor !== 0) {
					half1.farBorder = 1;
					break;
				}
				else {
					half1.emptyCount ++;
					es ++;
					if (es === Win) break;
				}
			}
			else if (c !== player) {
				if (outter) {
					if (half1.neighbor <= 0) {
						half1.neighbor --;
					}
					else {
						break;
					}
				}
				else {
					half1.borderType = 1;
					half1.neighbor = -1;
					outter = true;
				}
			}
			else {
				if (outter) {
					if (half1.neighbor < 0) {
						break;
					}
					else {
						half1.neighbor ++;
					}
				}
				else {
					half1.pointCount ++;
				}
			}
		}
		z = x;
		es = 0;
		outter = false;
		while (true) {
			z --;
			let c = board[z];
			if (!!c)  c = c[y];
			// 边界
			if (c === undefined) {
				break;
			}
			// 空格
			else if (c === -1) {
				// 内层结构
				if (!outter) {
					half2.borderType = 2;
					outter = true;
					half2.emptyCount = 1;
					es = 2;
				}
				else if (half2.neighbor !== 0) {
					half2.farBorder = 1;
					break;
				}
				else {
					half2.emptyCount ++;
					es ++;
					if (es === Win) break;
				}
			}
			else if (c !== player) {
				if (outter) {
					if (half2.neighbor <= 0) {
						half2.neighbor --;
					}
					else {
						break;
					}
				}
				else {
					half2.borderType = 1;
					half2.neighbor = -1;
					outter = true;
				}
			}
			else {
				if (outter) {
					if (half2.neighbor < 0) {
						break;
					}
					else {
						half2.neighbor ++;
					}
				}
				else {
					half2.pointCount ++;
				}
			}
		}
		return new window.RushGo.SingleLine(half1, half2, rangeMind);
	};
	const analyzeLine2 = (board, x, y, player, isEnemy, rangeMind=0) => {
		var half1 = new window.RushGo.HalfLine(), half2 = new window.RushGo.HalfLine(), z, es, outter;
		z = y;
		es = 0;
		outter = false;
		while (true) {
			z ++;
			let c = board[x][z];
			// 边界
			if (c === undefined) {
				break;
			}
			// 空格
			else if (c === -1) {
				// 内层结构
				if (!outter) {
					half1.borderType = 2;
					outter = true;
					half1.emptyCount = 1;
					es = 2;
				}
				else if (half1.neighbor !== 0) {
					half1.farBorder = 1;
					break;
				}
				else {
					half1.emptyCount ++;
					es ++;
					if (es === Win) break;
				}
			}
			else if (c !== player) {
				if (outter) {
					if (half1.neighbor <= 0) {
						half1.neighbor --;
					}
					else {
						break;
					}
				}
				else {
					half1.borderType = 1;
					half1.neighbor = -1;
					outter = true;
				}
			}
			else {
				if (outter) {
					if (half1.neighbor < 0) {
						break;
					}
					else {
						half1.neighbor ++;
					}
				}
				else {
					half1.pointCount ++;
				}
			}
		}
		z = y;
		es = 0;
		outter = false;
		while (true) {
			z --;
			let c = board[x][z];
			// 边界
			if (c === undefined) {
				break;
			}
			// 空格
			else if (c === -1) {
				// 内层结构
				if (!outter) {
					half2.borderType = 2;
					outter = true;
					half2.emptyCount = 1;
					es = 2;
				}
				else if (half2.neighbor !== 0) {
					half2.farBorder = 1;
					break;
				}
				else {
					half2.emptyCount ++;
					es ++;
					if (es === Win) break;
				}
			}
			else if (c !== player) {
				if (outter) {
					if (half2.neighbor <= 0) {
						half2.neighbor --;
					}
					else {
						break;
					}
				}
				else {
					half2.borderType = 1;
					half2.neighbor = -1;
					outter = true;
				}
			}
			else {
				if (outter) {
					if (half2.neighbor < 0) {
						break;
					}
					else {
						half2.neighbor ++;
					}
				}
				else {
					half2.pointCount ++;
				}
			}
		}
		return new window.RushGo.SingleLine(half1, half2, rangeMind);
	};
	const analyzeLine3 = (board, x, y, player, isEnemy, rangeMind=0) => {
		var half1 = new window.RushGo.HalfLine(), half2 = new window.RushGo.HalfLine(), z, w, es, outter;
		w = x;
		z = y;
		es = 0;
		outter = false;
		while (true) {
			w ++;
			z ++;
			let c = board[w];
			if (!!c)  c = c[z];
			// 边界
			if (c === undefined) {
				break;
			}
			// 空格
			else if (c === -1) {
				// 内层结构
				if (!outter) {
					half1.borderType = 2;
					outter = true;
					half1.emptyCount = 1;
					es = 2;
				}
				else if (half1.neighbor !== 0) {
					half1.farBorder = 1;
					break;
				}
				else {
					half1.emptyCount ++;
					es ++;
					if (es === Win) break;
				}
			}
			else if (c !== player) {
				if (outter) {
					if (half1.neighbor <= 0) {
						half1.neighbor --;
					}
					else {
						break;
					}
				}
				else {
					half1.borderType = 1;
					half1.neighbor = -1;
					outter = true;
				}
			}
			else {
				if (outter) {
					if (half1.neighbor < 0) {
						break;
					}
					else {
						half1.neighbor ++;
					}
				}
				else {
					half1.pointCount ++;
				}
			}
		}
		w = x;
		z = y;
		es = 0;
		outter = false;
		while (true) {
			w --;
			z --;
			let c = board[w];
			if (!!c)  c = c[z];
			// 边界
			if (c === undefined) {
				break;
			}
			// 空格
			else if (c === -1) {
				// 内层结构
				if (!outter) {
					half2.borderType = 2;
					outter = true;
					half2.emptyCount = 1;
					es = 2;
				}
				else if (half2.neighbor !== 0) {
					half2.farBorder = 1;
					break;
				}
				else {
					half2.emptyCount ++;
					es ++;
					if (es === Win) break;
				}
			}
			else if (c !== player) {
				if (outter) {
					if (half2.neighbor <= 0) {
						half2.neighbor --;
					}
					else {
						break;
					}
				}
				else {
					half2.borderType = 1;
					half2.neighbor = -1;
					outter = true;
				}
			}
			else {
				if (outter) {
					if (half2.neighbor < 0) {
						break;
					}
					else {
						half2.neighbor ++;
					}
				}
				else {
					half2.pointCount ++;
				}
			}
		}
		return new window.RushGo.SingleLine(half1, half2, rangeMind);
	};
	const analyzeLine4 = (board, x, y, player, isEnemy, rangeMind=0) => {
		var half1 = new window.RushGo.HalfLine(), half2 = new window.RushGo.HalfLine(), z, w, es, outter;
		w = x;
		z = y;
		es = 0;
		outter = false;
		while (true) {
			w ++;
			z --;
			let c = board[w];
			if (!!c)  c = c[z];
			// 边界
			if (c === undefined) {
				break;
			}
			// 空格
			else if (c === -1) {
				// 内层结构
				if (!outter) {
					half1.borderType = 2;
					outter = true;
					half1.emptyCount = 1;
					es = 2;
				}
				else if (half1.neighbor !== 0) {
					half1.farBorder = 1;
					break;
				}
				else {
					half1.emptyCount ++;
					es ++;
					if (es === Win) break;
				}
			}
			else if (c !== player) {
				if (outter) {
					if (half1.neighbor <= 0) {
						half1.neighbor --;
					}
					else {
						break;
					}
				}
				else {
					half1.borderType = 1;
					half1.neighbor = -1;
					outter = true;
				}
			}
			else {
				if (outter) {
					if (half1.neighbor < 0) {
						break;
					}
					else {
						half1.neighbor ++;
					}
				}
				else {
					half1.pointCount ++;
				}
			}
		}
		w = x;
		z = y;
		es = 0;
		outter = false;
		while (true) {
			w --;
			z ++;
			let c = board[w];
			if (!!c)  c = c[z];
			// 边界
			if (c === undefined) {
				break;
			}
			// 空格
			else if (c === -1) {
				// 内层结构
				if (!outter) {
					half2.borderType = 2;
					outter = true;
					half2.emptyCount = 1;
					es = 2;
				}
				else if (half2.neighbor !== 0) {
					half2.farBorder = 1;
					break;
				}
				else {
					half2.emptyCount ++;
					es ++;
					if (es === Win) break;
				}
			}
			else if (c !== player) {
				if (outter) {
					if (half2.neighbor <= 0) {
						half2.neighbor --;
					}
					else {
						break;
					}
				}
				else {
					half2.borderType = 1;
					half2.neighbor = -1;
					outter = true;
				}
			}
			else {
				if (outter) {
					if (half2.neighbor < 0) {
						break;
					}
					else {
						half2.neighbor ++;
					}
				}
				else {
					half2.pointCount ++;
				}
			}
		}
		return new window.RushGo.SingleLine(half1, half2, rangeMind);
	};
	const combineEnemy = (enemies) => {
		if (enemies.length <= 1) return enemies[0];

		var result = [];
		for (let i = 0; i <= Grid; i ++) {
			let line = [];
			for (let j = 0; j <= Grid; j ++) {
				var value = null;
				enemies.forEach(e => {
					if (e.state.state === window.RushGo.State.Alone) return;
					if (!value || value.state === window.RushGo.State.Alone || e.state.state > value.state) value = e;
					else if (e.state.state === window.RushGo.State.Normal && value.state === window.RushGo.State.Normal && e.state.score > value.score) value = e;
				});
				if (!!value) line[j] = value;
			}
			result[i] = line;
		}
		return result;
	};
	const getCrossName = (x, y) => {
		var s1 = analyzeLine1(RushGo, x, y, player, false);
		var s2 = analyzeLine2(RushGo, x, y, player, false);
		var s3 = analyzeLine3(RushGo, x, y, player, false);
		var s4 = analyzeLine4(RushGo, x, y, player, false);
		var ss = new window.RushGo.CrossPoint(false, s1, s2, s3, s4);
		return ss.toString();
	};
	const posGo = (x, y, strategy) => {
		if (x === undefined || y === undefined) {
			window.RushGo.finished = true;
			for (let i = 0; i < 2; i ++) {
				let ai = aiList[i];
				if (!!ai && !!ai.clear) ai.clear();
			}
			ResultHint.innerHTML = '居然打成了平手！<br>要不再来一局？';
			ResultPad.classList.add('show');
			return;
		}

		if (2 === 2) {
			let crossName = getCrossName(x, y);
			for (let i = 0; i < 2; i ++) {
				let ai = aiList[i];
				if (!ai) continue;
				if (i === player) {
					if (!!ai.recordMe) ai.recordMe(crossName);
				}
				else {
					if (!!ai.recordOther) ai.recordOther(crossName);
				}
			}
		}

		currentPos = [x, y];
		var curr = RushGo[x][y];
		if (curr !== -1) return;
		RushGo[x][y] = player;

		var scoreList = [];
		for (let i = 0; i < 2; i ++) {
			let situ = analyzeRush(RushGo, i, false, 1);
			let [score, choise] = valueStatus(situ);
			score += choise.scoreW;
			score = Math.round(score * 10) / 10;
			scoreList[i] = score;
			// PlayerHints[i]._score.innerHTML = score;
		}

		window.RushGo.loopCount ++;
		var rec = [player, x, y, window.RushGo.loopCount, scoreList];
		if (DrawStrategy && !!strategy) rec.push(strategy);
		if (!recordLast) {
			recordLast = [];
		}
		else {
			recordLast = recordLast.map(r => r);
		}
		recordLast.push(rec);
		record.push(recordLast);

		drawAll();
		if (DrawStrategy && !!strategy) drawStrategy(strategy);

		PlayerHints.forEach(ui => ui.classList.remove('selected'));

		// 判断是否结束
		var finish = checkFinish(RushGo, player, x, y);
		if (finish !== 0) {
			window.RushGo.finished = true;
			if (finish > 0) {
				winCount[player] ++;
			}
			else {
				for (let i = 0; i < 2; i ++) {
					if (i === player) continue;
					winCount[i] ++;
				}
			}

			// 更新记录
			if (2 === 2) {
				let play = player;
				if (window.RushGo.finished < 0) play = 1 - player;
				let r1 = window.RushGo.AIManager.AIList[roleList[0]];
				let r2 = window.RushGo.AIManager.AIList[roleList[1]];
				if (!!r1 && !!r2) {
					let delta = 0;
					if (play === 0) {
						delta = r2.score - r1.score;
					}
					else {
						delta = r1.score - r2.score;
					}
					delta = Math.exp(delta / 10);
					delta = delta / (1 + delta);
					delta = Math.round(delta * 3);
					if (play === 0) {
						r1.score += delta;
						r2.score -= delta;
						if (r2.score < 0) r2.score = 0;
					}
					else {
						r2.score += delta;
						r1.score -= delta;
						if (r1.score < 0) r1.score = 0;
					}
					for (let i = 0; i < 2; i ++) {
						let role = roleList[i];
						role = window.RushGo.AIManager.AIList[role];
						let win = i === play;
						if (i === window.RushGo.starter) {
							role.blackCount ++;
							if (win) role.blackWin ++;
							else role.blackLose ++;
						}
						else {
							role.whiteCount ++;
							if (win) role.whiteWin ++;
							else role.whiteLose ++;
						}
					}
					window.RushGo.AIManager.save();
				}
			}

			showName();
			if (finish > 0) {
				if (2 === 2) {
					for (let i = 0; i < 2; i ++) {
						let ai = aiList[i];
						if (!!ai && !!ai.flush) ai.flush(i === player);
					}
				}
				let name = window.RushGo.AIManager.AIList[roleList[player]];
				if (!!name) name = name.name;
				else name = '试玩者';
				ResultHint.innerHTML = '恭喜大侠' + name + '傲视群雄！'
			}
			else {
				if (2 === 2) {
					for (let i = 0; i < 2; i ++) {
						let ai = aiList[i];
						if (!!ai && !!ai.flush) ai.flush(i !== player);
					}
				}
				let name = window.RushGo.AIManager.AIList[roleList[player]];
				if (!!name) name = name.name;
				else name = '试玩者';
				ResultHint.innerHTML = name + '下出禁手！<br>直接认输！'
			}

			player ++;
			if (player === 2) player = 0;
			window.RushGo.starter = player;
			ResultPad.classList.add('show');
		}
		else {
			showName();
			// 座子模式下，最后一颗座子是后手方下
			if (window.RushGo.loopCount !== GameModeOption.startWithInits - 1) {
				player ++;
			}
			if (player === 2) player = 0;
			if (AIPlayers.includes(player)) {
				let s = player;
				setTimeout(() => {
					if (!!aiList[player]) aiList[player].go();
				}, Delay);
			}
			else {
				window.RushGo.timeStart[player] = Date.now();
			}
		}

		PlayerHints[player].classList.add('selected');
	};
	const checkFinish = (board, player, x, y) => {
		var s1 = analyzeLine1(board, x, y, player, false);
		var s2 = analyzeLine2(board, x, y, player, false);
		var s3 = analyzeLine3(board, x, y, player, false);
		var s4 = analyzeLine4(board, x, y, player, false);
		var count;
		if (GameModeOption.forbidden && player === window.RushGo.starter) {
			let threes = 0;
			let count = Win - 3;
			if (s1.pointCount === count && s1.emptyCount === 2) threes ++;
			if (s2.pointCount === count && s2.emptyCount === 2) threes ++;
			if (s3.pointCount === count && s3.emptyCount === 2) threes ++;
			if (s4.pointCount === count && s4.emptyCount === 2) threes ++;
			if (threes === 2) {
				return -1;
			}
		}
		count = Win - 1;
		if (s1.pointCount >= count || s2.pointCount >= count || s3.pointCount >= count || s4.pointCount >= count) return 1;

		return 0;
	};

	// 绘图函数
	const drawStar = (x, y, color) => {
		x = margin + x * pad;
		y = margin + y * pad;

		if (!!color) ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, margin / 3, 0, TPI);
		ctx.fill();
	};
	const drawPiece = (x, y, color) => {
		x = margin + x * pad;
		y = margin + y * pad;

		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, TPI);
		ctx.fill();
	};
	const drawPad = () => {
		ctx.clearRect(0, 0, Size + margin * 2, Size + margin * 2);

		ctx.strokeStyle = "rgb(49,37,32)";
		ctx.fillStyle = "rgb(49,37,32)";

		// 纵横线
		for (let i = 0; i <= Grid; i ++) {
			let p = margin + i * pad;
			ctx.moveTo(p, margin);
			ctx.lineTo(p, size - margin);
			ctx.stroke();
			ctx.moveTo(margin, p);
			ctx.lineTo(size - margin, p);
			ctx.stroke();
		}

		// 星位
		drawStar(Star - 1, Star - 1);
		drawStar(Grid - Star + 1, Star - 1);
		drawStar(Star - 1, Grid - Star + 1);
		drawStar(Grid - Star + 1, Grid - Star + 1);
		var half = Grid >> 1;
		if (half * 2 === Grid) {
			drawStar(Star - 1, half);
			drawStar(Grid - Star + 1, half);
			drawStar(half, Star - 1);
			drawStar(half, Grid - Star + 1);
			drawStar(half, half);
		}
	};
	const drawStrategy = (strategy) => {
		ctx.font = "12px Arial";
		strategy.forEach(d => {
			if (d[2] === 1) ctx.fillStyle = 'rgb(141,75,187)';
			else ctx.fillStyle = 'rgb(136,173,166)';
			var x = margin + d[0][0] * pad - 10;
			var y = margin + d[0][1] * pad + 4;
			var s = d[1];
			s = Math.round(s * 100) / 100;
			ctx.fillText(s, x, y);
		});
	};
	const drawAll = () => {
		ctx.clearRect(0, 0, Size + margin * 2, Size + margin * 2);
		ctx.save();

		drawPad();
		ctx.save();

		for (let i = 0; i <= Grid; i ++) {
			let line = RushGo[i];
			for (let j = 0; j <= Grid; j ++) {
				let p = line[j];
				if (p < 0) continue;
				drawPiece(i, j, PlayerColors[p]);
			}
		}
		ctx.save();

		drawStar(...currentPos, 'rgb(200,60,35)');
		ctx.save();

		ctx.restore();
	};
	const showName = () => {
		for (let i = 0; i < 2; i ++) {
			let time = window.RushGo.timeUsed[i];
			time /= 100;
			time = Math.round(time);
			time /= 10;
			PlayerHints[i]._win.innerHTML = winCount[i];
			PlayerHints[i]._time.innerHTML = time;
		}
		LoopCountUI.innerHTML = window.RushGo.loopCount;
	};
	const newEle = (tag, classList) => {
		var div = document.createElement(tag || 'div');
		if (!(classList instanceof Array)) classList = classList.split(' ');
		classList.forEach(c => div.classList.add(c));
		return div;
	};
	const initInfoArea = (ui, name) => {
		var sub;

		ui.innerHTML = '';

		sub = newEle('span', 'sub name');
		ui.appendChild(sub);
		ui._name = sub;
		sub.innerHTML = name;

		sub = newEle('span', 'sub win');
		ui.appendChild(sub);
		ui._win = sub;
		sub.innerHTML = '0';

		// sub = newEle('span', 'sub score');
		// ui.appendChild(sub);
		// ui._score = sub;
		// sub.innerHTML = '0.0';

		sub = newEle('span', 'sub time');
		ui.appendChild(sub);
		ui._time = sub;
		sub.innerHTML = '0.0';

		ui.style.display = 'block';
		return ui;
	};

	const init = async (index=0) => {
		player = 0;
		window.RushGo.starter = player;
		window.RushGo.finished = true;

		newRushGo();

		LoopCountUI = document.querySelector('div.info_header span.loop span');
		var hintUIs = document.querySelectorAll('div.user');
		[].forEach.call(hintUIs, ui => ui.style.display = 'none');
		for (let i = 0; i < 2; i ++) {
			window.RushGo.timeUsed[i] = 0;
			window.RushGo.timeStart[i] = 0;
			winCount[i] = 0;
			let ui = document.querySelector('div.user.' + PlayerUIs[i]);
			ui = initInfoArea(ui, PlayerNames[i]);
			ui._id = i;
			PlayerHints[i] = ui;
			roleList[i] = 0;
		}
		ResultPad = document.querySelector('div.resultPad');
		ResultHint = ResultPad.querySelector('div.info');
		ResultRestart = ResultPad.querySelector('div.restart');
		ResultGM = ResultPad.querySelector('div.chooseMode');
		RoleSelector = document.querySelector('div.roleSelector');
		RoleSelectorList = RoleSelector.querySelector('div.roleList');
		AddNewRole = document.querySelector('div.addRole');
		GameModePad = document.querySelector('div.gameMode');

		ctx = GoBoard.getContext('2d');
		pad = Size / Grid;
		margin = pad / 2;
		size = Size + margin * 2;
		radius = margin * Piece;

		GoBoard.width = size;
		GoBoard.height = size;
		GoBoard.addEventListener('click', onClick);

		[].forEach.call(document.querySelectorAll('span.radio'), ui => {
			ui.radio = ui.querySelector('input[type="radio"]');
			ui.addEventListener('click', () => {
				ui.radio.checked = true;
			});
		});
		window.RushGo.AIManager.init(AddNewRole, refreshRoleList);

		ResultRestart.addEventListener('click', restartRushGo);
		ResultGM.addEventListener('click', chooseGameMode);
		ResultPad.querySelector('div.review').addEventListener('click', reviewRushGo);

		document.querySelector('div.actionPad div.panel div.subpanel div.btn.restart').addEventListener('click', restartRushGo);
		document.querySelector('div.actionPad div.panel div.subpanel.review div.btn.prev').addEventListener('click', () => {
			if (recordIndex === 0) return;
			recordIndex --;
			showReview();
		});
		document.querySelector('div.actionPad div.panel div.subpanel.review div.btn.next').addEventListener('click', () => {
			var total = record.length - 1;
			if (recordIndex === total) return;
			recordIndex ++;
			showReview();
		});
		document.body.addEventListener('keydown', onKey);

		document.querySelector('div.actionPad div.panel.info').addEventListener('click', (evt) => {
			var target = evt.target;
			if (!target.classList.contains('name')) return;
			target = target.parentElement;
			if (!isNaN(target._id)) startSelectRole(target._id);
		});
		document.querySelector('div.actionPad div.panel.info').addEventListener('click', (evt) => {
			var target = evt.target;
			if (!target.classList.contains('name')) return;
			target = target.parentElement;
			if (!isNaN(target._id)) startSelectRole(target._id);
		});
		RoleSelectorList.addEventListener('click', (evt) => {
			var target = evt.target;
			var role = target.getAttribute('role');
			if (!role) return;
			var roleID = target.getAttribute('index') * 1;
			chooseRole(RoleSelector._id, roleID);
		});
		RoleSelector.querySelector('div.btnArea div.btn.cancel').addEventListener('click', (evt) => {
			if (!window.RushGo.finished) return; // 对局中不能替换AI
			if (!roleSelecting) return; // 角色选择不能多次出发
			roleSelecting = false;
			RoleSelector.classList.remove('show');
		});
		RoleSelector.querySelector('div.btnArea div.btn.addNew').addEventListener('click', (evt) => {
			if (!window.RushGo.finished) return; // 对局中不能替换AI
			if (!roleSelecting) return; // 角色选择不能多次出发
			AddNewRole.classList.add('show');
		});

		initGameModePad();
		await window.RushGo.AIFour.initExpStorage();

		if (index > 0) {
			trainCode = index;
			let fun = initGo['game' + index];
			if (!!fun) fun();
		}

		drawAll();
	};
	const onLeave = () => {
		document.body.removeEventListener('keydown', onKey);
	};

	// 启动
	window.RushGo = window.RushGo || {};
	window.RushGo.init = init;
	window.RushGo.onLeave = onLeave;
	window.RushGo.copyRushGo = copyRushGo;
	window.RushGo.analyzeRush = analyzeRush;
	window.RushGo.valueStatus = valueStatus;
	window.RushGo.combineEnemy = combineEnemy;
	window.RushGo.checkFinish = checkFinish;
	window.RushGo.posGo = posGo;

	window.RushGo.Win = Win;
	window.RushGo.Grid = Grid;
	window.RushGo.ScorePower = ScorePower;
	window.RushGo.DrawStrategy = DrawStrategy;

	window.RushGo.GameModeOption = GameModeOption;

	window.RushGo.starter = 0;
	window.RushGo.pause = false;
	window.RushGo.finished = false;
	window.RushGo.loopCount = 0;
	window.RushGo.timeStart = [];
	window.RushGo.timeUsed = [];
}) ();