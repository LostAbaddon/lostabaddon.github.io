(() => {
	const Win = RushGo.Win;
	const State = window.RushGo.State;
	const HalfLine = window.RushGo.HalfLine;
	const SingleLine = window.RushGo.SingleLine;
	const CrossPoint = window.RushGo.CrossPoint;
	const ValueField = window.RushGo.ValueField;

	// AI
	class AITwo extends RushGo.AIOne {
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
		makeDecision (board, scoreM, choiseM, scoreE, choiseE, choise, valueMap, valueField) {
			var levelLimit = window.RushGo.loopCount / Math.max(window.RushGo.loopCount, DistrCount);
			levelLimit = Math.ceil(levelLimit * levelLimit * this.level);
			var level = this.level;
			if (level > levelLimit) level = levelLimit;

			if (window.RushGo.DrawStrategy) {
				console.log('====> Make Decision <==== [' + (window.RushGo.loopCount + 1) + ']    ' + this.id + '(' + level + '|' + this.level + ')');
				if (valueField.mustWins.length > 0)  console.log('    MustWins : (' + valueField.mustWins.join('), (') + ')');
				if (valueField.mustLoses.length > 0) console.log('    MustLoses: (' + valueField.mustLoses.join('), (') + ')');
				if (valueField.willWins.length > 0)  console.log('    WillWins : (' + valueField.willWins.join('), (') + ')');
				if (valueField.willLoses.length > 0) console.log('    WillLoses: (' + valueField.willLoses.join('), (') + ')');
				if (valueField.mayWins.length > 0)   console.log('    MayWins  : (' + valueField.mayWins.join('), (') + ')');
				if (valueField.mayLoses.length > 0)  console.log('    MayLoses : (' + valueField.mayLoses.join('), (') + ')');
			}

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
					if (window.RushGo.DrawStrategy) console.log('  --> (' + c[0] + ') : ' + c[1]);
				});
			}

			// 进行预判
			if (this.level > 0) {
				let short = false, less = 0;
				choise.forEach(c => {
					var [pos, value] = c;
					var [state, score, rate] = this.oracle(board, scoreM, choiseM, scoreE, choiseE, pos, level, this.id, short);
					console.log('      ::> (' + pos + ') : ' + value + ' / ' + score + ' [' + state + '] ' + rate);

					if (state > State.Normal) {
						short = true;
						score = 1;
					}
					else if (state < State.Alone) {
						short = true;
						score = 0;
					}
					else if (state === State.Alone) {
						score = 0;
						value = 0;
					}
					else {
						score = rate;
					}

					c[1] = value;
					c[2] = score;
					if (score < 0.5) less ++;
				});
				let reverse = less === choise.length;
				let old = choise;
				choise = choise.filter(c => c[2] > 0 && c[1] > 0);
				if (choise.length === 0) choise = old;
				if (reverse) {
					choise.forEach(c => c[1] *= 1 - c[2]);
				}
				else {
					choise.forEach(c => c[1] *= c[2]);
				}
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
					if (window.RushGo.DrawStrategy) console.log('    ~~> (' + c[0] + ') : ' + c[1]);
				});
			}
			else {
				choise.forEach(c => {
					c[1] /= max;
					strategy.push([...c, 1]);
					if (window.RushGo.DrawStrategy) console.log('    ~~> (' + c[0] + ') : ' + c[1]);
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
			if (level <= 0) return [State.Normal, 1, 0.5];

			// 设置预想中的棋局
			board = window.RushGo.copyRushGo(board);
			board[pos[0]][pos[1]] = player;

			// 判断是否当前落子能赢
			var finish = window.RushGo.checkFinish(board, player, ...pos);
			if (finish > 0) {
				return [State.MustWin, 1, 1];
			}
			else if (finish < 0) {
				return [State.MustLose, 0, 0];
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
				return [State.MustWin, 1, 1];
			}
			else if (stgE.mustWins.length > 0) {
				return [State.MustLose, 0, 0];
			}
			else if (stgM.willWins.length > 0) {
				return [State.WillWin, 1, 1];
			}
			else if (stgE.willWins.length > 0) {
				return [State.WillLose, 0, 0];
			}
			else if (level === 1 || short) {
				if (stgM.mayWins.length > 0) {
					return [State.MayWin, 1, 1];
				}
				else if (stgE.mayWins.length > 0) {
					return [State.MayLose, 0, 0];
				}
				else {
					let oldM = (scoreM + choiseM.scoreW) * this.attacktive + (scoreE + choiseE.scoreW) * (1 - this.attacktive);
					let newM = (scrM + stgM.scoreW) * this.attacktive + (scrE + stgE.scoreW) * (1 - this.attacktive);
					let delta = newM - oldM;
					delta = Math.exp(delta / Win / Win);
					return [State.Normal, newM, delta / (1 + delta)];
				}
			}

			// 预判下一个角色落子位置及可能的局势变化
			level --;
			var next = player + 1;
			if (next === 2) next = 0;

			var [oState, oScore, oRate] = this.forcast(next, board, level);
			if (oState === State.MustWin) return [State.MustLose, 0, 0];
			else if (oState === State.WillWin) return [State.WillLose, 0, 0];
			else if (oState === State.MayWin) return [State.MayLose, 0, 0];
			else if (oState === State.MayLose) return [State.MayWin, 1, 1];
			else if (oState === State.WillLose) return [State.WillWin, 1, 1];
			else if (oState === State.MustLose) return [State.MustWin, 1, 1];
			else return [State.Normal, oScore, 1 - oRate];
			// else {
			// 	let oldM = (scoreM + choiseM.scoreW) * this.attacktive + (scoreE + choiseE.scoreW) * (1 - this.attacktive);
			// 	let delta = oScore - oldM;
			// 	delta = Math.exp(delta / Win / Win);
			// 	return [State.Normal, oScore, delta / (1 + delta)];
			// }
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

			var musts = [], oracleState = State.Normal;
			if (moveList.mustWins.length > 0) {
				musts = moveList.mustWins;
				oracleState = State.MustWin;
			}
			else if (moveList.mustLoses.length > 0) {
				musts = moveList.mustLoses;
				oracleState = State.MustLose;
			}
			else if (moveList.willWins.length > 0) {
				musts = moveList.willWins;
				oracleState = State.WillWin;
			}
			else if (moveList.willLoses.length > 0) {
				musts = moveList.willLoses;
				oracleState = State.WillLose;
			}
			else if (moveList.mayWins.length > 0) {
				musts = moveList.mayWins;
				oracleState = State.MayWin;
			}
			else if (moveList.mayLoses.length > 0) {
				musts = moveList.mayLoses;
				oracleState = State.MayLose;
			}

			if (musts.length === 1) {
				if (oracleState > State.Normal) return [oracleState, 1, 1];
				else return [oracleState, 0, 0];
			}
			else if (musts.length > 0) {
				let s = 1 / musts.length;
				choise = musts.map(pos => [pos, s]);
			}
			else {
				let moves;
				[musts, moves] = this.thinkAsEnemy(board, player);
				if (musts.length > 0) choise = musts;
				else if (moves.length > 0) {
					if (choise.length === 0) choise = moves;
					else {
						let map = {};
						choise.forEach(c => {
							let tag = '(' + c[0] + ')';
							map[tag] = c;
						});
						let total = 0;
						moves.forEach(c => total += c[1]);
						moves.forEach(c => {
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
			}
			if (choise.length === 0) return [State.WillLose, 0, 0];

			var short = false, max = 0, total = 0, m = 0;
			choise.forEach(c => {
				var [pos, value] = c;
				var [state, score, rate] = this.oracle(board, scoreM, strategyM, scoreE, strategyE, pos, level, player, short);

				if (state > State.Normal) {
					short = true;
					score = 1;
				}
				else if (state < State.Alone) {
					short = true;
					score = 0;
				}
				else if (state === State.Alone) {
					score = 0;
					value = 0;
				}
				else {
					score = rate;
				}

				max += value;
				m += score;
				total += score * value;
			});

			return [State.Normal, total / m, total / max];
		}
	}

	window.RushGo = window.RushGo || {};
	window.RushGo.AITwo = AITwo;
}) ();