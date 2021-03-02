(() => {
	const Win = RushGo.Win;
	// 辅助类
	class State {
		static MustWin = 3;	// 下一步能赢
		static WillWin = 2;	// 下两步能赢
		static MayWin = 1;	// 下三步能赢
		static Normal = 0;
		static Alone = -1;
		static MayLose = -2;
		static WillLose = -3;
		static MustLose = -4;
		static Forbidden = -10;
		static getMax (...states) {
			if (states.length) return new State();;
			states.sort((s1, s2) => {
				var diff = s2.state - s1.state;
				if (diff !== 0) return diff;
				return s2.score - s1.score;
			});
			return states[0].copy();
		}

		state = State.Normal;
		score = 0;
		constructor (state, score) {
			if (!isNaN(state)) this.state = state;
			if (!isNaN(score)) this.score = score;
			this.update();
		}
		update () {
			if (this.state === State.MustWin) this.score = Win * Win;
			else if (this.state === State.WillWin) this.score = Win * Win - Win;
			else if (this.state === State.MayWin) this.score = Win;
			else if (this.state === State.MayLose) this.score = - Win;
			else if (this.state === State.WillLose) this.score = Win - Win * Win;
			else if (this.state === State.MustLose) this.score = - Win * Win;
			else if (this.state === State.Alone) this.score = 0;
		}
		copy () {
			return new State(this.state, this.score);
		}
	}
	class HalfLine {
		pointCount = 0; // 紧接着的棋数
		emptyCount = 0; // 棋后空格数
		borderType = 0; // 0: 边界；1: 敌方；2: 空格
		neighbor = 0;   // 空格后连续同色棋数，正为己方负为敌方
		farBorder = 0;	// 0: 边界；1: 空格
		toString () {
			return this.pointCount + ':' + this.borderType + ':' + this.emptyCount + ':' + this.neighbor;
		}
	}
	class SingleLine {
		halves = [];
		pointCount = 0;
		emptyCount = 0;
		state = new State();
		constructor (half1, half2, rangeMind = 0) {
			this.halves.push(half1);
			this.halves.push(half2);

			this.pointCount = half1.pointCount + half2.pointCount;
			if (half1.borderType === 2) this.emptyCount ++;
			if (half2.borderType === 2) this.emptyCount ++;

			// 如果下一子就能连成足够长的线，则状态设为MustWin
			if (this.pointCount + 1 >= Win) {
				this.state.state = State.MustWin;
			}
			// 如果两边什么都没有，则认定为空
			else if (half1.neighbor <= 0 && half2.neighbor <= 0 && this.pointCount === 0) {
				this.state.state = State.Alone;
			}
			// 如果两端无空位，且长度不足
			else if (half1.borderType !== 2 && half2.borderType !== 2 && this.pointCount + 1 < Win) {
				this.state.state = State.Alone;
			}
			else if (half1.borderType !== 2 && half2.borderType === 2 && half2.farBorder === 0 && this.pointCount + 1 + half2.emptyCount + half2.neighbor < Win) {
				this.state.state = State.Alone;
			}
			else if (half2.borderType !== 2 && half1.borderType === 2 && half1.farBorder === 0 && this.pointCount + 1 + half1.emptyCount + half1.neighbor < Win) {
				this.state.state = State.Alone;
			}
			else if (half1.borderType === 2 && half1.farBorder === 0 && half2.borderType === 2 && half2.farBorder === 0 && this.pointCount + 1 + half1.emptyCount + half1.neighbor + half2.emptyCount + half2.neighbor < Win) {
				this.state.state = State.Alone;
			}
			// 如果当前左右子加气口足够构成赢面
			else if (this.pointCount + this.emptyCount >= Win) {
				// 能进入这个判断的话，两端必须都是空位
				this.state.state = State.WillWin;
			}
			else {
				let checked = false;
				// 如果两边都是隔开一个空位有己方棋子
				if (half1.neighbor > 0 && half2.neighbor > 0 && half1.emptyCount === 1 && half2.emptyCount === 1) {
					let c = this.pointCount + 1;
					// 两侧之一隔空位后的总长度足够场
					if (c + half1.neighbor >= Win || c + half2.neighbor >= Win) {
						checked = true;
						this.state.state = State.WillWin;
					}
				}
				if (!checked) {
					let score = Win - this.pointCount;
					score = this.emptyCount / score;
					score -= (1 - rangeMind) * this.emptyCount / Win;
					let viceS1 = 0, viceS2 = 0;
					if (half1.borderType === 2 && half1.neighbor > 0) {
						viceS1 = half1.neighbor / (half1.emptyCount + Win);
					}
					if (half2.borderType === 2 && half2.neighbor > 0) {
						viceS2 = half2.neighbor / (half2.emptyCount + Win);
					}
					score += ((viceS1 + viceS2) / 2) * rangeMind;
					this.state.score = score;
				}
			}
			this.state.update();
			this.halves.sort((h1, h2) => {
				var diff = h2.pointCount - h1.pointCount;
				if (diff !== 0) return diff;
				diff = h2.emptyCount - h1.emptyCount;
				if (diff !== 0) return diff;
				diff = h2.neighbor - h1.neighbor;
				return diff;
			});
		}
		toString () {
			return this.pointCount + '|' + this.halves[0].toString() + '|' + this.halves[1].toString();
		}
	}
	class CrossPoint {
		lines = [];
		lineCount = 0;
		pointCount = 0;
		emptyCount = 0;
		state = new State();
		constructor (isEnemy, ...lines) {
			if (!lines || lines.length === 0) return;
			var mustWins = [], willWins = [], mayWins = [], normals = [], specialValue = 0;
			lines.forEach(line => {
				this.lines.push(line);
				if (line.state.state === State.Normal) normals.push(line);
				else if (line.state.state === State.MustWin) mustWins.push(line);
				else if (line.state.state === State.WillWin) willWins.push(line);
				else if (line.state.state === State.MayWin) mayWins.push(line);
			});
			if (mustWins.length > 0) {
				this.state.state = State.MustWin;
			}
			else if (willWins.length > 0) {
				this.state.state = State.WillWin;
			}
			else if (mayWins.length > 0) {
				this.state.state = State.MayWin;
			}
			else if (normals.length > 0) {
				this.state.state = State.Normal;
				let lines = [];
				normals.forEach(line => {
					this.lineCount ++;
					this.pointCount += line.pointCount;
					this.emptyCount += line.emptyCount;
					this.state.score += line.state.score;
					lines.push(line);
				});
				if (lines.length > 1) {
					let readys = [];
					lines.forEach(l => {
						if (l.emptyCount === 0) return;
						let checked = false;
						let todo = Win - l.pointCount, air = l.emptyCount;
						if (todo <= air + 1) {
							readys.push(Math.max(1, todo));
							checked = true;
						}

						// 如果隔开空格后的远端部分可以连成线
						if (!checked && l.halves[0].emptyCount === 1) {
							air = l.halves[1].borderType === 2 ? 1 : 0;
							if (l.halves[0].farBorder === 1) air ++;
							let c = l.pointCount + 1 + l.halves[0].neighbor;
							c = Win - c;
							if (c <= air) {
								todo = c + 1;
								readys.push(todo);
								checked = true;
							}
						}
						if (!checked && l.halves[1].emptyCount === 1) {
							air = l.halves[0].borderType === 2 ? 1 : 0;
							if (l.halves[1].farBorder === 1) air ++;
							let c = l.pointCount + 1 + l.halves[1].neighbor;
							c = Win - c;
							if (c <= air) {
								todo = c + 1;
								readys.push(todo);
								checked = true;
							}
						}
					});
					if (readys.length >= 2) {
						readys.sort((a, b) => a - b);
						if (readys.length > 2) readys = readys.splice(0, 2);
						// let count = isEnemy ? readys[0] : readys[1];
						let count = readys[1];
						if (count <= 2) this.state.state = State.WillWin;
						else this.state.state = State.MayWin;
					}
				}
			}
			else {
				this.state.state = State.Alone;
			}
			this.state.update();
			this.state.score += specialValue;
			this.lines.sort((l1, l2) => {
				var diff = l2.pointCount - l1.pointCount;
				if (diff !== 0) return diff;
				diff = l2.emptyCount - l1.emptyCount;
				if (diff !== 0) return diff;
				diff = l2.halves[0].pointCount - l1.halves[0].pointCount;
				if (diff !== 0) return diff;
				diff = l2.halves[0].emptyCount - l1.halves[0].emptyCount;
				if (diff !== 0) return diff;
				diff = l2.halves[0].neighbor - l1.halves[0].neighbor;
				return diff;
			});
		}
		toString () {
			return this.lines.map(line => line.toString()).join('|');
		}
	}
	class ValueField {
		mustWins = [];
		willWins = [];
		mayWins = [];
		normals = [];
		mayLoses = [];
		willLoses = [];
		mustLoses = [];
		get scoreW () {
			return this.mustWins.length * Win * Win + this.willWins.length * (Win * Win - Win) + this.mayWins.length * Win;
		}
		get scoreL () {
			return this.mustLoses.length * Win * Win + this.willLoses.length * (Win * Win - Win) + this.mayLoses.length * Win;
		}
	}

	window.RushGo = window.RushGo || {};
	window.RushGo.State = State;
	window.RushGo.HalfLine = HalfLine;
	window.RushGo.SingleLine = SingleLine;
	window.RushGo.CrossPoint = CrossPoint;
	window.RushGo.ValueField = ValueField;
}) ();