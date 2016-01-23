(function (root) {
	const dPI = 2 * Math.PI;
	function LifeGame (selector) {
		var self = this;
		var running = false;

		// UIs
		this.container = $(selector);
		this.frame = $('<div class="frame">').appendTo(this.container);
		this.container[0].widget = this;

		// Init
		this.options = {};
		this.options.mode = this.container.data('mode') || 'classic';
		this.options.grid = this.container.data('grid') || 10;
		this.options.length = this.container.data('length') || 50;
		this.options.duration = this.container.data('duration') || 250;
		this.options.phaseDelta = this.container.data('phase-delta') || 0.1; // For Quantom
		this.frame.css({
			width: self.options.grid * (self.options.length + 2),
			height: self.options.grid * (self.options.length + 2),
		});
		this.grids = [];
		(function (container, grid, size) {
			var g, i, j, opt, _size = size + 'px';
			for (i = 0; i < grid; i++) {
				for (j = 0; j < grid; j++) {
					opt = {};
					opt.width = _size;
					opt.height = _size;
					opt.left = (i * (size + 2) + 1) + 'px';
					opt.top = (j * (size + 2) + 1) + 'px';
					g = $('<div class="grid">')
						.appendTo(container)
						.data('x', i)
						.data('y', j)
						.data('alive', false)
						.data('phase', 0)
						.css(opt);
					self.grids.push(g);
				}
			}
		}) (this.frame, this.options.grid, this.options.length);
		this.buttons = {};
		this.buttons.close = $('<div class="close"><i class="fa fa-times-circle"></i></div>').appendTo(this.container);
		this.buttons.start = $('<div class="start">启动</div>').appendTo(this.container);
		this.requestStop = false;

		// Private Methods

		// Methods
		this.stop = function () {
			running = false;
			self.buttons.start.html('启动');
		};

		// Events
		this.buttons.close.on('click', function () {
			self.hide();
		});
		this.buttons.start.on('click', function () {
			if (running) {
				self.requestStop = true;
				return;
			}
			running = true;
			self.requestStop = false;
			self.buttons.start.html('停止');
			if (self.options.mode === "quantum") {
				self.runQuantum();
			}
			else {
				self.runClassic();
			}
		});
		this.frame.on('click', '.grid', function (e) {
			if (running) return;
			var grid = $(e.target);
			if (grid.hasClass('alive')) {
				grid.removeClass('alive');
				grid.data('alive', false);
			}
			else {
				grid.addClass('alive');
				grid.data('alive', true);
			}
		});
	}
	LifeGame.prototype.show = function () {
		this.container.addClass('show');
	};
	LifeGame.prototype.hide = function () {
		this.container.removeClass('show');
		this.grids.map(function (g) {
			g.data('alive', false)
			.data('phase', 0)
			.removeClass('alive');
		});
	};
	LifeGame.prototype.getGrid = function (x, y) {
		return this.grids[x * this.options.grid + y];
	};
	LifeGame.prototype.getNeighbor = function (x, y) {
		var xa = x, xb = x, ya = y, yb = y;
		var neighbor = [], i, j;
		if (x > 0) xa--;
		if (x < this.options.grid - 1) xb++;
		if (y > 0) ya--;
		if (y < this.options.grid - 1) yb++;
		for (i = xa; i <= xb; i++) {
			for (j = ya; j<= yb; j++) {
				if (i === x && j === y) continue;
				neighbor.push(this.getGrid(i, j));
			}
		}
		return neighbor;
	};
	LifeGame.prototype.runClassic = function () {
		var self = this;
		var map = [], i, j, grid = this.options.grid;
		var keep, alive, neighbor;
		for (i = 0; i < grid; i++) {
			map[i] = [];
			for (j = 0; j < grid; j++) {
				alive = this.getGrid(i, j).data('alive');
				neighbor = this.getNeighbor(i, j).filter(function (g) {return g.data('alive');}).length;
				if (alive) {
					if (neighbor === 2 || neighbor === 3) {
						keep = true;
					}
					else {
						keep = false;
					}
				}
				else {
					if (neighbor === 3) {
						keep = true;
					}
					else {
						keep = false;
					}
				}
				map[i][j] = keep;
			}
		}
		alive = 0
		for (i = 0; i < grid; i++) {
			for (j = 0; j < grid; j++) {
				neighbor = this.getGrid(i, j);
				keep = map[i][j];
				neighbor.data('alive', keep);
				if (keep) {
					alive++;
					neighbor.addClass('alive');
				}
				else {
					neighbor.removeClass('alive');
				}
			}
		}
		if (this.requestStop || alive === 0) {
			self.stop();
		}
		else {
			setTimeout(function () {
				self.runClassic();
			}, self.options.duration);
		}
	};
	LifeGame.prototype.runQuantum = function () {
		var self = this;
		var map = [], i, j, grid = this.options.grid, delta = this.options.phaseDelta;
		var keep, alive, neighbor, phase, node;
		for (i = 0; i < grid; i++) {
			map[i] = [];
			for (j = 0; j < grid; j++) {
				node = this.getGrid(i, j);
				alive = node.data('alive');
				neighbor = this.getNeighbor(i, j).filter(function (g) {return g.data('alive');});
				map[i][j] = neighbor;
				if (!alive) continue;
				phase = node.data('phase') + (8 - neighbor.length) * delta;
				if (phase > dPI) phase -= dPI;
				node.data('phase', phase);
			}
		}
		for (i = 0; i < grid; i++) {
			for (j = 0; j < grid; j++) {
				alive = this.getGrid(i, j).data('alive');
				neighbor = {x: 0, y: 0};
				map[i][j].map(function (g) {
					var phase = g.data('phase');
					neighbor.x += Math.cos(phase);
					neighbor.y += Math.sin(phase);
				});
				neighbor = Math.sqrt(neighbor.x * neighbor.x + neighbor.y * neighbor.y);
				if (alive) {
					if (neighbor >= 1.5 && neighbor <= 3.5) {
						keep = true;
					}
					else {
						keep = false;
					}
				}
				else {
					if (neighbor >= 2.5 && neighbor <= 3.5) {
						keep = true;
					}
					else {
						keep = false;
					}
				}
				map[i][j] = keep;
			}
		}
		alive = 0
		for (i = 0; i < grid; i++) {
			for (j = 0; j < grid; j++) {
				neighbor = this.getGrid(i, j);
				keep = map[i][j];
				neighbor.data('alive', keep);
				if (keep) {
					alive++;
					neighbor.addClass('alive');
				}
				else {
					neighbor.removeClass('alive');
					neighbor.data('phase', 0);
				}
			}
		}
		if (this.requestStop || alive === 0) {
			self.stop();
		}
		else {
			setTimeout(function () {
				self.runQuantum();
			}, self.options.duration);
		}
	};

	root.LifeGame = LifeGame;
}) (window);