(function (root) {
	"use strict";

	var LifeGameCore = {
		get currentLife () {
			return gene;
		}
	};

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

	LifeGameCore.initGene = (newGene) => gene = newGene;
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
		mapAllLife((gene) => map.push(gene.alive));
		return map;
	};

	var duration = 500;
	LifeGameCore.getLoopDelay = () => duration;
	LifeGameCore.setLoopDelay = (delay) => {
		if (isNaN(delay)) return;
		if (delay < 1) return;
		duration = delay;
	};

	LifeGameCore.redesignGene = (newGene) => {
		gene.SampleGene.friends = newGene.friends;
		gene.SampleGene.overpop = newGene.overpop;
		gene.SampleGene.rebirth = newGene.rebirth;
		mapAllLife((gene) => {
			gene.design(newGene);
		});
	};

	LifeGameCore.cycleSpace = false;
	LifeGameCore.allowMutate = root.localStorage.mutate === 'true';
	LifeGameCore.mutateFactor = null;
	if (root.localStorage.mutateFactor) LifeGameCore.mutateFactor = root.localStorage.mutateFactor * 1;
	if (isNaN(LifeGameCore.mutateFactor)) LifeGameCore.mutateFactor = 0.1;

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
				if (i !== x || j !== y) result.push(grids[i][j]);
			});
		});
		return result;
	};
	var getTotalEffect = (neighbors) => {
		var effect = gene.originEffect;
		neighbors.map((g) => {
			effect = gene.addEffect(effect, g.effect);
		});
		return gene.getLifeEffect(effect);
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
			var n = getNeighbor(x, y), e = getTotalEffect(n);
			neighbors[x][y] = [e, n];
		});
		// Update Life State
		mapAllLife((gene, x, y) => {
			gene.update(neighbors[x][y][0], neighbors[x][y][1]);
		});
		if (LifeGameCore.allowMutate) {
			mapAllLife((gene) => {
				gene.mutate(LifeGameCore.mutateFactor);
			});
		}

		// Tell Others
		var map = LifeGameCore.getLifeMap();
		if (loopCallback) loopCallback(map);
		if (LifeGameCore.autoStop) {
			var life = 0;
			map.forEach((alive, index) => {
				if (alive) life ++;
			});
			if (life === 0) {
				if (hasEventManager) events.emit('crash');
			}
			else {
				life = checkStatic(map);
				lastMap = map;
				if (life && hasEventManager) events.emit('crash');
			}
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

	var hasEventManager = !!root.CommonUtils.EventManager;
	if (hasEventManager) {
		var events = new root.CommonUtils.EventManager();
		LifeGameCore.onStart = (callback) => events.hook('start', callback);
		LifeGameCore.onPause = (callback) => events.hook('pause', callback);
		LifeGameCore.onCrash = (callback) => events.hook('crash', callback);
	}

	// Export
	root.LifeGame = root.LifeGame || {};
	root.LifeGame.Core = LifeGameCore;
}) (window);