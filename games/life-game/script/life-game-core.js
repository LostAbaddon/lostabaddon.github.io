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

	var mapAllLife = (callback, ignoreEmpty) => {
		for (let i = 0; i < gridWidth; i++) {
			for (let j = 0; j < gridHeight; j++) {
				if (callback && (!ignoreEmpty || !grids[i][j].empty)) callback(grids[i][j].life, i, j, grids[i][j].empty);
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
				grids[i].push({
					life: new gene(),
					empty: false,
				});
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
		if (life.empty) {
			return {
				alive: false,
				color: ''
			};
		}
		life = life.life;
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
	LifeGameCore.toggleEmpty = (x, y) => {
		var grid = LifeGameCore.getLifeByLocation(x, y);
		if (grid.empty) {
			grid.empty = false;
		}
		else {
			grid.empty = true;
			grid.life.die();
		}
		return grid.empty;
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
			color: 'rgb(127, 225, 127)',
			gene: {
				rebirth: [3],
				friends: [2, 3],
				overpop: [0, 1, 2, 3, 4, 5, 6, 7, 8],
				actions: [0, 0, 0, 0, 0, 1, 1, 1, 1],
			}
		},
		{
			color: 'rgb(127, 127, 255)',
			gene: {
				rebirth: [3],
				friends: [0, 2, 3],
				overpop: [0, 2, 3],
				actions: [0, 0, 0, 0, 0, 0, 0, 0, 0],
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
				if ((i !== x || j !== y) && !grids[i][j].empty) result.push(grids[i][j].life.copy);
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
		}, true);
		// Check Neighborhoods
		var neighbors = [];
		mapAllLife((gene, x, y) => {
			neighbors[x] = neighbors[x] || [];
			neighbors[x][y] = getNeighbor(x, y);
		}, true);
		// Update Life State
		var life = 0;
		mapAllLife((gene, x, y) => {
			gene.update(neighbors[x][y]);
			if (gene.alive) life ++;
		}, true);
		// Mutate
		if (LifeGameCore.allowMutate) {
			mapAllLife((gene) => {
				gene.mutate(LifeGameCore.mutateFactor);
			}, true);
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
		LifeGameCore.onDBReady = (callback) => events.hook('DBReady', callback);
	}

	// DB Manager
	const DB = CommonUtils.dbManager;
	var initDB = (db, transaction) => {
		var tableLife = db.getTable('Life'), tableMap = db.getTable('Map'), tableWorld = db.getTable('World');
		tableLife.initTableWithRecords('id', [
			{ id: "What?", type: TAG_TYPED_CLASSIC  },
			{ id: "Hello 1", type: TAG_TYPED_CLASSIC  },
			{ id: "Hello 2", type: TAG_TYPED_QUANTUM  },
			{ id: "Hello X", type: TAG_TYPED_CLASSIC  },
		]);
		tableMap.initTableWithRecords('id', [
			{ id: "Map 1"  },
			{ id: "Map 2"  },
			{ id: "Map 3"  },
			{ id: "Map 4"  },
		]);
		tableWorld.initTableWithRecords('id', []);
		transaction.objectStore('Life').createIndex('Typed', 'type');
		transaction.objectStore('World').createIndex('Typed', 'type');
	};
	var dbOpened = (db) => {
		DBManager.db = db;
		if (hasEventManager) events.emit('DBReady');
	};
	var openDB = () => {
		DB.openDB({
			name: 'LifeGame',
			version: 1,
			callbacks: {
				onsuccess: dbOpened,
				oninit: initDB,
			},
		});
	};
	// DB.deleteDB('LifeGame');
	openDB();

	const TAG_TYPED_CLASSIC = 'classic';
	const TAG_TYPED_QUANTUM = 'quantum';
	const DBManager = {};
	DBManager.clear = () => {
		DB.deleteDB('LifeGame');
		openDB();
	};
	DBManager.getAllRecordID = (info, callback) => {
		var table = DBManager.db.getTable(info.table);
		if (!info.index) {
			table.getAllRecords('id', (records) => {
				var ids = [];
				records.map((r) => ids.push(r.id));
				if (callback) callback(ids);
			});
		}
		else {
			table.getAllRecordsWithIndex(info.index, info.key, 'id', (records) => {
				var ids = [];
				records.map((r) => ids.push(r.id));
				if (callback) callback(ids);
			});
		}
	};

	LifeGameCore.DBManager = DBManager;
	LifeGameCore.getLifeRecordNames = (callback) => {
		if (!callback) return;
		DBManager.getAllRecordID({
			table: 'Life',
			index: 'Typed',
			key: gene === LifeGame.Gene.Classic ? TAG_TYPED_CLASSIC : TAG_TYPED_QUANTUM,
		}, callback);
	};
	LifeGameCore.getMapRecordNames = (callback) => {
		if (!callback) return;
		DBManager.getAllRecordID({ table: 'Map' }, callback);
	};
	LifeGameCore.getWorldRecordNames = (callback) => {
		if (!callback) return;
		DBManager.getAllRecordID({
			table: 'World',
			index: 'Typed',
			key: gene === LifeGame.Gene.Classic ? TAG_TYPED_CLASSIC : TAG_TYPED_QUANTUM,
		}, callback);
	};

	LifeGameCore.saveLifeData = (id, callback) => {
		console.log('Save Life: ' + id);
	};
	LifeGameCore.loadLifeData = (id, callback) => {
		console.log('Load Life: ' + id);
	};
	LifeGameCore.deleteLifeData = (id, callback) => {
		console.log('Delete Life: ' + id);
	};
	LifeGameCore.saveMapData = (id, callback) => {
		var result = [];
		mapAllLife((grid, x, y, isEmpty) => {
			result[x] = result[x] || [];
			result[x][y] = isEmpty;
		}, false);
		result = {
			id: id,
			data: result,
		};
		var table = DBManager.db.getTable('Map');
		table.addRecord(id, result, true,
			(result, store) => {
				console.log('Save Successful');
				if (callback) callback();
			}, (error) => {
				console.error('Save Failed');
				console.error(error);
			});
	};
	LifeGameCore.loadMapData = (id, callback) => {
		var table = DBManager.db.getTable('Map');
		table.queryRecordWithKey(id,
			(result, store) => {
				var data = result.data, changes = [];
				data.forEach((line, x) => {
					if (!grids[x]) return;
					line.forEach((isEmpty, y) => {
						if (!grids[x][y]) return;
						var empty = grids[x][y].empty;
						if (!!empty === isEmpty) return;
						changes.push([x, y, isEmpty]);
						if (empty) {
							grids[x][y].empty = false;
						}
						else {
							grids[x][y].empty = true;
							grids[x][y].life.die();
						}
					});
				})
				if (callback) callback(changes);
			},
			() => {
				console.error("No Such Data!");
			},
			(error) => {
				console.log("Load Data Error");
				console.error(error);
			}
		);
	};
	LifeGameCore.deleteMapData = (id, callback) => {
		var table = DBManager.db.getTable('Map');
		table.removeRecord(id,
			(result, store) => {
				console.log('Delete Successful');
				if (callback) callback();
			}, (error) => {
				console.error('Delete Failed');
				console.error(error);
			});
	};
	LifeGameCore.saveWorldData = (id, callback) => {
		console.log('Save World: ' + id);
	};
	LifeGameCore.loadWorldData = (id, callback) => {
		console.log('Load World: ' + id);
	};
	LifeGameCore.deleteWorldData = (id, callback) => {
		console.log('Delete World: ' + id);
	};

	// Export
	root.LifeGame = root.LifeGame || {};
	root.LifeGame.Core = LifeGameCore;
}) (window);