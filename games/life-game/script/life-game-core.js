((root) => {
	"use strict";

	var ageLimit;
	var LifeGameCore = {
		get currentLife () {
			return gene;
		}
	};
	Object.defineProperty(LifeGameCore, 'ageLimit', {
		get: () => ageLimit,
		set: (value) => {
			if (gene) {
				if (LifeGameCore.limitedAge) gene.AgeLimit = value;
				else gene.AgeLimit = -1;
			}
			ageLimit = value;
		}
	});

	var gene = null;
	var grids = null;
	var gridWidth = 0;
	var gridHeight = 0;

	var mapAllLife = (callback) => {
		for (let i = 0; i < gridWidth; i++) {
			for (let j = 0; j < gridHeight; j++) {
				if (callback) callback(grids[i][j], i, j);
			}
		}
	};

	LifeGameCore.initGene = (newGene) => {
		gene = newGene;
		if (LifeGameCore.limitedAge) gene.AgeLimit = LifeGameCore.ageLimit;
		else gene.AgeLimit = -1;
	};
	LifeGameCore.initGrid = (w, h) => {
		gridWidth = w;
		gridHeight = h;
		grids = [];
		for (let i = 0; i < w; i++) {
			grids.push([]);
			for (let j = 0; j < h; j++) {
				grids[i].push(new gene());
			}
		}
	};
	LifeGameCore.getLifeByLocation = (x, y) => grids[x][y];
	LifeGameCore.getLifeMap = () => {
		var map = [];
		mapAllLife((gene) => map.push({
			alive: gene.alive,
			color: gene.alive ? LifeGameCore.GenePool[gene.type].color : ''
		}));
		return map;
	};
	LifeGameCore.toggleLife = (x, y) => {
		var life = LifeGameCore.getLifeByLocation(x, y);
		if (life.alive) {
			life.die();
		}
		else {
			life.design(LifeGameCore.GenePool[LifeGameCore.currentLifeType].gene);
			life.birth(LifeGameCore.currentLifeType);
		}
		var color = '';
		if (life.alive) color = LifeGameCore.GenePool[LifeGameCore.currentLifeType].color;
		return {
			alive: life.alive,
			color: color,
		}
	};

	var duration = 500;
	LifeGameCore.getLoopDelay = () => duration;
	LifeGameCore.setLoopDelay = (delay) => {
		if (isNaN(delay)) return;
		if (delay < 1) return;
		duration = delay;
	};

	LifeGameCore.redesignGene = (newGene) => {
		var currentGene = LifeGameCore.GenePool[LifeGameCore.currentLifeType].gene;
		currentGene.friends = newGene.friends;
		currentGene.overpop = newGene.overpop;
		currentGene.rebirth = newGene.rebirth;
		if (currentGene.actions) {
			currentGene.actions = newGene.actions;
		}
		mapAllLife((gene) => {
			if (gene.type === LifeGameCore.currentLifeType) gene.design(currentGene);
		});
	};

	var checkNumberParameter = (key, defaultValue) => {
		var value = root.localStorage[key];
		if (value === null) return defaultValue;
		value = value * 1;
		if (isNaN(value)) return defaultValue;
		return value;
	};

	LifeGameCore.cycleSpace = false;
	LifeGameCore.allowMutate = root.localStorage.mutate === 'true';
	LifeGameCore.mutateFactor = checkNumberParameter('mutateFactor', 0.1);
	LifeGameCore.limitedAge = root.localStorage.aging === 'true';
	LifeGameCore.ageLimit = checkNumberParameter('ageLimit', 100);
	LifeGameCore.randomFight = root.localStorage.randomFight === 'true';

	LifeGameCore.currentLifeType = 0;
	LifeGameCore.GenePool = [
		{
			color: 'rgb(255, 127, 127)',
			gene: {
				rebirth: [3],
				friends: [0, 1, 2, 3],
				overpop: [2, 3, 4, 5, 6],
				actions: [0, 0, 0, 0, 1, 1, 2, 2, 3],
			}
		},
		{
			color: 'rgb(127, 127, 255)',
			gene: {
				rebirth: [3],
				friends: [2, 3],
				overpop: [2, 3],
				actions: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			}
		},
		{
			color: 'rgb(127, 225, 127)',
			gene: {
				rebirth: [3],
				friends: [2, 3],
				overpop: [0, 1, 2, 3, 4, 5, 6, 7, 8],
				actions: [0, 0, 0, 0, 0, 1, 1, 1, 1],
			}
		},
		{
			color: 'rgb(47, 47, 47)',
			gene: {
				rebirth: [1],
				friends: [1, 2, 3],
				overpop: [2, 3, 4],
				actions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			}
		},
	];

	LifeGameCore.autoStop = root.localStorage.breaker === 'true';

	var loopCallback;
	var shouldStop = false;
	var lastMap = [];
	var checkStatic = (map) => {
		for (let l = map.length, i = 0; i < l; i++) {
			if (map[i] !== lastMap[i]) return false;
		}
		return true;
	};
	var getNeighbor = (x, y) => {
		var xa = x - 1, xb = x + 1, ya = y - 1, yb = y + 1;
		var xLoop = [], yLoop = [];
		if (xa < 0) {
			if (LifeGameCore.cycleSpace) xLoop.push(gridWidth - 1);
		}
		else {
			xLoop.push(xa);
		}
		xLoop.push(x);
		if (xb === gridWidth) {
			if (LifeGameCore.cycleSpace) xLoop.push(0);
		}
		else {
			xLoop.push(xb);
		}
		if (ya < 0) {
			if (LifeGameCore.cycleSpace) yLoop.push(gridHeight - 1);
		}
		else {
			yLoop.push(ya);
		}
		yLoop.push(y);
		if (yb === gridHeight) {
			if (LifeGameCore.cycleSpace) yLoop.push(0);
		}
		else {
			yLoop.push(yb);
		}
		var result = [];
		xLoop.map((i) => {
			yLoop.map((j) => {
				if (i !== x || j !== y) result.push(grids[i][j].copy);
			});
		});
		return result;
	};
	var loop = () => {
		if (shouldStop) {
			if (loopCallback) loopCallback();
			return;
		}

		// Envolve Single Life
		mapAllLife((gene) => {
			if (gene.alive) gene.envolve();
		});
		// Check Neighborhoods
		var neighbors = [];
		mapAllLife((gene, x, y) => {
			neighbors[x] = neighbors[x] || [];
			neighbors[x][y] = getNeighbor(x, y);
		});
		// Update Life State
		var life = 0;
		mapAllLife((gene, x, y) => {
			gene.update(neighbors[x][y]);
			if (gene.alive) life ++;
		});
		// Mutate
		if (LifeGameCore.allowMutate) {
			mapAllLife((gene) => {
				gene.mutate(LifeGameCore.mutateFactor);
			});
		}

		// Tell Others
		var map = LifeGameCore.getLifeMap();
		if (loopCallback) loopCallback(map);
		if (life === 0) {
			if (hasEventManager) events.emit('crash');
		}
		else if (LifeGameCore.autoStop) {
			life = checkStatic(map);
			lastMap = map;
			if (life && hasEventManager) events.emit('crash');
		}

		setTimeout(loop, duration);
	};
	LifeGameCore.start = (callback) => {
		loopCallback = callback;
		shouldStop = false;
		if (hasEventManager) events.emit('start');
		loop();
	};
	LifeGameCore.pause = (callback) => {
		if (callback) loopCallback = callback;
		shouldStop = true;
		if (hasEventManager) events.emit('pause');
	};

	LifeGameCore.statistics = () => {
		var result = new Map();
		mapAllLife((gene) => {
			if (!gene.alive) return;
			gene = gene.gene;
			var key = "F: [" + gene.friends.join(',') + ']; ';
			key = key + 'O: [' + gene.overpop.join(',') + ']; ';
			key = key + 'R: [' + gene.rebirth.join(',') + '];';
			if (result.has(key)) {
				result.get(key)[1] ++;
			}
			else {
				let represent = [];
				gene.friends.map((g) => {
					if (gene.overpop.indexOf(g) >= 0) represent.push(g);
				});
				represent = '[' + represent.join(',') + '] [' + gene.rebirth.join(',') + ']';
				result.set(key, [gene.force, 1, represent]);
			}
		});
		var array = [];
		result.forEach((value, key) => {
			array.push([value[1], value[0], key, value[2]]);
		});
		array.sort((a1, a2) => a2[0] - a1[0]);

		return array;
	};

	LifeGameCore.useClassic = () => {
		LifeGameCore.initGene(LifeGame.Gene.Classic);
	};
	LifeGameCore.useQuantum = () => {
		LifeGameCore.initGene(LifeGame.Gene.Quantum);
	};

	var hasEventManager = !!root.CommonUtils.EventManager;
	if (hasEventManager) {
		var events = new root.CommonUtils.EventManager(LifeGameCore);
		LifeGameCore.onStart = (callback) => events.hook('start', callback);
		LifeGameCore.onPause = (callback) => events.hook('pause', callback);
		LifeGameCore.onCrash = (callback) => events.hook('crash', callback);
	}

	// Export
	root.LifeGame = root.LifeGame || {};
	root.LifeGame.Core = LifeGameCore;
}) (window);