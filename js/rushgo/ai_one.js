(() => {
	const Win = RushGo.Win;
	const State = window.RushGo.State;
	const HalfLine = window.RushGo.HalfLine;
	const SingleLine = window.RushGo.SingleLine;
	const CrossPoint = window.RushGo.CrossPoint;
	const ValueField = window.RushGo.ValueField;

	// AI
	class AIOne {
		id = -1;
		attacktive = 0.5;
		attitude = 0;
		incress = 0;
		center = 0;
		down = 0;
		up = 0;
		level = 1;
		range = 3;
		rangeMind = 0;
		useOracle = false;
		constructor (id, attacktive, attitude, level, range, rangeMind, useOracle) {
			this.id = id;
			this.attacktive = attacktive;
			if (attitude >= 0) this.incress = 1;
			else this.incress = -1;
			this.attitude = attitude * this.incress;
			this.center = attacktive;
			if (attacktive >= 0.5) {
				this.up = 0.5 - attacktive / 2;
				this.down = attacktive - this.up;
			}
			else {
				this.down = attacktive / 2;
				this.up = 1 - this.down - attacktive;
			}
			this.level = level;
			this.range = range;
			this.useOracle = !!useOracle;
			if (!isNaN(rangeMind)) this.rangeMind = rangeMind;
		}
		go () {
			if (window.RushGo.finished) return;
			window.RushGo.pause = true;
			window.RushGo.timeStart[this.id] = Date.now();

			var board = window.RushGo.copyRushGo();
			var pos, strategy;

			// 座子
			if (window.RushGo.loopCount < window.RushGo.GameModeOption.startWithInits) {
				pos = this.placeInits(board);
				strategy = [];
			}
			else {
				let [strategyM, scoreM, choiseM] = this.valueMe(board);
				let [strategyE, scoreE, choiseE] = this.valueEnemy(board);

				// 调整攻防态度
				if (this.attitude <= 0) {
					this.attacktive = this.center;
				}
				else {
					let delta = scoreM - scoreE + choiseM.scoreW - choiseE.scoreW;
					let attacktive = delta * this.incress / (Math.abs(delta) + this.attitude);
					if (attacktive >= 0) this.attacktive = this.center + this.up * attacktive;
					else this.attacktive = this.center + this.down * attacktive;
				}

				[pos, strategy] = this.makeDecision(board, scoreM, choiseM, scoreE, choiseE, ...(this.combineStrategy(strategyM, strategyE)));
			}

			window.RushGo.timeUsed[this.id] += Date.now() - window.RushGo.timeStart[this.id];
			setTimeout(() => {
				window.RushGo.pause = false;
			}, 0);

			if (!pos) {
				window.RushGo.finished = true;
				for (let i = 0; i < 2; i ++) {
					let ai = aiList[i];
					if (!!ai && !!ai.clear) ai.clear();
				}
				ResultHint.innerHTML = '居然打成了平手！<br>要不再来一局？';
				ResultPad.classList.add('show');
				return;
			}
			window.RushGo.posGo(...pos, strategy);
		}
		valueMe (board) {
			var me = window.RushGo.analyzeRush(board, this.id, false, this.rangeMind);
			return [me, ...window.RushGo.valueStatus(me)];
		}
		valueEnemy (board) {
			var others = [];
			for (let i = 0; i < 2; i ++) {
				if (i === this.id) continue;
				others.push(window.RushGo.analyzeRush(board, i, false, this.rangeMind));
			}
			others = window.RushGo.combineEnemy(others);
			return [others, ...window.RushGo.valueStatus(others)];
		}
		combineStrategy (strategyM, strategyE) {
			var valueField = [];
			var choiseM = [], choiseE = [], choiseO = [];
			var result = new ValueField();

			for (let i = 0; i <= window.RushGo.Grid; i ++) {
				let line = [];
				for (let j = 0; j <= window.RushGo.Grid; j ++) {
					let valueM = strategyM[i][j], valueE = strategyE[i][j];
					let value = new State();
					let pos = [i, j], tag = i + '-' + j;

					// 已经有子
					if (!valueM || !valueE) {
						value.state = State.Alone;
					}
					// 如果是先手禁
					else if (valueM.state.state === State.Forbidden) {
						result.state = State.Alone;
					}
					// 如果我方下一子就赢，则设为必走
					else if (valueM.state.state === State.MustWin) {
						result.mustWins.push(pos);
						value.state = State.MustWin;
					}
					// 如果敌方下一子就赢，则设为必走
					else if (valueE.state.state === State.MustWin) {
						result.mustLoses.push(pos);
						value.state = State.MustLose;
					}
					// 如果我方下一子就能构成必赢局面，则设为必走
					else if (valueM.state.state === State.WillWin) {
						result.willWins.push(pos);
						value.state = State.WillWin;
					}
					// 如果敌方下一子就能构成必赢局面，则设为必走
					else if (valueE.state.state === State.WillWin) {
						result.willLoses.push(pos);
						value.state = State.WillLose;
					}
					// 如果我方下一子对方不放就能构成必赢局面，则设为必走
					else if (valueM.state.state === State.MayWin) {
						result.mayWins.push(pos);
						value.state = State.MayWin;
					}
					// 如果敌方下一子对方不放就能构成必赢局面，则设为必走
					else if (valueE.state.state === State.MayWin) {
						result.mayLoses.push(pos);
						value.state = State.MayLose;
					}
					else if (valueM.state.state <= State.Alone) {
						// 如果敌我双方都认为是无用位
						if (valueE.state.state <= State.Alone) {
							value.state = State.Alone;
						}
						else {
							result.normals.push(pos);
							value.state = State.Normal;
							value.score = valueE.state.score * (1 - this.attacktive);
							// choiseE.push([pos, value.score]);
							choiseO.push([pos, value.score]);
						}
					}
					else {
						result.normals.push(pos);
						value.state = State.Normal;
						if (valueE.state.state <= State.Alone) {
							value.score = valueM.state.score * this.attacktive;
						}
						else {
							value.score = valueM.state.score * this.attacktive + valueE.state.score * (1 - this.attacktive);
						}
						// choiseM.push([pos, valueM.state.score]);
						choiseO.push([pos, value.score]);
					}

					value.update();
					line[j] = value;
				}
				valueField[i] = line;
			}

			choiseO.sort((a, b) => b[1] - a[1]);
			if (choiseO.length > this.range) {
				let last = choiseO[this.range - 1];
				last = last[1];
				let firstPart = choiseO.filter(s => s[1] > last);
				let len = firstPart.length;
				if (len < this.range) {
					let lastPart = choiseO.filter(s => s[1] === last);
					len = lastPart.length + len - this.range;
					for (let i = 0; i < len; i ++) {
						let j = Math.floor(lastPart.length * Math.random());
						lastPart.splice(j, 1);
					}
					firstPart.push(...lastPart);
				}
				choiseO = firstPart;
			}

			var map = {};
			choiseO.forEach(c => {
				var [x, y] = c[0];
				var s = valueField[x][y];
				map[x + '-' + y] = [c[0], s.score];
			});
			var total = 0, choise = [];
			for (let pos in map) {
				pos = map[pos];
				total += pos[1];
				choise.push(pos);
			}
			choise.forEach(c => c[1] /= total);

			return [choise, valueField, result];
		}
		makeDecision (board, scoreM, choiseM, scoreE, choiseE, choise, valueMap, valueField) {
			var mustMove = [], strategy = [];
			// 如果我方有制胜位
			if (valueField.mustWins.length > 0) {
				mustMove = valueField.mustWins;
			}
			// 如果敌方有制胜位
			else if (valueField.mustLoses.length > 0) {
				mustMove = valueField.mustLoses;
			}
			// 如果我方有预胜位
			else if (valueField.willWins.length > 0) {
				mustMove = valueField.willWins;
			}
			// 如果敌方有预胜位
			else if (valueField.willLoses.length > 0) {
				mustMove = valueField.willLoses;
			}
			// 如果我方有可能的制胜位
			else if (valueField.mayWins.length > 0) {
				mustMove = valueField.mayWins;
			}
			// 如果敌方有可能的制胜位
			else if (valueField.mayLoses.length > 0) {
				mustMove = valueField.mayLoses;
			}

			if (mustMove.length === 1) {
				return [mustMove[0], []];
			}
			else if (mustMove.length > 0) {
				let l = mustMove.length;
				l = 1 / l;
				choise = mustMove.map(move => [move, l]);
			}
			else {
				let canMove;
				[mustMove, canMove] = this.thinkAsEnemy(board);
				if (mustMove.length > 0) {
					choise = mustMove;
				}
				else {
					let map = {};
					choise.forEach(c => {
						let tag = '(' + c[0] + ')';
						map[tag] = c;
					});
					let total = 0;
					canMove.forEach(c => total += c[1]);
					canMove.forEach(c => {
						c[1] /= total;
						c[1] *= Math.sqrt(Math.max(0, 1 - this.attacktive));
						let tag = '(' + c[0] + ')';
						var m = map[tag];
						if (!m) {
							map[tag] = c;
						}
						else if (m[1] < c[1]) {
							m[1] = c[1];
						}
					});
					choise = Object.values(map).filter(c => c[1] > 0);
				}
			}

			// 如果既没有致胜位之争也没有可走策略，则退出决策
			if (choise.length === 0) {
				return [null, []];
			}
			else {
				let max = 0;
				choise.forEach(c => max += c[1]);
				choise.forEach(c => {
					strategy.push([c[0], c[1] / max, 0]);
				});
			}

			// 进行预判
			if (this.level > 0) {
				let short = false, musts = null, wills = [], mays = [], cans = [];
				choise.some(c => {
					var [pos, value] = c;
					var [state, score] = this.oracle(board, scoreM, choiseM, scoreE, choiseE, pos, this.level, this.id, short);

					if (state === State.MustWin) {
						musts = pos;
						return true;
					}
					else if (state === State.WillWin) {
						short = true;
						wills.push(pos);
						return false;
					}
					else if (state === State.MayWin) {
						short = true;
						mays.push(pos);
						return false;
					}
					else if (state <= State.Alone) {
						return false;
					}

					value *= score ** window.RushGo.ScorePower;
					c[1] = value;
					cans.push(c);
				});

				// 存在能获胜的路径
				if (!!musts) {
					return [musts, []];
				}

				// 如果存在优选策略
				musts = false;
				if (wills.length > 0) {
					let s = 1 / wills.length;
					cans = wills.map(p => [p, s]);
					musts = true;
				}
				else if (mays.length > 0) {
					let s = 1 / mays.length;
					cans = mays.map(p => [p, s]);
					musts = true;
				}

				if (!musts) {
					// 没有能避免必然失败的的位置，则从对方的角度来思考对方可能获胜的点位
					[wills, mays] = this.thinkAsEnemy(board);
					if (wills.length > 0) cans = wills;
					else if (cans.length === 0) cans = mays;
				}

				// 如果有可用策略，则替代现在的策略
				if (cans.length > 0) choise = cans;
			}

			// 判断落子位置，选择最优的三个位置做随机选择
			choise.sort((a, b) => b[1] - a[1]);
			var max = 0;
			choise.forEach(c => max += c[1]);
			if (max === 0) {
				max = choise.length;
				choise.forEach(c => {
					c[1] = 1 / max;
					strategy.push([...c, 1]);
				});
			}
			else {
				choise.forEach(c => {
					c[1] /= max;
					strategy.push([...c, 1]);
				});
			}

			max = 0;
			var min = choise[0][1];
			choise.forEach(c => {
				if (c[1] > max) max = c[1];
				if (c[1] < min) min = c[1];
			});
			if (max === min) {
				max = choise.length;
				choise.forEach((c, i) => c[1] = (i + 1) / max);
			}
			else {
				min = max - (max - min) * 0.1;
				choise = choise.filter(c => c[1] >= min);
				max = 0;
				choise.forEach(c => {
					c[1] -= min;
					c[1] = c[1] ** window.RushGo.ScorePower;
					max += c[1];
				});
				min = 0;
				choise.forEach(c => {
					c[1] /= max;
					min += c[1];
					c[1] = min;
				});
			}

			min = Math.random();
			var pos = null;
			choise.some((c, i) => {
				pos = c[0];
				return min >= c[1];
			});
			return [pos, strategy];
		}
		oracle (board, scoreM, choiseM, scoreE, choiseE, pos, level, player, short=false) {
			// 如果不用做预判则直接返回常数结果
			if (level <= 0) return [State.Normal, 1];
			var levelLimit = Math.ceil(DistrCount / 2);
			if (level > levelLimit) level = levelLimit;

			// 设置预想中的棋局
			board = window.RushGo.copyRushGo(board);
			board[pos[0]][pos[1]] = player;

			// 判断是否当前落子能赢
			var finish = window.RushGo.checkFinish(board, player, ...pos);
			if (finish > 0) {
				return [State.MustWin, 1];
			}
			else if (finish < 0) {
				return [State.MustLose, 0];
			}

			// 分析场上敌我势值
			var situaM = window.RushGo.analyzeRush(board, player, false, this.rangeMind);
			var situaE = [];
			for (let i = 0; i < 2; i ++) {
				if (i === player) continue;
				situaE.push(window.RushGo.analyzeRush(board, i, false, this.rangeMind));
			}
			situaE = window.RushGo.combineEnemy(situaE);

			// 判断敌我气势的变化
			var [scrM, stgM] = window.RushGo.valueStatus(situaM);
			var [scrE, stgE] = window.RushGo.valueStatus(situaE);

			if (stgM.mustWins.length > 0) {
				return [State.MustWin, 1];
			}
			else if (stgE.mustWins.length > 0) {
				return [State.MustLose, 0];
			}
			else if (stgM.willWins.length > 0) {
				return [State.WillWin, 1];
			}
			else if (stgE.willWins.length > 0) {
				return [State.WillLose, 0];
			}
			else if (stgM.mayWins.length > 0) {
				return [State.MayWin, 1];
			}
			else if (stgE.mayWins.length > 0) {
				return [State.MayLose, 0];
			}
			else if (level === 1) {
				let sm = scrM - scoreM + stgM.scoreW - choiseM.scoreW;
				let se = scoreE - scrE + choiseE.scoreW - stgE.scoreW;
				let score = sm * this.attacktive + se * (1 - this.attacktive);
				return [State.Normal, Math.max(0, score)];
			}
			else if (short) return [State.Normal, 1];

			// 预判下一个角色落子位置及可能的局势变化
			level --;
			var next = player + 1;
			if (next === 2) next = 0;

			var [oState, oScore] = this.forcast(next, board, level);
			if (oState === State.MustWin) return [State.MustLose, 0];
			else if (oState === State.WillWin) return [State.WillLose, 0];
			else if (oState === State.MayWin) return [State.MayLose, 0];
			else if (oState === State.MayLose) return [State.MayWin, 1];
			else if (oState === State.WillLose) return [State.WillWin, 1];
			else if (oState === State.MustLose) return [State.MustWin, 1];
			return [State.Normal, oScore];
		}
		forcast (player, board, level) {
			board = window.RushGo.copyRushGo(board);

			// 分析当前各方势
			var self, enemy = [];
			for (let i = 0; i < 2; i ++) {
				let isEnemy = i !== player;
				let situation = window.RushGo.analyzeRush(board, i, false, this.rangeMind);
				if (isEnemy) enemy.push(situation);
				else self = situation;
			}
			// 计算指定角色敌我的气势
			enemy = window.RushGo.combineEnemy(enemy);
			var [scoreM, strategyM] = window.RushGo.valueStatus(self);
			var [scoreE, strategyE] = window.RushGo.valueStatus(enemy);
			var [choise, _, moveList] = this.combineStrategy(self, enemy);

			if (moveList.mustWins.length > 0) {
				return [State.MustWin, 1];
			}
			if (moveList.mustLoses.length > 0) {
				return [State.MustLose, 0];
			}
			if (moveList.willWins.length > 0) {
				return [State.WillWin, 1];
			}
			if (moveList.willLoses.length > 0) {
				return [State.WillLose, 0];
			}
			if (moveList.mayWins.length > 0) {
				return [State.MayWin, 1];
			}
			if (moveList.mayLoses.length > 0) {
				return [State.MayLose, 0];
			}

			var [musts, moves] = this.thinkAsEnemy(board, player);
			if (musts.length > 0) choise = musts;
			else if (choise.length === 0) choise = moves;
			if (choise.length === 0) return [State.WillLose, 0];

			var short = false,
				mustWin = null, mustLose = null, willWin = null, willLose = null, mayWin = null, mayLose = null,
				total = 0, score = 0;
			choise.some(c => {
				var [pos, value] = c;
				var [state, scr] = this.oracle(board, scoreM, strategyM, scoreE, strategyE, pos, level, player, short);

				if (state === State.MustWin) {
					mustWin = pos;
					return true;
				}
				else if (state === State.WillWin) {
					willWin = pos;
					return true;
				}
				else if (state === State.MayWin) {
					mayWin = pos;
					return true;
				}
				else if (state === State.MustLose) {
					short = true;
					mustLose = pos;
					return false;
				}
				else if (state === State.WillLose) {
					short = true;
					willLose = pos;
					return false;
				}
				else if (state === State.MayLose) {
					short = true;
					mayLose = pos;
					return false;
				}
				else if (state === State.Alone) {
					return false;
				}

				total += value;
				value *= scr ** window.RushGo.ScorePower;
				score += value;
			});

			if (!!mustWin) {
				return [State.MustWin, 1];
			}
			if (!!willWin) {
				return [State.WillWin, 1];
			}
			if (!!mayWin) {
				return [State.MayWin, 1];
			}
			if (total === 0) {
				if (!!mustLose) {
					return [State.MustLose, 0];
				}
				if (!!willLose) {
					return [State.WillLose, 0];
				}
				if (!!mayLose) {
					return [State.MayLose, 0];
				}
			}

			return [State.Normal, score / total];
		}
		thinkAsEnemy (board, player=this.id) {
			if (!this.useOracle) return [[], []];

			var enemy = player + 1;
			if (enemy === 2) enemy = 0;

			board = window.RushGo.copyRushGo(board);
			var situation = window.RushGo.analyzeRush(board, enemy, false, this.rangeMind);
			var [score, moveList] = window.RushGo.valueStatus(situation);

			if (moveList.mustWins.length > 0) return [moveList.mustWins.map(c => [c, 1 / moveList.mustWins.length]), []];
			else if (moveList.willWins.length > 0) return [moveList.willWins.map(c => [c, 1 / moveList.willWins.length]), []];
			else if (moveList.mayWins.length > 0) return [moveList.mayWins.map(c => [c, 1 / moveList.mayWins.length]), []];
			else if (moveList.normals.length === 0) return [[], []];

			score += moveList.scoreW;

			var choise = moveList.normals;
			choise.sort((a, b) => b[1] - a[1]);

			var mid = choise[Math.floor(choise.length / 2)][1];
			choise = choise.filter(c => c[1] >= mid);

			var moves = [], musts = [], max = Win;
			choise.forEach(c => {
				var pos = c[0];
				var brd = window.RushGo.copyRushGo(board);
				brd[pos[0]][pos[1]] = enemy;
				var situ = window.RushGo.analyzeRush(brd, enemy, false, this.rangeMind);
				var [scr, cho] = window.RushGo.valueStatus(situ);
				scr += cho.scoreW;
				scr -= score;
				if (scr < 0) scr = 0;
				scr *= c[1];
				if (cho.mustWins.length > 0) {
					scr += Win * Win;
					musts.push([pos, scr]);
				}
				else {
					moves.push([pos, scr]);
				}
				if (scr > max) max = scr;
			});
			if (musts.length > 0) {
				musts.forEach(m => {
					m[1] = max;
					moves.push(m);
				});
			}

			moves.sort((a, b) => b[1] - a[1]);
			if (moves.length > this.range) moves = moves.splice(0, this.range);
			return [[], moves];
		}
		placeInits (board) {
			var mines = [], enemies = [];
			for (let i = 0; i <= window.RushGo.Grid; i ++) {
				let l = board[i];
				for (let j = 0; j <= window.RushGo.Grid; j ++) {
					let g = l[j];
					if (g === this.id) mines.push([i, j]);
					else if (g >= 0) enemies.push([i, j]);
				}
			}

			var win = Win - 1;
			// if (player === window.RushGo.starter && window.RushGo.GameModeOption.forbidden) win --;
			var goes = [];
			var center = Math.round(window.RushGo.Grid / 2);
			if (mines.length === 0) {
				if (enemies.length === 0) {
					return [center, center];
				}

				for (let i = 0; i <= window.RushGo.Grid; i ++) {
					let l = board[i];
					for (let j = 0; j <= window.RushGo.Grid; j ++) {
						let g = l[j];
						if (g >= 0) continue;
						let inside = false;
						enemies.some(pos => {
							var [x, y] = pos;
							var dis = Math.max(Math.abs(i - x), Math.abs(j - y));
							if (dis === win) {
								inside = true;
								return true;
							}
						});
						if (!inside) continue;
						goes.push([[i, j], Math.max(Math.abs(i - center), Math.abs(j - center))]);
					}
				}
			}
			else {
				for (let i = 0; i <= window.RushGo.Grid; i ++) {
					let l = board[i];
					for (let j = 0; j <= window.RushGo.Grid; j ++) {
						let g = l[j];
						if (g >= 0) continue;
						let inside = false;

						inside = false;
						mines.some(pos => {
							var [x, y] = pos;
							var dis = Math.max(Math.abs(i - x), Math.abs(j - y));
							if (dis < win) {
								inside = true;
								return true;
							}
						});
						if (inside) continue;
						enemies.some(pos => {
							var [x, y] = pos;
							var dis = Math.max(Math.abs(i - x), Math.abs(j - y));
							if (dis < win) {
								inside = true;
								return true;
							}
						});
						if (inside) continue;
						goes.push([[i, j], Math.max(Math.abs(i - center), Math.abs(j - center))]);
					}
				}
			}

			if (goes.length === 0) return [center, center];
			if (goes.length === 1) return goes[0][0];

			goes.forEach(g => {
				var x = g[0][0], y = g[0][1];
				var pow = Math.max(0, 1 - g[1] / Win);
				var pm = 0, pe = 0;
				mines.forEach(m => {
					var d = Math.max(Math.abs(m[0] - x), Math.abs(m[1] - y));
					pm += Math.max(0, 1 - d / Win);
				});
				enemies.forEach(m => {
					var d = Math.max(Math.abs(m[0] - x), Math.abs(m[1] - y));
					pe += Math.max(0, 1 - d / Win);
				});
				g[1] = pow / 2 + pm * this.center + pe * (1 - this.center);
			});

			goes.sort((a, b) => b[1] - a[1]);
			var index = goes[0][1];
			goes = goes.filter(g => g[1] >= index);
			index = Math.floor(goes.length * Math.random());
			return goes[index][0];
		}
	}

	window.RushGo = window.RushGo || {};
	window.RushGo.AIOne = AIOne;
}) ();