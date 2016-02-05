/*
 * Based on VUE.js and ES6
 */

((root) => {
	"use strict";

	// Commont
	root.LifeGame = root.LifeGame || {};

	const EventManager = root.CommonUtils.EventManager;
	const modalShow = root.CommonUtils.modalShow;
	const modalHide = root.CommonUtils.modalHide;

	// Setting Manager
	var saveSetting = (options) => {
		Object.keys(options).map(function (key) {
			root.localStorage[key] = options[key];
		});
		if (!isNaN(LifeGame.Core.mutateFactor)) root.localStorage.mutateFactor = LifeGame.Core.mutateFactor;
	};
	var restoreSetting = () => {
		data.quantum.value = root.localStorage.quantum === 'true';
		if (root.localStorage.width) data.width.value = root.localStorage.width * 1;
		if (root.localStorage.height) data.height.value = root.localStorage.height * 1;
		if (root.localStorage.size) data.size.value = root.localStorage.size * 1;
		if (root.localStorage.duration) data.delay.value = root.localStorage.duration * 1;
		data.cycle.value = root.localStorage.cycle === 'true';
		data.mutate.value = root.localStorage.mutate === 'true';
		data.mutable.disable = !data.mutate.value;
		if (root.localStorage.mutateFactor && LifeGame.Core) LifeGame.Core.mutateFactor = root.localStorage.mutateFactor * 1;
		data.breaker.value = root.localStorage.breaker === 'true';
		data.aging.value = root.localStorage.aging === 'true';
		data.lifeage.disable = !data.aging.value;
		if (root.localStorage.ageLimit && LifeGame.Core) LifeGame.Core.ageLimit = root.localStorage.ageLimit * 1;
		data.rndwar.value = root.localStorage.randomFight === 'true';
		if (LifeGame.Core) LifeGame.Core.randomFight = data.rndwar.value;
	};

	// Introduction
	new Vue({
		el: 'section.introduction',
		data: {
			hide: true
		}
	});

	// Modals
	var modalGenePannelData = {
		// quantum: { title: '隐相位决策', value: false, type: 'checkbox' },
		friends: { title: '留存同伴数', value: "2, 3, 4" },
		overpop: { title: '留存生命数', value: "1, 2, 3" },
		rebirth: { title: '衍生同伴数', value: "3" },
		actions: { title: '　决策系数', value: "1, 2, 3, 4, 5, 6, 7, 8, 9", hidden: true },
		submit : { title: '确定', type: 'button', action: 'submit', target: 'genePannel' },
	};
	var convertStringToArray = (array) => {
		var result = array.split(',')
			.map((i) => i.trim() * 1)
			.filter((i) => !isNaN(i));
		return result;
	};
	new Vue ({
		el: '#genePannelContent',
		data: {
			items: modalGenePannelData
		},
		methods: {
			click: (action, target) => {
				var new_gene = {};
				new_gene.friends = convertStringToArray(modalGenePannelData.friends.value);
				new_gene.overpop = convertStringToArray(modalGenePannelData.overpop.value);
				new_gene.rebirth = convertStringToArray(modalGenePannelData.rebirth.value);
				new_gene.actions = convertStringToArray(modalGenePannelData.actions.value);
				LifeGame.Core.redesignGene(new_gene);
				modalHide('#' + target);
			}
		}
	});
	var changeGene = () => {
		var gene = LifeGame.Core.GenePool[LifeGame.Core.currentLifeType].gene;
		modalGenePannelData.friends.value = gene.friends.join(', ');
		modalGenePannelData.overpop.value = gene.overpop.join(', ');
		modalGenePannelData.rebirth.value = gene.rebirth.join(', ');
		if (!!gene.actions) {
			modalGenePannelData.actions.hidden = false;
			modalGenePannelData.actions.value = gene.actions.join(', ');
		}
		else {
			modalGenePannelData.actions.hidden = true;
		}
		modalShow('#genePannel');
	};

	var modalGenePoolData = [];
	new Vue({
		el: '#genePoolContent',
		data: {
			items: modalGenePoolData
		},
		methods: {
			click: (index) => {
				modalGenePoolData.forEach((info, i) => modalGenePoolData[i].selected = i === index);
				LifeGame.Core.currentLifeType = index;
			},
			pickColor: (index) => {
				modalGenePoolData.forEach((info, i) => modalGenePoolData[i].selected = i === index);
				var checkbox = $('#genePoolContent .item input');
				checkbox.each((index, input) => {
					input.checked = false;
				});
				checkbox[index].checked = true;
				LifeGame.Core.currentLifeType = index;
				pickColorForGene(index);
			},
			addnew: () => {
				var gene = 		{
					color: 'rgb(255, 127, 127)',
					gene: {
						rebirth: [3],
						friends: [0, 1, 2, 3],
						overpop: [2, 3, 4, 5],
						actions: [0, 0, 0, 0, 1, 1, 2, 2, 3],
					}
				};
				LifeGame.Core.GenePool.push(gene);
				modalGenePoolData.push({
					color: gene.color,
					selected: false,
				});
			},
			delete: () => {
				if (LifeGame.Core.GenePool.length < 2) return;
				LifeGame.Core.GenePool.splice(LifeGame.Core.currentLifeType, 1);
				modalGenePoolData.splice(LifeGame.Core.currentLifeType, 1);
				if (LifeGame.Core.currentLifeType >= LifeGame.Core.GenePool.length) {
					LifeGame.Core.currentLifeType = LifeGame.Core.GenePool.length - 1;
				}
				modalGenePoolData[LifeGame.Core.currentLifeType].selected = true;
			}
		}
	});
	var showGenePool = () => {
		modalGenePoolData.splice(0, modalGenePoolData.length);
		LifeGame.Core.GenePool.map((info) => {
			modalGenePoolData.push({
				color: info.color,
				selected: false,
			});
		});
		modalGenePoolData[LifeGame.Core.currentLifeType].selected = true;
		modalShow('#genePool');
	};

	var modalMutatePannelData = {
		mutate: { title: '变异系数', value: 0.1 },
		submit : { title: '确定', type: 'button', action: 'submit', target: 'mutatePannel' },
	};
	new Vue ({
		el: '#mutatePannelContent',
		data: {
			items: modalMutatePannelData
		},
		methods: {
			click: (action, target) => {
				LifeGame.Core.mutateFactor = modalMutatePannelData.mutate.value;
				root.localStorage.mutateFactor = LifeGame.Core.mutateFactor;
				modalHide('#' + target);
			}
		}
	});
	var changeMutate = () => {
		modalMutatePannelData.mutate.value = LifeGame.Core.mutateFactor;
		modalShow('#mutatePannel');
	};

	var modalAgePannelData = {
		age: { title: '寿命上限', value: 100 },
		submit : { title: '确定', type: 'button', action: 'submit', target: 'agePannel' },
	};
	new Vue ({
		el: '#agePannelContent',
		data: {
			items: modalAgePannelData
		},
		methods: {
			click: (action, target) => {
				LifeGame.Core.ageLimit = modalAgePannelData.age.value;
				root.localStorage.ageLimit = LifeGame.Core.ageLimit;
				modalHide('#' + target);
			}
		}
	});
	var changeAge = () => {
		modalAgePannelData.age.value = LifeGame.Core.ageLimit;
		modalShow('#agePannel');
	};

	var pickColorData = {
		red: 100,
		green: 200,
		blue: 50
	};
	new Vue ({
		el: '#colorPickerPannel',
		data: pickColorData,
		methods: {
			close: () => {
				var color = 'rgb(' + pickColorData.red + ',' + pickColorData.green + ',' + pickColorData.blue + ')';
				LifeGame.Core.GenePool[LifeGame.Core.currentLifeType].color = color;
				$('#genePoolContent .item .color-picker')[LifeGame.Core.currentLifeType].style.backgroundColor = color;
				modalHide('#colorPicker');
			}
		}
	});
	var pickColorForGene = (index) => {
		var life = LifeGame.Core.GenePool[index];
		if (!life) return;
		var color = life.color.replace('rgb(', '').replace(')', '').split(',');
		pickColorData.red = (color[0] * 1) || 0;
		pickColorData.green = (color[1] * 1) || 0;
		pickColorData.blue = (color[2] * 1) || 0;
		modalShow('#colorPicker');
	};

	// Modal Frame
	var modalData = {
		genePool : { id: 'genePool', title: '基因池', target: 'genePoolContent' },
		genePannel : { id: 'genePannel', title: '修改基因', target: 'genePannelContent' },
		mutatePannel : { id: 'mutatePannel', title: '修改变异系数', target: 'mutatePannelContent' },
		agePannel : { id: 'agePannel', title: '修改寿命上限', target: 'agePannelContent' },
		staticsPannel : { id: 'staticsPannel', title: '留存基因统计', target: 'staticsPannelContent' },
		colorPicker : { id: 'colorPicker', title: '选颜色', target: 'colorPickerPannel' },
	};
	new Vue ({
		el: '.modal',
		data: {
			modals: modalData
		},
		methods: {
			close: (target) => {
				modalHide('#' + target);
			}
		}
	});
	$('.modal .content[data-target]').each((index, modal) => {
		modal = $(modal);
		var target = modal.data('target');
		target = $('#' + target);
		if (target.length === 0) return;
		modal.replaceWith(target);
	});

	// Controller
	var data = {
		start  : { title: '开始', class: "button", action: 'start' },
		clear  : { title: '清空', class: "button", disable: false, action: 'clear' },
		line1  : { type: 'line' },
		rndwar : { title: '随机争斗', type: 'checkbox', value: false },
		quantum: { title: '隐相位决策', type: 'checkbox', value: false },
		line7  : { type: 'line' },
		width  : { title: '横向', type: 'number', value: 10 },
		height : { title: '纵向', type: 'number', value: 10 },
		size   : { title: '尺寸', type: 'number', value: 30 },
		line2  : { type: 'line' },
		delay  : { title: '时隔', type: 'number', value: 500 },
		cycle  : { title: '循环', type: 'checkbox', value: false },
		line3  : { type: 'line' },
		group  : { title: '基因池', class: 'button', disable: false, action: 'showGenePool' },
		gene   : { title: '修改基因', class: 'button', disable: false, action: 'changeGene' },
		mutate : { title: '允许变异', type: 'checkbox', value: false },
		mutable: { title: '变异参数', class: 'button', disable: true, action: 'changeMutate' },
		aging  : { title: '有限寿命', type: 'checkbox', value: false },
		lifeage: { title: '寿命上限', class: 'button', disable: true, action: 'changeAge' },
		line4  : { type: 'line' },
		breaker: { title: '自动停止', type: 'checkbox', value: false },
		line5  : { type: 'line' },
		reset  : { title: '设置', class: "button", disable: false, action: 'reset' },
		line6  : { type: 'line' },
		statics: { title: '基因统计', class: "button", action: 'showStatics' },
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
					case 'changeGene':
						changeGene();
						break;
					case 'changeMutate':
						changeMutate();
						break;
					case 'showStatics':
						showStatics();
						break;
					case 'changeAge':
						changeAge();
						break;
					case 'showGenePool':
						showGenePool();
						break;
				}
			}
		}
	});
	vControler.$watch('categories.quantum.value', (newValue, oldValue) => {
		root.localStorage.quantum = newValue;
		if (newValue) LifeGame.Core.useQuantum();
		else LifeGame.Core.useClassic();
		resetUI();
	});
	vControler.$watch('categories.mutate.value', (newValue, oldValue) => {
		data.mutable.disable = !newValue;
		root.localStorage.mutate = newValue;
		LifeGame.Core.allowMutate = newValue;
	});
	vControler.$watch('categories.aging.value', (newValue, oldValue) => {
		data.lifeage.disable = !newValue;
		root.localStorage.aging = newValue;
		LifeGame.Core.limitedAge = newValue;
	});
	vControler.$watch('categories.rndwar.value', (newValue, oldValue) => {
		root.localStorage.randomFight = newValue;
		LifeGame.Core.randomFight = newValue;
	});
	vControler.$watch('categories.breaker.value', (newValue, oldValue) => {
		root.localStorage.breaker = newValue;
		LifeGame.Core.autoStop = newValue;
	});

	var showStatics = () => {
		var result = LifeGame.Core.statistics();
		if (result.length === 0) return;
		var pannel = $('#staticsPannelContent');
		var content = "";
		result.forEach((record, index) => {
			content += '<div class="item record">';
			content += '<div class="title">第' + (index + 1) + '位：</div>';
			content += '<div class="lemma">生命数：' + record[0] + '</div>';
			content += '<div class="lemma">战斗力：' + record[1] + '</div>';
			content += '<div class="lemma">基因组：' + record[2] + '</div>';
			content += '<div class="lemma">表现型：' + record[3] + '</div>';
			content += '</div>';
		});
		pannel.html(content);
		modalShow('#staticsPannel');
	};

	var running = false;
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
				mutate  : data.mutate.value,
			};
			if (option.width < 1) option.width = 1;
			if (option.height < 1) option.height = 1;
			if (option.size < 1) option.size = 1;
			if (option.duration < 1) option.duration = 1;
			return option;
		},
	};
	var controllerEvents = new EventManager(lifeController);

	// Methods
	lifeController.turnOn = () => {
		if (running) return;
		data.start.title = "暂停";
		data.clear.disable = true;
		data.reset.disable = true;
		data.gene.disable = true;
		running = true;
		controllerEvents.emit("start");
	};
	lifeController.turnOff = () => {
		if (!running) return;
		data.start.title = "开始";
		data.clear.disable = false;
		data.reset.disable = false;
		data.gene.disable = false;
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
		return gridGroupUI[x * gridGroupWidth + y];
	};
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
		gridGroupUI.map((grid) => grid.removeClass('active').css({'background-color': ''}));
	};

	var troggleGrid = (x, y) => {
		var view = getGridByLocation(x, y);
		var grid = LifeGame.Core.toggleLife(x, y);
		if (grid.alive) {
			view.addClass('active');
		}
		else {
			view.removeClass('active');
		}
		view.css({'background-color': grid.color});
	};
	var updateUI = (map) => {
		if (!map) map = LifeGame.Core.getLifeMap();
		map.forEach((info, index) => {
			if (info.alive) {
				gridGroupUI[index].addClass('active');
			}
			else {
				gridGroupUI[index].removeClass('active');
			}
			gridGroupUI[index].css({'background-color': info.color});
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
		LifeGame.Core.allowMutate = !!options.mutate;
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

	$('body').on('keydown', (e) => {
		if (e.which === 13) {
			if (running) lifeController.turnOff();
			else lifeController.turnOn();
		}
		else if (e.which === 27) {
			$('.modal.active').each((i, modal)=> modalHide('#' + modal.id));
		}
	});
}) (window);