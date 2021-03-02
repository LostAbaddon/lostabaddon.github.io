(() => {
	const ControllerHeight = 50;
	const Rate = 2;
	const DefaultVelocity = 4000;
	const MinVelocity = 20;
	const ShiftLength = 1;
	const Duration = 1000 / 60;
	const Step = 10;
	const ZenCount = 50;
	const ImpedeColor = [
		[0, [237, 227, 231]],
		[20, [248, 223, 114]],
		[50, [147, 181, 207]],
		[100, [81, 196, 211]],
		[150, [86, 152, 195]],
		[200, [87, 195, 194]],
		[300, [32, 137, 77]],
		[500, [212, 37, 23]],
		[800, [72, 30, 28]],
		[1000, [76, 31, 36]],
		[2000, [44, 42, 41]],
	];
	const BallColor = [
		[0, [226, 225, 228]],
		[3, [205, 209, 211]],
		[8, [192, 196, 195]],
	];
	const TagGameSaveName = 'ballcrush_save';
	const TagGameRankList = 'ballcrush_rank';

	class Ball {
		x = 500;
		y = 0;
		r = 30;
		p = 1;
		vx = 0;
		vy = 0;
		score = 0;
		mass = 1;
		hits = 0;
		color = 'white';
		border = 'black';
		text = 'black';
		isBall = false;
		isGhost = true;
		isBlackHole = false;
		isRedNeck = false;
		isGolden = false;
		constructor (vx, vy, r=30, p=1) {
			this.vx = vx;
			this.vy = vy;
			this.r = r;
			this.p = p;
		}
		move (delta) {
			// 记录原始位置
			var ox = this.x, oy = this.y;
			var oriX = ox, oriY = oy;

			// 上方越界则自动认定脱离Ghost状态
			if (this.y < -100 && this.vy < 0) this.isGhost = false;

			// 运动到新位置
			this.x += this.vx * delta;
			this.y += this.vy * delta;
			// 下方越界则该球脱离运动生命周期
			if (this.y > 2000 + this.r) {
				return [false, false];
			}

			// 碰撞相关
			var needRedraw = false; // 撞到了障碍物
			var collisions = []; // 接触的障碍物
			var golden = false;

			/*	判断逻辑
			 *	1.	判断在运动路径上是否与障碍物相撞
			 *	2.	找出最近的相撞的障碍物，进行反弹与衰减
			 *	3.	用接触位置作为新初始位置，并扣除刚碰撞的物体，找出新运动路径下最近的障碍物，并进行反弹和衰减
			 *	4.	判断初始位置是否在障碍物内部，如果在内部，则给予斥力
			**/

			// 计算碰撞
			var ov = { x: this.vx, y: this.vy };
			var lastImp = null, collided = true, dlt = delta, loopMax = 10, loop = loopMax, killed = false;
			while (collided && loop > 0) {
				loop --;
				collided = false;
				let collisions = [];

				// 考试墙壁的情况
				let vect = wallCollide(ox, oy, this.x, this.y, this);
				if (!!vect && vect[3] !== lastImp) {
					collisions.push(vect);
					collided = true;
				}

				// 障碍物的情况
				impedes.forEach(imp => {
					if (imp === lastImp) return;
					vect = imp.collide(ox, oy, this.x, this.y, this);
					if (!vect) return;
					collisions.push(vect);
					collided = true;
				});

				if (!collided) break;

				// 先处理最近的碰撞
				this.isGhost = false;
				collisions.sort((a, b) => a[2] - b[2]);
				collisions = collisions[0];
				this.vx = collisions[0].x;
				this.vy = collisions[0].y;
				ox = collisions[1].x;
				oy = collisions[1].y;
				let rate = 1 - collisions[2];
				rate *= dlt;
				this.x = ox + this.vx * rate;
				this.y = oy + this.vy * rate;
				this.vx *= dump;
				this.vy *= dump;
				lastImp = collisions[3];
				if (isNaN(lastImp)) {
					needRedraw = true;
					needRewrite = true;

					if (lastImp.isBlackHole) {
						this.p -= lastImp.p;
						lastImp.score += 1;
						if (this.p <= 0) {
							this.p = 1;
							lastImp.score += 1;
						}
						killed = true;
						this.updateSize();
						break;
					}
					else if (lastImp.isGolden) {
						this.hits += 2;
						this.score ++;
						lastImp.p --;
						if (lastImp.p === 0) {
							let idx = impedes.indexOf(lastImp);
							if (idx >= 0) impedes.splice(idx, 1);
							golden = true;
							this.score += this.p;
						}
						score += 1;
						current += 1;
						hits += this.p;
					}
					else {
						let p = this.p;
						if (p > lastImp.p) p = lastImp.p;
						this.hits += p;
						lastImp.p -= p;
						score += p;
						current += p;
						hits ++;
						if (lastImp.isRedNeck) {
							this.score += p;
							hits ++;
						}
						if (lastImp.p === 0) {
							let idx = impedes.indexOf(lastImp);
							if (idx >= 0) impedes.splice(idx, 1);
							if (this.hits > 1) {
								if (lastImp.isRedNeck) {
									this.score += lastImp.max;
								}
								else {
									this.score ++;
								}
							}
						}
					}
				}
			}

			if (killed) {
				return [true, needRedraw, true];
			}

			// 由于在障碍物内部而产生的斥力
			var forceX = 0, forceY = 0;

			// 墙壁的情况
			if (this.x < this.r) {
				forceX = this.r - this.x;
			}
			else if (this.x > 1000 - this.r) {
				forceX = this.x + this.r - 1000;
			}
			if (this.y < this.r) {
				forceY = this.r - this.y;
			}

			// 障碍物的情况
			var blackholes = [], rednecks = [];
			impedes.forEach(imp => {
				if (imp.isBlackHole) blackholes.push(imp);
				else if (imp.isRedNeck) rednecks.push(imp);
				var f = imp.doesInside(this.x, this.y, this.r);
				if (!f) return;
				forceX += f.x;
				forceY += f.y;
			});

			// 红脖斥力
			rednecks.forEach(r => {
				if (r.p <= 0) return;
				var dx = this.x - r.x;
				var dy = this.y - r.y;
				var dr = (dx ** 2 + dy ** 2) ** 0.5;
				if (dr < this.r + r.r) dr = this.r + r.r;
				dx /= dr;
				dy /= dr;
				dr = dr ** 2;
				var fx = r.max / this.p;
				if (fx > 200) fx = 200;
				fx *= r.p / r.max;
				fx = fx / dr * repel;
				if (fx > gravity) fx = gravity;
				var fy = fx * dy;
				fx = fx * dx;
				forceX += fx / this.mass / delta;
				forceY += fy / this.mass / delta;
			});
			// 黑洞引力
			blackholes.forEach(r => {
				if (r.p <= 0) return;
				var dx = r.x - this.x;
				var dy = r.y - this.y;
				var dr = (dx ** 2 + dy ** 2) ** 0.5;
				if (dr < this.r + r.r) dr = this.r + r.r;
				dx /= dr;
				dy /= dr;
				dr = dr ** 2;
				var fx = 10 * Math.sqrt(r.score + r.p + this.p);
				if (fx > 100) fx = 100;
				fx = fx / dr * attraction;
				if (fx > gravity) fx = gravity;
				var fy = fx * dy;
				fx = fx * dx;
				forceX += fx / this.mass / delta;
				forceY += fy / this.mass / delta;
			});

			// 对于非初始状态的处理
			if (!this.isGhost) {
				// 空气阻力
				forceX -= this.vx * resistance;
				forceY -= this.vy * resistance;

				// 引力
				forceY += gravity;
			}
			this.vx += forceX * delta;
			this.vy += forceY * delta;

			// 重力改变
			if (Math.abs(this.x - oriX) + Math.abs(this.y - oriY) < MinVelocity) {
				if (Math.abs(this.vy) < MinVelocity) {
					this.mass += 0.1;
				}
			}

			// 球升级
			if (this.score > 8 * this.p ** 2.5 + (this.p - 1) ** 3.5 - 4) {
				this.score = 0;
				this.p ++;
				this.updateSize();
			}
			// 球增殖
			if (hits > 5 * (count ** 1.8) + (count / 10) ** 2 + 0.2 * (count / 20) ** 5 + (count / 30) ** 8 - 3) {
				hits -= 10 * count;
				if (hits < 0) hits = 0;
				generateBalls(true);
			}

			return [true, needRedraw, false, golden];
		}
		updateSize () {
			this.r = 28 + this.p * 2;
		}
		draw () {
			var c, b, t;
			if (this.isBlackHole) {
				c = 'black';
				b = 'white';
				t = ' ';
			}
			else {
				c = pickColor(this.p, this.isBall);
				if (this.isRedNeck) {
					b = 'red';
				}
				else if (this.isGolden) {
					b = 'green';
				}
				else {
					b = this.border;
				}
				t = this.p;
			}
			drawBall(this.x, this.y, this.r, c, b, this.text, t, this.isBall);
		}
		static getHitPointOnCircle (x1, y1, x2, y2, cx, cy, r) {
			var x21 = x2 - x1, y21 = y2 - y1;
			var x10 = x1 - cx, y10 = y1 - cy;
			var R212 = x21 * x21 + y21 * y21;
			var R102 = x10 * x10 + y10 * y10;
			var V1021 = x10 * x21 + y10 * y21;

			var pt = V1021 * V1021 - (R102 - r * r) * R212;
			if (pt < 0) return null;
			pt = Math.sqrt(pt);
			var nt =  - (V1021 - pt) / R212;
			pt = - (V1021 + pt) / R212;
			if (pt < 0) return null;
			if (pt > 1) return null;
			var px = x1 + pt * x21;
			var py = y1 + pt * y21;
			var fromInside = false;
			var dx = x1 - cx, dy = y1 - cy;
			if (Math.abs(dx) <= r && Math.abs(dy) < r) fromInside = ((dx ** 2 + dy ** 2) - r ** 2 < 0);
			return [px, py, pt, fromInside];
		}
		collide (x1, y1, x2, y2, target) {
			var hitPoint = Ball.getHitPointOnCircle(x1, y1, x2, y2, this.x, this.y, target.r + this.r);
			if (!hitPoint) return null;

			var [hitX, hitY, rate, inside] = hitPoint;
			if (inside) return null; // 从内向外的撞击不考虑

			// 返回内容：反弹后速度矢量、接触点坐标、发生碰撞的时间序、自己
			var touchPoint = { x: hitX, y: hitY};
			var velocity = { x: 0, y: 0};
			var ang = 2 * Math.atan2(hitX - this.x, hitY - this.y);
			var sa = Math.sin(ang), ca = Math.cos(ang);
			velocity.x = target.vx * ca - target.vy * sa;
			velocity.y = 0 - target.vy * ca - target.vx * sa;

			return [velocity, touchPoint, rate, this];
		}
		doesInside (x, y, r) {
			var dr = this.r + r, dx = x - this.x, dy = y - this.y;
			var dis = Math.sqrt(dx * dx + dy * dy);
			if (dis > dr) return null;
			dr = dr - dis;
			dr /= dis;
			return {
				x: dx * dr,
				y: dy * dr
			};
		}
	}
	class Poly extends Ball {
		poly = 3;
		ang = 0;
		length = 0;
		rotate = 0;
		constructor (vx, vy, r=30, p=1) {
			super(vx, vy, r, p);
			this.poly = 3 + Math.floor(Math.random() * 4);
			var range = Math.PI * 2 / this.poly;
			this.ang = (Math.random() - 0.5) * range;
			if (Math.random() < 0.15) {
				let r = Math.PI * (0.008 + Math.random() * 0.012);
				if (Math.random() < 0.5) r *= -1;
				this.rotate = r;
			}
		}
		draw () {
			var c, b, t;
			if (this.isBlackHole) {
				c = 'black';
				b = 'white';
				t = ' ';
			}
			else {
				c = pickColor(this.p, this.isBall);
				if (this.isRedNeck) {
					b = 'red';
				}
				else if (this.isGolden) {
					b = 'green';
				}
				else {
					b = this.border;
				}
				t = this.p;
			}
			drawPoly(this.x, this.y, this.r, this.poly, this.ang, c, b, this.text, t);
		}
		collide (x1, y1, x2, y2, target) {
			x1 -= this.x;
			y1 -= this.y;
			x2 -= this.x;
			y2 -= this.y;

			// 对边和角进行处理
			var ang = Math.PI * 2 / this.poly, half = ang / 2, sh = Math.sin(half), ch = Math.cos(half);
			var extendR = this.r + target.r / ch;
			var innerR = this.r * ch + target.r;
			var limitHigh = this.r * sh, limitLow = -limitHigh;
			var cornerX = limitHigh, cornerY = this.r * ch;
			var rotate = this.ang + half;
			var collisions = [];
			for (let i = 0; i < this.poly; i ++) {
				rotate += ang;

				let collided = false;
				// 对球中心位置做旋转，旋转后待测试边为ry常值面
				let sa = Math.sin(rotate), ca = Math.cos(rotate);
				let rx1 = x1 * ca - y1 * sa;
				let ry1 = y1 * ca + x1 * sa;
				let rx2 = x2 * ca - y2 * sa;
				let ry2 = y2 * ca + x2 * sa;

				let hitted = ry2 <= extendR && ry2 >= 0;
				if (!hitted) continue;

				hitted = false;
				let maybeCorner = false;
				let rate = 0, hitX = 0, hitY = 0;
				if (ry1 === ry2) {
					hitted = true;
					maybeCorner = true;
				}
				else {
					rate = (ry1 - innerR) / (ry1 - ry2);
					hitX = rx1 + (rx2 - rx1) * rate;
					hitY = ry1 + (ry2 - ry1) * rate;
					hitted = true;
					if (hitX >= limitLow && hitX <= limitHigh) {
						if (rate < 0 || rate > 1) {
							maybeCorner = true;
						}
					}
					else {
						maybeCorner = true;
					}
				}
				if (!hitted) continue;

				let vx = target.vx * ca - target.vy * sa;
				let vy = target.vy * ca + target.vx * sa;
				// 如果可能接触到边
				if (maybeCorner) {
					// 如果是撞到角的情况
					let info = Ball.getHitPointOnCircle(rx1, ry1, rx2, ry2, cornerX, cornerY, target.r);
					if (!info) continue;
					if (info[3]) continue;

					let velocity = {}, touchPoint = {};
					touchPoint.x = info[0];
					touchPoint.y = info[1];
					let ang = 2 * Math.atan2(info[0] - cornerX, info[1] - cornerY);
					let asa = Math.sin(ang), aca = Math.cos(ang);
					velocity.x = vx * aca - vy * asa;
					velocity.y = 0 - vy * aca - vx * asa;
					collisions.push([velocity, touchPoint, info[2], sa, ca, true]);
				}
				else {
					// 如果是撞到边的情况
					let velocity = {}, touchPoint = {};
					velocity.x = vx;
					velocity.y = Math.abs(vy);
					touchPoint.x = hitX;
					touchPoint.y = hitY;
					collisions.push([velocity, touchPoint, rate, sa, ca, false]);
				}
			}
			if (collisions.length === 0) return null;
			collisions.sort((a, b) => a[2] - b[2]);
			collisions = collisions[0];

			var v = collisions[0], p = collisions[1], sa = collisions[3], ca = collisions[4];
			var velo = {}, loc = {};
			velo.x = v.x * ca + v.y * sa;
			velo.y = v.y * ca - v.x * sa;
			loc.x = p.x * ca + p.y * sa + this.x;
			loc.y = p.y * ca - p.x * sa + this.y;

			return [velo, loc, collisions[2], this];
		}
		doesInside (x, y, r) {
			// 预判断
			x = x - this.x;
			y = y - this.y;
			var extendR = r + this.r;
			if (Math.abs(x) > extendR || Math.abs(y) > extendR) return null;

			// 对边和角进行处理
			var ang = Math.PI * 2 / this.poly, half = ang / 2, sh = Math.sin(half), ch = Math.cos(half);
			var innerR = r + this.r * ch;
			var limitHigh = this.r * sh, limitLow = -limitHigh;
			var cornerX = limitHigh, cornerY = this.r * ch;
			var rotate = this.ang + half;
			var collisions = [];
			for (let i = 0; i < this.poly; i ++) {
				let collided = false;
				// 对球中心位置做旋转，旋转后待测试边为ry常值面
				let sa = Math.sin(rotate), ca = Math.cos(rotate);
				let rx = x * ca - y * sa;
				let ry = y * ca + x * sa;

				// 肯定不会发生碰撞的情况
				if (ry > innerR || ry < 0) continue;

				// 判断是否撞到边
				if (rx >= limitLow && rx <= limitHigh) {
					let force = {
						x: 0,
						y: innerR - ry
					};
					collisions.push([rx, ry, rotate, false, force.y, force, sa, ca]);
				}
				else {
					let dx = rx - cornerX, dy = ry - cornerY;
					let dis = Math.sqrt(dx * dx + dy * dy);
					if (dis > r) continue;
					let rate = r - dis;
					dis = rate / dis;
					let force = {
						x: dx * dis,
						y: dy * dis
					};
					collisions.push([rx, ry, rotate, true, rate, force, sa, ca]);
				}
				rotate += ang;
			}
			if (collisions.length === 0) return null;
			collisions.sort((a, b) => a[4] - b[4]);
			collisions = collisions[0];

			var force = { x: 0, y: 0 };
			var coll = collisions[5], ang = [collisions[6], collisions[7]];
			force.x = coll.x * ang[1] + coll.y * ang[0];
			force.y = coll.y * ang[1] - coll.x * ang[0];
			return force;
		}
	}

	var padEnd = document.querySelector('div.container div.area div.infoPad[name="GameEnd"]');
	var padMode = document.querySelector('div.container div.area div.infoPad[name="ModeSelector"]');

	var score = 0, count = 0, power = 0, current = 0, hits = 0, ctx, timer, stamp = 0;
	var elS, elC, elP, elT, elL;
	var px = 500, py = 9;
	var gravity = 9000, resistance = 0.3, repel = 200000, attraction = 100000, dump = 0.9;
	var gameStatus = 0; // 0: 闲置; 1: 落球; 2: 移关中; 3: 暂停
	var targetX = 0, targetY = 0, waiting = 0, needRewrite = false, needCombine = false;
	var impedes = [], level = 1;
	var impedeColorMap = {}, ballColorMap = {}, impedeDefaultColor = '', ballDefaultColor = '';
	var balls = [], readyBalls = [], activeBalls = [];

	const ModeSelector = {
		difficult: 0,
		finish: 0,
		newLine0 (isReady=true) {
			return ModeSelector.newLine1(isReady, false, false);
		},
		newLine1 (isReady=true, useBlackHole=true, useRedNecker=true) {
			var results = [];
			var total = 3 + Math.floor(Math.random() * 3.5), w = 1000;
			var disappear = (1 / 2 - 1 / total) / 2.5;
			var cL = level, cC = count, cT = current, cP = power;
			if (ModeSelector.finish === 1) {
				cL = 80;
				cC = 100;
				cP = 150;
			}
			else {
				if (cC < 1) cC = 1;
				if (cP < 1) cP = 1;
				if (cT < 1) cT = 1;
			}
			var pMin = 1 + Math.round(((cL ** 1.05) + ((cL / 10) ** 2)) * (cT ** 0.1) + (cP ** 0.8));
			var pMax = pMin + Math.round((cL ** 0.4) + (cP ** 0.3) + (cT ** 0.1));
			var rateGoldApple = Math.sqrt((cC - 8) / cC) / 8;
			if (ModeSelector.finish === 0) rateGoldApple /= 2;
			var rateBlackHole = 0;
			var rateRedNecker = 0;
			if (useBlackHole) rateBlackHole = (cL - 10) / cL / 25;
			if (useRedNecker) rateRedNecker = (cL - 5) / cL / 18;

			for (let i = 0; i < total; i ++) {
				let r = Math.round(55 + 10 * Math.random());
				let b;
				if (Math.random() < 0.35) b = new Ball(0, 0, r);
				else {
					b = new Poly(0, 0, r);
					r *= (1 + (7 - b.poly) / 10);
					b.r = r;
				}
				b.p = pMin + Math.round(Math.random() * pMax);
				if (Math.random() < rateGoldApple) {
					b.isGolden = true;
				}
				else if (Math.random() < rateBlackHole) {
					b.r = 20;
					b.p = Math.round((level / 10) ** 0.5);
					b.score = b.p;
					b.life = Math.ceil(Math.random() + Math.random() * Math.random() * 5);
					b.isBlackHole = true;
				}
				else if (Math.random() < rateRedNecker) {
					b.isRedNeck = true;
					b.max = b.p;
				}
				results.push(b);
				w -= r * 2;
			}

			var cc = total, delta = 0, l = 0 - results[0].r, ll = 0 - l;
			for (let i = 0; i < total; i ++) {
				let px = Math.round(Math.random() * (w - delta) / cc);
				let py = 1800 + Math.round(Math.random() * 100);
				let b = results[i];
				l += ll + b.r;
				ll = b.r;
				b.x = px + l + delta;
				b.y = py + (isReady ? 0 : 220);
				if (Math.random() > disappear) impedes.push(b);
				delta += px;
				cc --;
			}
		},
	};

	const resize = () => {
		var width = document.body.clientWidth, height = document.body.clientHeight;
		height -= ControllerHeight + 30; // 25 是底部 tail 高度 + margin + padding
		if (!Devices.isMobile) height -= 25;

		var container = document.querySelector('div.viewer.ballcrush');
		container.style.width = width + 'px';

		var w = height / Rate;
		if (w > width) {
			height = width * Rate;
		}
		else {
			width = w;
		}
		var h = height + ControllerHeight;

		container = document.querySelector('div.container.ballcrush');
		container.style.width = width + 'px';
		container.style.height = h + 'px';

		var canvas = container.querySelector('canvas');
		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
		canvas.width = 1000;
		canvas.height = 1000 * Rate;
		canvas._width = width;
		canvas._height = height;
		ctx = canvas.getContext('2d', {alpha: false});
		draw();
	};
	const clearCanvas = () => {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, 1000, 2000);
	};
	const drawFrame = () => {
		ctx.beginPath();
		ctx.moveTo(300, 0);
		ctx.lineTo(0, 0);
		ctx.lineTo(0, 2000);
		ctx.lineTo(1000, 2000);
		ctx.lineTo(1000, 0);
		ctx.lineTo(700, 0);
		ctx.setLineDash([]);
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 5;
		ctx.stroke();
	};
	const drawImpedes = () => {
		impedes.forEach(i => {
			i.draw();
		});
	};
	const drawPlummet = (x, y) => {
		ctx.beginPath();
		ctx.moveTo(500, 0);
		ctx.lineTo(x, y);
		ctx.setLineDash([20, 10]);
		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 4;
		ctx.stroke();
	};
	const drawBall = (x, y, r, c, b, t, p, isBall) => {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fillStyle = c || 'white';
		ctx.fill();
		ctx.setLineDash([]);
		ctx.strokeStyle = b || 'black';
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.fillStyle = t;
		p = p + '';
		var l = p.length;
		if (isBall) {
			ctx.font = '40px Arial';
			ctx.fillText(p, x - l * 12, y + 18);
		}
		else {
			ctx.font = '60px Arial';
			ctx.fillText(p, x - l * 18, y + 20);
		}
	};
	const drawPoly = (x, y, r, n, a, c, b, t, p) => {
		var ang = Math.PI * 2 / n;
		var nx, ny, mx, my;
		ctx.beginPath();
		nx = x + r * Math.sin(a);
		ny = y + r * Math.cos(a);
		ctx.moveTo(nx, ny);
		for (let i = 1; i < n; i ++) {
			mx = x + r * Math.sin(a + ang * i);
			my = y + r * Math.cos(a + ang * i);
			ctx.lineTo(mx, my);
		}
		ctx.lineTo(nx, ny);
		ctx.closePath();
		ctx.fillStyle = c || 'white';
		ctx.fill();
		ctx.setLineDash([]);
		ctx.strokeStyle = b || 'black';
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.fillStyle = t;
		p = p + '';
		var l = p.length;
		ctx.font = '60px Arial';
		ctx.fillText(p, x - l * 18, y + 20);
	};
	const draw = () => {
		clearCanvas();
		drawFrame();
	};
	const generateBalls = (isReady=false) => {
		var b = new Ball(0, 0);
		b.isBall = true;
		if (isReady) {
			b.isGhost = true;
			b.mass = 1;
			b.vx = targetX;
			b.vy = targetY;
			b.x = 500;
			b.y = 0;
			readyBalls.push(b);
		}
		else balls.push(b);
	};
	const prepareBalls = () => {
		if (gameStatus !== 0) return;
		gameStatus = 1;
		needCombine = false;
		current = 0;
		elT.innerHTML = 0;
		readyBalls.push(...(balls.splice(0, balls.length)));
		readyBalls.forEach(b => {
			b.isGhost = true;
			b.mass = 1;
			b.vx = targetX;
			b.vy = targetY;
			b.x = 500;
			b.y = 0;
			b.hits = 0;
			b.updateSize();
		});
		waiting = 0;
	};
	const pickColor = (power, isBall=false) => {
		var c;
		if (isBall) {
			c = ballColorMap[power];
			if (!c) c = ballDefaultColor;
		}
		else {
			c = impedeColorMap[power];
			if (!c) c = impedeDefaultColor;
		}
		return c;
	};
	const updateInfo = () => {
		if (!elS) elS = document.querySelector('div.controller div.info span.total');
		if (!elC) elC = document.querySelector('div.controller div.info span.count');
		if (!elP) elP = document.querySelector('div.controller div.info span.power');
		if (!elT) elT = document.querySelector('div.controller div.info span.current');
		if (!elL) elL = document.querySelector('div.controller div.info span.level');
		elS.innerHTML = score;
		elC.innerHTML = count;
		elP.innerHTML = power;
		elT.innerHTML = current;
		elL.innerHTML = level;
	};
	const ejectBall = (x, y) => {
		if (x === 500 && y === 0) y = 1;
		var vx = x - 500, vy = y - 0;
		var vr = (vx * vx + vy * vy) ** 0.5;
		vx = vx / vr * DefaultVelocity;
		vy = vy / vr * DefaultVelocity;
		targetX = vx;
		targetY = vy;

		prepareBalls();
	};
	const combineBalls = () => {
		var max = 0, remain = 0, total = 0;
		var prev = [];
		balls.forEach((b, i) => {
			if (b.p > max) max = b.p;
			else if (b.p === 1) prev.push(i);
		});
		if (prev.length === 0) return;
		total = Math.floor(prev.length / max);
		remain = prev.length - total * max;
		prev.reverse().forEach(i => balls.splice(i, 1));
		for (let i = 0; i < total; i ++) {
			let b = new Ball(0, 0);
			b.p = max;
			b.isBall = true;
			balls.push(b);
		}
		if (remain > 0) {
			let b = new Ball(0, 0);
			b.p = remain;
			b.isBall = true;
			balls.push(b);
		}

		count = balls.length;
		power = 0;
		balls.forEach(b => power += b.p);
		updateInfo();
	};
	const wallCollide = (x1, y1, x2, y2, target) => {
		// 返回内容：反弹后速度矢量、接触点坐标、发生碰撞的时间序、墙壁序号
		var velocity = { x: 0, y: 0 };
		var touchPoint = { x: 0, y: 0 };
		var rate = 0;
		var wall = '';

		if (x2 <= target.r) {
			velocity.y = target.vy;
			velocity.x = Math.abs(target.vx);
			touchPoint.x = target.r;
			if (x1 <= target.r) {
				rate = 0;
				touchPoint.y = y1;
			}
			else {
				rate = (target.r - x1) / (x2 - x1);
				touchPoint.y = y1 + (y2 - y1) * rate;
			}
			wall = 1;
		}
		else if (x2 >= 1000 - target.r) {
			velocity.y = target.vy;
			velocity.x = 0 - Math.abs(target.vx);
			touchPoint.x = 1000 - target.r;
			if (x1 <= target.r) {
				rate = 0;
				touchPoint.y = y1;
			}
			else {
				rate = (1000 - target.r - x1) / (x2 - x1);
				touchPoint.y = y1 + (y2 - y1) * rate;
			}
			wall = 2;
		}
		else if (!target.isGhost && y2 <= target.r) {
			velocity.x = target.vx;
			velocity.y = Math.abs(target.vy);
			touchPoint.y = target.r;
			if (y1 <= target.r) {
				rate = 0;
				touchPoint.x = x1;
			}
			else {
				rate = (target.r - y1) / (y2 - y1);
				touchPoint.x = x1 + (x2 - x1) * rate;
			}
			wall = 3;
		}
		else return null;
		return [velocity, touchPoint, rate, wall];
	};
	const newLine = (isReady=true) => {
		var result;
		if (ModeSelector.difficult === 0) {
			result = ModeSelector.newLine0(isReady);
		}
		else if (ModeSelector.difficult === 1) {
			result = ModeSelector.newLine1(isReady);
		}
		if (isReady) saveStage();
		return result;
	};
	const moveLine = notFinish => {
		impedes.forEach(imp => imp.y -= 10);
		if (notFinish) return;
		saveStage();
		gameStatus = 0;
	};
	const nextLine = notFinish => {
		level ++;
		var kills = 0;
		impedes = impedes.filter(imp => {
			if (imp.y > 220) {
				if (imp.isBlackHole) {
					imp.life --;
					if (imp.life === 0) {
						imp.isBlackHole = false;
						imp.p = Math.ceil(imp.score * ((level / 10 + 1) ** 0.2));
					}
				}
				return true;
			}
			if (ModeSelector.finish === 1) return false;
			if (!imp.isBlackHole) kills += imp.p;
			return false;
		});
		if (kills > 0) {
			let removes = [];
			balls.some((b, i) => {
				if (b.p <= kills) {
					kills -= b.p;
					b.p = 0;
					removes.push(i);
					return false;
				}
				else {
					b.p -= kills;
					b.updateSize();
					kills = 0;
				}
			});
			if (removes.length > 0) {
		 		removes.reverse().forEach(r => balls.splice(r, 1));
			}
		}
		if (ModeSelector.finish === 1) {
			let l = balls.length;
			balls.sort((ba, bb) => {
				if (ba.p === bb.p) return bb.score - ba.score;
				return bb.p - ba.p;
			});
			if (l < ZenCount) {
				for (let i = l; i < ZenCount; i ++) generateBalls();
			}
			else if (l > ZenCount) {
				balls.splice(ZenCount, l - ZenCount);
			}
		}

		count = balls.length;
		power = 0;
		balls.forEach(b => power += b.p);
		updateInfo();
		if (count === 0) {
			gameOver();
		}
		else {
			newLine(false);
		}
	};
	const gameOver = () => {
		localStorage.removeItem(TagGameSaveName);

		var rankList = localStorage.getItem(TagGameRankList);
		if (!rankList) {
			rankList = {};
		}
		try {
			rankList = JSON.parse(rankList);
		}
		catch {
			rankList = {};
		}
		var list;
		if (ModeSelector.difficult === 0) {
			rankList.normal = rankList.normal || [];
			list = rankList.normal;
		}
		else if (ModeSelector.difficult === 1) {
			rankList.hell = rankList.hell || [];
			list = rankList.hell;
		}
		else {
			list = [];
		}
		list.push({
			stamp: Date.now(),
			level, score
		});
		list.sort((a, b) => b.score - a.score);
		if (list.length > 10) {
			list.splice(10, list.length - 10);
		}
		localStorage.setItem(TagGameRankList, JSON.stringify(rankList))

		let pad = document.querySelector('div.container div.area div.infoPad[name="GameEnd"]');
		var text = '<div class="title"><div>胜败乃兵家常事，<br>大侠请重来一次！</div><ol>';
		text += '<p><span class="date title">时间</span><span class="score title">得分</span><span class="level title">关数</span></p>';
		list.forEach(item => {
			var t = '<li>';
			t += '<span class="date">' + convertTimestamp(item.stamp) + '</span>';
			t += '<span class="score">' + item.score + '</span>';
			t += '<span class="level">' + item.level + '</span>';
			t += '</li>';
			text += t;
		});
		text += '</ol></div>';
		pad.innerHTML = text;
		pad.classList.add('shown');

		gameStatus = 3;
		if (!!timer) clearTimeout(timer);
	};
	const convertTimestamp = stamp => {
		var D = new Date(stamp);
		var y = D.getFullYear() - 2000;
		var m = D.getMonth() + 1;
		var d = D.getDate();
		var result = y + '/' + m + '/' + d + ' ';
		return result;
		y = D.getHours();
		m = D.getMinutes();
		return result + y + ':' + m;
	};
	const saveStage = () => {
		var stage = {
			difficult: ModeSelector.difficult,
			finish: ModeSelector.finish,
			score, current, level
		};
		stage.balls = balls.map(b => b);
		stage.impedes = impedes.map(p => p);

		localStorage.setItem(TagGameSaveName, JSON.stringify(stage));
	};
	const loadStage = () => {
		var stage = localStorage.getItem(TagGameSaveName);
		if (!stage) return false;
		try {
			stage = JSON.parse(stage);
		}
		catch {
			return false;
		}

		ModeSelector.difficult = stage.difficult;
		ModeSelector.finish = stage.finish;
		score = stage.score;
		current = stage.current;
		level = stage.level;

		balls.splice(0, balls.length);
		stage.balls.forEach(b => {
			var ball = new Ball(0, 0);
			for (let prop in b) {
				ball[prop] = b[prop];
			}
			balls.push(ball);
		});
		stage.impedes.forEach(i => {
			var imp;
			if (i.poly >= 0) {
				imp = new Poly(0, 0);
			}
			else {
				imp = new Ball(0, 0);
			}
			for (let prop in i) {
				imp[prop] = i[prop];
			}
			impedes.push(imp);
		});
		return true;
	};
	const gameStart = () => {
		impedes.splice(0, impedes.length);
		if (!loadStage()) {
			score = 0;
			current = 0;
			level = 1;
			newLine();
			if (ModeSelector.finish === 0) {
				generateBalls();
			}
			else if (ModeSelector.finish === 1) {
				for (let i = 0; i < ZenCount; i ++) generateBalls();
			}
		}

		hits = 0;
		count = balls.length;
		power = 0;
		balls.forEach(b => power += b.p);
		updateInfo();

		timer = setTimeout(mainLoop, Duration);
	};
	const normalLoop = delta => {
		if (stamp <= 0) return;

		if (readyBalls.length > 0) {
			if (waiting === 0) {
				activeBalls.push(readyBalls.splice(0, 1)[0]);
				let l = count / 30;
				waiting = Math.round(4 + 6 / (l + 1));
			}
			else {
				waiting --;
			}
		}

		let removes = [];
		let needRedraw = false;
		let zerohitted = false;
		impedes.forEach(imp => {
			if (imp.rotate === 0) return;
			needRedraw = true;
			imp.ang += imp.rotate;
			if (imp.rotate > 0 && imp.ang > Math.PI * 2) imp.ang -= Math.PI * 2;
			else if (imp.rotate < 0 && imp.ang < -Math.PI * 2) imp.ang += Math.PI * 2;
		});
		activeBalls.forEach((ball, index) => {
			var [move, redraw, killed, golden] = ball.move(delta);
			if (killed) {
				balls.push(ball);
				removes.push(index);
				if (redraw) {
					needRedraw = true;
				}
			}
			else {
				if (move) {
					ball.draw();
					if (redraw) {
						needRedraw = true;
					}
					if (golden) {
						needCombine = true;
						let b = new Ball(0, 0);
						b.isBall = true;
						b.isGhost = true;
						b.mass = 1;
						b.vx = targetX;
						b.vy = targetY;
						b.x = 500;
						b.y = 0;
						b.p = ball.p;
						readyBalls.push(b);
					}
				}
				else {
					let alive = true;
					if (ball.hits === 0) {
						if (ball.score <= 0) {
							ball.p --;
							if (ball.p <= 0) {
								ball.p = 0;
								alive = false;
							}
						}
						ball.score = 0;
						zerohitted = true;
					}
					if (alive && ball.p > 0) {
						balls.push(ball);
					}
					removes.push(index);
				}
			}
		});
		removes.reverse().forEach(b => activeBalls.splice(b, 1));
		if (activeBalls.length === 0) {
			if (impedes.length === 0) {
				zerohitted = true;
				balls.forEach(b => {
					hits += b.p;
					b.score += b.p;
				});
			}
			gameStatus = 2;
		}
		if (needRedraw) {
			drawImpedes();
		}
		if (needRewrite || zerohitted) {
			count = balls.length + readyBalls.length + activeBalls.length;
			power = 0;
			balls.forEach(b => power += b.p);
			readyBalls.forEach(b => power += b.p);
			activeBalls.forEach(b => power += b.p);
			updateInfo();
		}
	};
	const mainLoop = () => {
		clearCanvas();
		drawPlummet(px, py);
		drawImpedes();

		var now = Date.now();
		if (stamp > 0) {
			let delta = now - stamp;
			if (ModeSelector.finish === 0) delta = Step;
			else delta *= Step / Duration;
			delta /= 1000;

			if (gameStatus === 1) {
				normalLoop(delta);
				stamp = now;
			}
			else if (gameStatus === 2) {
				if (needCombine) combineBalls();
				nextLine();
				if (gameStatus === 2) {
					waiting = 21;
					gameStatus = 4;
					moveLine(true);
				}
			}
			else if (gameStatus === 4) {
				waiting --;
				moveLine(waiting >= 0);
				stamp = now;
			}
			else {
				stamp = 0;
			}
		}
		else {
			stamp = now;
		}

		drawFrame();

		if (gameStatus !== 3) timer = setTimeout(mainLoop, Duration);
	};
	const onLeave = () => {
		gameStatus = 3;
		if (!!timer) clearTimeout(timer);
		localStorage.removeItem(TagGameSaveName);
		balls.splice(0, balls.length);
		readyBalls.splice(0, readyBalls.length);
		activeBalls.splice(0, activeBalls.length);
		padMode.classList.add('shown');
	};
	const init = () => {
		resize();

		document.querySelector('div.container div.infoPad div.modeList div.mode[mode="back"]').addEventListener('click', evt => {
			location.href = '/#/category?c=entertain';
		});

		var canvas = document.querySelector('div.container canvas');
		canvas.addEventListener('mousemove', evt => {
			var x = evt.offsetX / canvas._width * 1000;
			var y = evt.offsetY / canvas._height * 2000;
			px = x;
			py = y;
		});
		canvas.addEventListener('touchmove', evt => {
			if (evt.touches.length === 0) return;
			var touch = evt.touches[evt.touches.length - 1];
			var rect = canvas.getBoundingClientRect();

			var x = (touch.clientX - rect.x) / canvas._width * 1000;
			var y = (touch.clientY - rect.y) / canvas._height * 2000;
			px = x;
			py = y;
			evt.preventDefault();
		});
		canvas.addEventListener('click', evt => {
			var x = evt.offsetX / canvas._width * 1000;
			var y = evt.offsetY / canvas._height * 2000;
			ejectBall(x, y);
		});
		canvas.addEventListener('touchstart', evt => {
			if (evt.touches.length === 0) return;
			var touch = evt.touches[evt.touches.length - 1];
			var rect = canvas.getBoundingClientRect();

			var x = (touch.clientX - rect.x) / canvas._width * 1000;
			var y = (touch.clientY - rect.y) / canvas._height * 2000;
			px = x;
			py = y;
			evt.preventDefault();
		});
		canvas.addEventListener('touchend', evt => {
			ejectBall(px, py);
			evt.preventDefault();
		});

		impedeDefaultColor = 'rgb(' + ImpedeColor[ImpedeColor.length - 1][1].join(',') + ')';
		var ci = 0, max = ImpedeColor[ImpedeColor.length - 1][0];
		for (let i = 0; i <= max; i ++) {
			let info = ImpedeColor[ci];
			let color = info[1];
			if (i === info[0]) {
				color = 'rgb(' + color.join(',') + ')';
				ci ++;
			}
			else {
				let min = ImpedeColor[ci - 1];
				let rate = (i - min[0]) / (info[0] - min[0]);
				min = min[1];
				let r = [];
				r[0] = Math.round((color[0] - min[0]) * rate + min[0]);
				r[1] = Math.round((color[1] - min[1]) * rate + min[1]);
				r[2] = Math.round((color[2] - min[2]) * rate + min[2]);
				color = 'rgb(' + r.join(',') + ')';
			}
			impedeColorMap[i] = color;
		}

		ballDefaultColor = 'rgb(' + BallColor[BallColor.length - 1][1].join(',') + ')';
		ci = 0;
		max = BallColor[BallColor.length - 1][0];
		for (let i = 0; i <= max; i ++) {
			let info = BallColor[ci];
			let color = info[1];
			if (i === info[0]) {
				color = 'rgb(' + color.join(',') + ')';
				ci ++;
			}
			else {
				let min = BallColor[ci - 1];
				let rate = (i - min[0]) / (info[0] - min[0]);
				min = min[1];
				let r = [];
				r[0] = Math.round((color[0] - min[0]) * rate + min[0]);
				r[1] = Math.round((color[1] - min[1]) * rate + min[1]);
				r[2] = Math.round((color[2] - min[2]) * rate + min[2]);
				color = 'rgb(' + r.join(',') + ')';
			}
			ballColorMap[i] = color;
		}

		padEnd.addEventListener('click', () => {
			padEnd.classList.remove('shown');
			padMode.classList.add('shown');
		});
		padMode.addEventListener('click', evt => {
			evt = evt.target;
			var mode = evt.getAttribute('mode');
			if (!mode) return;

			if (mode === 'normal') {
				ModeSelector.difficult = 0;
				ModeSelector.finish = 0;
			}
			else if (mode === 'hell') {
				ModeSelector.difficult = 1;
				ModeSelector.finish = 0;
			}
			else if (mode === 'normalZen') {
				ModeSelector.difficult = 0;
				ModeSelector.finish = 1;
			}
			else if (mode === 'hellZen') {
				ModeSelector.difficult = 1;
				ModeSelector.finish = 1;
			}
			else return;

			padEnd.classList.remove('shown');
			padMode.classList.remove('shown');
			gameStatus = 0;
			gameStart();
		});
	};

	window.onresize = resize;
	window.BallCrush = {
		init,
		onLeave
	};
}) ();