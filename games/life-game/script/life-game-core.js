(function (root) {
	"use strict";

	var LifeGameCore = {};

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

	LifeGameCore.cycleSpace = false;

	var loopCallback;
	var shouldStop = false;
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
		var effect = gene.originEffect;
		xLoop.map((i) => {
			yLoop.map((j) => {
				if (i !== x || j !== y) effect = gene.addEffect(effect, grids[i][j].effect);
			});
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
			neighbors[x][y] = getNeighbor(x, y);
		});
		// Update Life State
		mapAllLife((gene, x, y) => {
			gene.update(neighbors[x][y]);
		});

		if (loopCallback) loopCallback();
		setTimeout(loop, duration);
	};
	LifeGameCore.start = (callback) => {
		loopCallback = callback;
		shouldStop = false;
		loop();
	};
	LifeGameCore.pause = (callback) => {
		if (callback) loopCallback = callback;
		shouldStop = true;
	};

	// Export
	root.LifeGame = root.LifeGame || {};
	root.LifeGame.Core = LifeGameCore;
}) (window);