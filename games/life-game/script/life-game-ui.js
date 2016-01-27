/*
 * Based on VUE.js and ES6
 */

(function (root) {
	"use strict";

	// Commont
	root.LifeGame = root.LifeGame || {};

	root.CommonUtils = root.CommonUtils || {};
	const mEventPool = new WeakMap();
	class EventManager {
		constructor () {
			var pool = {};
			mEventPool.set(this, pool);
		}
		emit (event, ...args) {
			if (event === 'emit' || event === 'hook') return;
			var pool = mEventPool.get(this);
			if (!pool) return;
			pool = pool[event];
			if (!pool) return;
			pool.forEach((callback) => callback.apply(lifeController, args));
		}
		hook (event, callback) {
			if (event === 'emit' || event === 'hook') return;
			var pool = mEventPool.get(this);
			if (!pool) return;
			if (!pool[event]) {
				pool[event] = new Set();
			}
			pool = pool[event];
			if (pool.has(callback)) return;
			pool.add(callback);
		}
	}
	root.CommonUtils.EventManager = EventManager;

	var saveSetting = (options) => {
		Object.keys(options).map(function (key) {
			root.localStorage[key] = options[key];
		});
	};
	var restoreSetting = () => {
		if (root.localStorage.width) data.width.value = root.localStorage.width * 1;
		if (root.localStorage.height) data.height.value = root.localStorage.height * 1;
		if (root.localStorage.size) data.size.value = root.localStorage.size * 1;
		if (root.localStorage.duration) data.delay.value = root.localStorage.duration * 1;
		if (root.localStorage.cycle) data.cycle.value = root.localStorage.cycle === 'true';
	};

	// Controller
	var data = {
		start  : { title: '开始', class: "button", action: 'start' },
		clear  : { title: '清空', class: "button", disable: false, action: 'clear' },
		line1  : { type: 'line' },
		width  : { title: '横向', type: 'number', value: 10 },
		height : { title: '纵向', type: 'number', value: 10 },
		size   : { title: '尺寸', type: 'number', value: 30 },
		line2  : { type: 'line' },
		delay  : { title: '时隔', type: 'number', value: 500 },
		cycle  : { title: '循环', type: 'checkbox', value: false },
		line3  : { type: 'line' },
		reset  : { title: '设置', class: "button", disable: false, action: 'reset' },
	};
	restoreSetting();

	var vControler = new Vue ({
		el: "#controller",
		data: {
			categories: data
		},
		methods: {
			onclick: (action) => {
				if (!action) return;
				switch (action) {
					case 'start':
						if (running) lifeController.turnOff();
						else lifeController.turnOn();
						break;
					case 'clear':
						controllerEvents.emit("clear");
						break;
					case 'reset':
						var options = lifeController.options;
						saveSetting(options);
						controllerEvents.emit("reset", options);
						break;
				}
			}
		}
	});

	var running = false;
	var controllerEvents = new EventManager();
	var lifeController = {
		get running () {
			return running;
		},
		get options () {
			var option = {
				width   : Math.floor(data.width.value || 10),
				height  : Math.floor(data.height.value || 10),
				size    : Math.floor(data.size.value || 10),
				duration: Math.floor(data.delay.value || 500),
				cycle   : data.cycle.value,
			};
			if (option.width < 1) option.width = 1;
			if (option.height < 1) option.height = 1;
			if (option.size < 1) option.size = 1;
			if (option.duration < 1) option.duration = 1;
			return option;
		},
	};

	// Methods
	lifeController.turnOn = () => {
		if (running) return;
		data.start.title = "暂停";
		data.clear.disable = true;
		data.reset.disable = true;
		running = true;
		controllerEvents.emit("start");
	};
	lifeController.turnOff = () => {
		if (!running) return;
		data.start.title = "开始";
		data.clear.disable = false;
		data.reset.disable = false;
		running = false;
		controllerEvents.emit("pause");
	};

	// Events
	lifeController.onStart = (callback) => controllerEvents.hook('start', callback);
	lifeController.onPause = (callback) => controllerEvents.hook('pause', callback);
	lifeController.onClear = (callback) => controllerEvents.hook('clear', callback);
	lifeController.onReset = (callback) => controllerEvents.hook('reset', callback);

	// Export
	root.LifeGame.Controller = lifeController;

	// Field
	var fieldData = {
		size : 10,
		grids: [[0, 0], [0, 1]],
		frame: {
			width: '100px',
			height: '100px'
		}
	};
	var vField = new Vue ({
		el  : "#field",
		data: fieldData,
		methods: {
			selectGrid: (x, y) => troggleGrid(x, y),
		}
	});

	var gaming = false;
	var gridGroupUI = null, gridGroupWidth = 1, gridGroupHeight = 1, gridGroupSize = 10;
	var getGridByLocation = (x, y) => {
		return {
			data: LifeGame.Core.getLifeByLocation(x, y),
			view: gridGroupUI[x * gridGroupWidth + y],
		}
	}
	var initGrids = (w, h) => {
		var core = root.LifeGame.Core;
		core.initGrid(w, h);
	};
	var initUI = (options) => {
		var container = $(vField.$el).find('.frame');
		gridGroupWidth = options.width;
		gridGroupHeight = options.height;
		gridGroupSize = options.size;
		fieldData.frame.width = (gridGroupSize + 2) * gridGroupWidth;
		fieldData.frame.height = (gridGroupSize + 2) * gridGroupHeight;
		var grids = [];
		for (let i = 0; i < gridGroupWidth; i++) {
			for (let j = 0; j < gridGroupHeight; j++) {
				grids.push([i, j]);
			}
		}
		grids.unshift(0, fieldData.grids.length);
		fieldData.grids.splice.apply(fieldData.grids, grids);
		fieldData.size = gridGroupSize;
		vField.$nextTick(() => {
			gridGroupUI = [];
			container.find('.grid').each((index, grid) => gridGroupUI.push($(grid)));
			initGrids(gridGroupWidth, gridGroupHeight);
		});
	};
	var resetUI = () => {
		initGrids(gridGroupWidth, gridGroupHeight);
		gridGroupUI.map((grid) => grid.removeClass('active'));
	};

	var troggleGrid = (x, y) => {
		if (gaming) return;
		var grid = getGridByLocation(x, y);
		var view = grid.view;
		grid = grid.data;
		if (grid.alive) {
			view.removeClass('active');
			grid.die();
		}
		else {
			view.addClass('active');
			grid.birth();
		}
	};
	var updateUI = (map) => {
		if (!map) map = LifeGame.Core.getLifeMap();
		map.forEach((alive, index) => {
			if (alive) gridGroupUI[index].addClass('active');
			else gridGroupUI[index].removeClass('active');
		});
	};

	var LifeGameUI = {};
	LifeGameUI.start = () => {
		if (gaming) return;
		gaming = true;
		LifeGame.Core.start(updateUI);
	};
	LifeGameUI.stop = () => {
		if (!gaming) return;
		gaming = false;
		LifeGame.Core.pause();
	};
	LifeGameUI.clear = () => {
		if (gaming) return;
		resetUI();
	};
	LifeGameUI.reset = (options) => {
		if (gaming) return;
		initUI(options);
		LifeGame.Core.setLoopDelay(options.duration);
		LifeGame.Core.cycleSpace = !!options.cycle;
	};

	// Export
	root.LifeGame.FieldUI = LifeGameUI;

	// Initial Events
	lifeController.onStart(() => {
		LifeGameUI.start();
	});
	lifeController.onPause(() => {
		LifeGameUI.stop();
	});
	lifeController.onClear(() => {
		LifeGameUI.clear();
	});
	lifeController.onReset((options) => {
		LifeGameUI.reset(options);
	});
}) (window);