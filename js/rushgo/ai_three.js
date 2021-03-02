(() => {
	const Win = RushGo.Win;
	const State = window.RushGo.State;
	const HalfLine = window.RushGo.HalfLine;
	const SingleLine = window.RushGo.SingleLine;
	const CrossPoint = window.RushGo.CrossPoint;
	const ValueField = window.RushGo.ValueField;

	// AI 3，强化预判能力
	class AIThree extends RushGo.AIOne {
		deepRange = 2;
		decayPower = 2;
		decayRate = 0.5;
		constructor (id, attacktive, attitude, level, range, rangeMind, useOracle, deepRange, decayPower, decayRate) {
			super(id, attacktive, attitude, level, range, rangeMind, useOracle);
			if (!isNaN(deepRange)) this.deepRange = deepRange;
			if (!isNaN(decayPower)) this.decayPower = decayPower;
			if (!isNaN(decayRate)) this.decayRate = decayRate;
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

			choiseO = choiseO.filter(a => a[1] > 0);
			choiseO.sort((a, b) => b[1] - a[1]);
			var total = 0;
			choiseO.forEach(c => total += c[1]);
			choiseO.forEach(c => c[1] /= total);

			return [choiseO, valueField, result];
		}
		makeDecision (board, scoreM, choiseM, scoreE, choiseE, choise, valueMap, valueField) {
			if (window.RushGo.DrawStrategy) {
				console.log('====> Make Decision <==== [' + (window.RushGo.loopCount + 1) + ']    ' + this.id + '(' + this.level + ')');
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
				mustMove = valueField.mustWins.map(c => [c, 1]);
			}
			// 如果敌方有制胜位
			else if (valueField.mustLoses.length > 0) {
				mustMove = valueField.mustLoses.map(c => [c, 1]);
			}
			// 如果我方有预胜位
			else if (valueField.willWins.length > 0) {
				mustMove = valueField.willWins.map(c => [c, 1]);
			}
			// 如果敌方有预胜位
			else if (valueField.willLoses.length > 0) {
				mustMove = valueField.willLoses.map(c => [c, 1]);
			}
			// 如果有可能的制胜位
			else if (valueField.mayWins.length > 0) {
				mustMove = valueField.mayWins.map(c => [c, 1]);
			}
			else if (valueField.mayLoses.length > 0) {
				mustMove = valueField.mayLoses.map(c => [c, 1]);
			}

			// 如果必走位只有一个，那就不需要做额外判断了
			if (mustMove.length === 1) {
				return [mustMove[0][0], []];
			}

			// 如果必走位不止一个，那取代正常选择
			if (mustMove.length > 0) {
				let total = 0;
				mustMove.forEach(c => total += c[1]);
				choise = mustMove.map(move => [move[0], move[1] / total]);
			}
			// 如果可选项太多，则进行筛选
			else if (choise.length > this.range) {
				let index = choise[this.range - 1][1];
				let first = choise.filter(c => c[1] > index);
				let last = choise.filter(c => c[1] === index);
				index = this.range - first.length;
				for (let i = 0; i < index; i ++) {
					let l = last.length;
					l = Math.floor(l * Math.random());
					l = last.splice(l, 1)[0];
					first.push(l);
				}
				choise = first;
			}

			// 通过Deep分析进行筛选
			mustMove = [];
			var loseMoves = [];
			scoreM += choiseM.scoreW / Win;
			scoreE += choiseE.scoreW / Win;
			if (window.RushGo.DrawStrategy) console.log('    Branch Count: ' + choise.length);
			choise.forEach(c => {
				var [pos, value] = c;
				var list = this.goDeep(board, ...pos);
				if (!list && window.RushGo.DrawStrategy) console.log('    .... (' + pos + ') ' + value + ' >> null');
				if (!list) return;
				if (list[0] === -1) {
					let deltaM = list[1] - scoreM;
					let deltaE = scoreE - list[2];
					let deltaS = deltaM * this.attacktive + deltaE * (1 - this.attacktive);
					deltaS = (Win + deltaS) / Win;
					c[1] *= deltaS;
					if (window.RushGo.DrawStrategy) console.log('    .... (' + pos + ') ' + value + ' >> null (' + deltaS + ')');
					return;
				}
				var result = {};
				list.forEach(l => {
					var [id, win, lose, deep, is_must] = l;
					var record = result[id];
					if (!record) {
						record = [0, 0, 0, false];
						result[id] = record;
					}
					if (is_must === record[3]) {
						record[0] += win * value;
						record[1] += lose * value;
					}
					else if (is_must && !record[3]) {
						record[0] += win * value * this.decayRate;
						record[1] += lose * value * this.decayRate;
					}
					if (deep > record[2]) record[2] = deep;
					record[3] = record[3] || is_must;
				});
				var score = 0;
				for (let id in result) {
					let [win, lose, deep, is_must] = result[id];
					id *= 1;
					let s = 0;
					if (id === this.id) {
						s = win * this.attacktive - lose * (1 - this.attacktive);
					}
					else {
						s -= win * (1 - this.attacktive) - lose * this.attacktive;
					}
					score += s;
					if (window.RushGo.DrawStrategy) console.log('    :::: (' + pos + ') ' + value + ' : ' + id + ' >> ' + win + ' / ' + lose + ' (' + deep  + ') >> ' + s + '    M: ' + is_must);
				}
				if (score > 0) {
					let ok = true, index = -1;
					loseMoves.some((l, i) => {
						if (l[0] !== pos) return false;
						if (l[1] + score < 1) ok = false;
						else index = i;
					});
					if (ok) {
						mustMove.push([pos, score]);
					}
					else if (index >= 0) {
						loseMoves.splice(index, 1);
					}
				}
				else if (score < 0) {
					let notok = true, index = -1;
					mustMove.some((m, i) => {
						if (m[0] !== pos) return false;
						if (m[1] + score > 0) notok = false;
						else index = i;
					});
					if (notok) {
						loseMoves.push([pos, 1 + score]);
					}
					else if (index >= 0) {
						mustMove.splice(index, 1);
					}
				}
			});

			// 如果没有预判结果
			if (mustMove.length > 0) {
				let total = 0;
				mustMove.forEach(c => total += c[1]);
				mustMove.forEach(c => c[1] /= total);
				choise = mustMove;
			}

			// 去除可能导致失败的位子
			if (loseMoves.length > 0) {
				let moves = [];
				choise.forEach(c => {
					var has = false;
					loseMoves.some(l => {
						if (c[0] !== l[0]) return false;
						has = true;
						c[1] = l[1];
						return true;
					});
					if (!has) moves.push(c);
					else if (window.RushGo.DrawStrategy) console.log('  REMOVE ~~> (' + c[0] + ') : ' + c[1]);
				});
				if (moves.length > 0) choise = moves;
				else if (window.RushGo.DrawStrategy) console.log('  >>>> No Choise Available Now!!! <<<<');
			}

			// 如果既没有致胜位之争也没有可走策略，则退出决策
			if (choise.length === 0) {
				return [null, []];
			}

			choise.sort((a, b) => b[1] - a[1]);
			if (choise.length > this.range) {
				let index = choise[this.range][1];
				let first = choise.filter(c => c[1] > index);
				if (first.length < this.range) {
					let last = choise.filter(c => c[1] === index);
					index = this.range - first.length;
					for (let i = 0; i < index; i ++) {
						let l = last.length;
						l = Math.floor(l * Math.random());
						l = last.splice(l, 1)[0];
						first.push(l);
					}
				}
				choise = first;
			}

			var total = 0;
			choise.forEach(c => total += c[1]);
			if (total === 0) {
				total = choise.length;
				choise.forEach(c => {
					c[1] = 1 / total;
					strategy.push([...c, 0]);
					if (window.RushGo.DrawStrategy) console.log('  --> (' + c[0] + ') : ' + c[1]);
				});
			}
			else {
				choise.forEach(c => {
					c[1] /= total;
					strategy.push([...c, 0]);
					if (window.RushGo.DrawStrategy) console.log('  --> (' + c[0] + ') : ' + c[1]);
				});
			}

			var max = 0;
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
		goDeep (board, x, y, player=this.id, level=this.level) {
			if (level <= 0) return null;
			// console.log('    ====::::>>>> [' + (window.RushGo.loopCount + 1) + '] ' + player + '(' + level + ') : (' + x + ',' + y + ')');

			board = window.RushGo.copyRushGo(board);
			board[x][y] = player;

			// 判断是否当前落子能赢
			var finish = window.RushGo.checkFinish(board, player, x, y);
			if (finish > 0) {
				return [[player, 1, 0, 1, true]];
			}
			else if (finish < 0) {
				return [[player, 0, 1, 1, true]];
			}

			var next = player + 1;
			if (next === 2) next = 0;

			// 分析场上敌我势值
			var situaM = window.RushGo.analyzeRush(board, next, false, this.rangeMind);
			var situaE = [];
			for (let i = 0; i < 2; i ++) {
				if (i === next) continue;
				situaE.push(window.RushGo.analyzeRush(board, i, true, this.rangeMind));
			}
			situaE = window.RushGo.combineEnemy(situaE);

			// 判断敌我气势的变化
			var [scrM, stgM] = window.RushGo.valueStatus(situaM);
			var [scrE, stgE] = window.RushGo.valueStatus(situaE);

			var mustMove = [];
			if (stgM.mustWins.length > 0) {
				mustMove = stgM.mustWins.map(c => [c, 1]);
			}
			else if (stgE.mustWins.length > 0) {
				mustMove = stgE.mustWins.map(c => [c, 1]);
			}
			else if (stgM.willWins.length > 0) {
				mustMove = stgM.willWins.map(c => [c, 1]);
			}
			else if (stgE.willWins.length > 0) {
				mustMove = stgE.willWins.map(c => [c, 1]);
			}
			else if (stgM.mayWins.length > 0) {
				mustMove = stgM.mayWins.map(c => [c, 1]);
			}
			else if (stgE.mayWins.length > 0) {
				mustMove = stgE.mayWins.map(c => [c, 1]);
			}

			var isMust = true;
			var total = 0;
			if (mustMove.length === 0) {
				isMust = false;
				let [choise, _, __] = this.combineStrategy(situaM, situaE);
				if (choise.length === 0) return [-1, scrM + stgM.scoreW / Win, scrE + stgE.scoreW / Win];
				let range = Math.ceil(this.deepRange * ((level / this.level) ** this.decayPower));
				choise.forEach(c => total += c[1]);
				if (choise.length > range) {
					let index = choise[range - 1][1];
					mustMove = choise.filter(c => c[1] > index);
					let last = choise.filter(c => c[1] === index);
					index = range - mustMove.length;
					for (let i = 0; i < index; i ++) {
						let l = last.length;
						l = Math.floor(l * Math.random());
						l = last.splice(l, 1)[0];
						mustMove.push(l);
					}
				}
			}
			else {
				mustMove.forEach(c => total += c[1]);
			}
			// console.log('        Sub-Branch Count: ' + mustMove.length + ' (' + isMust + ')');

			var result = {};
			if (!isMust) level --;
			var hasChoise = false;
			mustMove.forEach(c => {
				var [pos, value] = c;
				value /= total;
				var anals = this.goDeep(board, ...pos, next, level);
				if (!anals || anals[0] === -1) return;
				hasChoise = true;
				anals.forEach(ana => {
					var [id, win, lose, deep, is_must] = ana;
					// console.log('        ' + id + '(' + deep + '): ' + win + ' / ' + lose + ' | ' + is_must);
					var record = result[id];
					if (!record) {
						record = [0, 0, 0, false];
						result[id] = record;
					}
					if (is_must) {
						record[0] += win * value;
						record[1] += lose * value;
					}
					else {
						record[0] += win * value * this.decayRate;
						record[1] += lose * value * this.decayRate;
					}
					deep ++;
					if (deep > record[2]) record[2] = deep;
					record[3] = record[3] || (is_must && isMust);
				});
			});
			// if (!hasChoise) return null;
			if (!hasChoise) return [-1, scrM + stgM.scoreW / Win, scrE + stgE.scoreW / Win];
			var list = [];
			for (let id in result) {
				list.push([id * 1, ...(result[id])]);
			}
			return list;
		}
	}

	window.RushGo = window.RushGo || {};
	window.RushGo.AIThree = AIThree;
}) ();