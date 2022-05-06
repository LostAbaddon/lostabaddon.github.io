(() => {
	const LockRate = 0.5;
	const CloseRate = 0.4;
	const HauntedRate = 0.15;
	const KeyRate = 0.9;
	const MonsterRate = 0.05;

	const GameSpeed = 500;
	const DayLimit = 28;

	const EquipLifeMax = 200;
	const EquipAttackMax = 50;
	const EquipDefenceMax = 50;
	const EquipSpeedMax = 12;
	const EquipMainFactor = 0.5;
	const EquipHaloCount = EquipmentTitles.length - 1;

	const PixelSize = 20;
	const TimeSpeed = 9;
	const HistoryLimit = 15;
	const Terrain = {
		P: "plain",
		S: "swamp",
		F: "forest",
		B: "beach",
		W: "water",
		M: "mountain",
		C: "canyon",
		U: "urban",
		L: "passway",
		R: "ruin",
		H: "house",
		T: "landscape",
	};
	const Settings = {
		autoDay: true,
		autoFight: false,
		autoBuild: true,
		autoUnlock: true,
		allowMusic: true,
		autoStopAfterBattle: false,
		autoUpdateEquipment: false,
	};
	const EquipIcon = {
		life: ["fa-solid", "fa-battery-three-quarters"],
		speed: ["fa-solid", "fa-arrow-right-arrow-left"],
		attack: ["fa-solid", "fa-hand-back-fist"],
		defence: ["fa-solid", "fa-shield-halved"],
	};
	const Utils = {};

	var gameShown = false;
	var gridWidth = 0, gridHeight = 0, gridSize = 0, gridOffsetX = 0, gridOffsetY = 0;
	var lastX = -1, lastY = -1;
	var pointX = -1, pointY = -1, lastPos = [pointX, pointY];
	var mapData;
	var grid = [], icons = [];
	var Role = {};
	var timestamp = 0, isNight = false, shouldStop = true, tmrMove, targetPos = null;
	var targetSpotList = [], foundSpotList = [];
	var plannedPath = null;
	var dayID = 0, eventHistory = [], pathBlocks = [], openedBlocks = [], unlockedBlocks = [];
	var monsterList = [], monsterCount = 1;
	var houseMap = {};
	var popStoryLine;

	const MapArea = CasusStage.querySelector('div.map');
	const MapCanvas = MapArea.querySelector('canvas');
	const MapCtx = MapCanvas.getContext('2d');
	const PersonelArea = CasusStage.querySelector('div.personel');
	const PropertyUI = {
		name: PersonelArea.querySelector('div.name'),
		life: PersonelArea.querySelector('div.property span.value.life'),
		speed: PersonelArea.querySelector('div.property span.value.speed'),
		attack: PersonelArea.querySelector('div.property span.value.attack'),
		defence: PersonelArea.querySelector('div.property span.value.defence'),
		rate: PersonelArea.querySelector('div.property span.value.totalWin'),
	};
	const BtnEquipment = PersonelArea.querySelector('div.package > div.item.equipment');
	Equipments.Body = Equipments.querySelector('div.using > div.content');
	Equipments.Body.Title = Equipments.querySelector('div.using > div.title > span');
	Equipments.Body.Halo = Equipments.querySelector('div.using > div.halo');
	Equipments.Pack = Equipments.querySelector('div.bag > div.content');
	Equipments.Pack.Title = Equipments.querySelector('div.bag > div.title > span');
	Equipments.Info = Equipments.querySelector('div.info > div.prop');
	Equipments.Info.Name = Equipments.querySelector('div.info div.name');
	Equipments.Info.Life = Equipments.querySelector('div.info div.item span.value.life');
	Equipments.Info.Speed = Equipments.querySelector('div.info div.item span.value.speed');
	Equipments.Info.Attack = Equipments.querySelector('div.info div.item span.value.attack');
	Equipments.Info.Defence = Equipments.querySelector('div.info div.item span.value.defence');
	const BtnMemory = PersonelArea.querySelector('div.package > div.item.memory');
	const EventsArea = CasusStage.querySelector('div.events');
	const BtnMove = CasusStage.querySelector('div.status div.movement');
	BtnMove.Icon = BtnMove.querySelector('i');
	const BtnConfig = CasusStage.querySelector('div.status div.setting');
	SettingPanel.AutoDay = SettingPanel.querySelector('div.option[name="AutoDay"]');
	SettingPanel.AutoDay.opt = SettingPanel.AutoDay.querySelector('input');
	SettingPanel.AutoFight = SettingPanel.querySelector('div.option[name="AutoFight"]');
	SettingPanel.AutoFight.opt = SettingPanel.AutoFight.querySelector('input');
	SettingPanel.AutoBuild = SettingPanel.querySelector('div.option[name="AutoBuild"]');
	SettingPanel.AutoBuild.opt = SettingPanel.AutoBuild.querySelector('input');
	SettingPanel.AutoUnlock = SettingPanel.querySelector('div.option[name="AutoUnlock"]');
	SettingPanel.AutoUnlock.opt = SettingPanel.AutoUnlock.querySelector('input');
	SettingPanel.AllowMusic = SettingPanel.querySelector('div.option[name="AllowMusic"]');
	SettingPanel.AllowMusic.opt = SettingPanel.AllowMusic.querySelector('input');
	SettingPanel.AutoStopAfterBattle = SettingPanel.querySelector('div.option[name="AutoStopAfterBattle"]');
	SettingPanel.AutoStopAfterBattle.opt = SettingPanel.AutoStopAfterBattle.querySelector('input');
	SettingPanel.AutoUpdateEquipment = SettingPanel.querySelector('div.option[name="AutoUpdateEquipment"]');
	SettingPanel.AutoUpdateEquipment.opt = SettingPanel.AutoUpdateEquipment.querySelector('input');
	PanelResult.Content = PanelResult.querySelector('div.content');
	RqtBuild.Content = RqtBuild.querySelector('div.content div.icons');
	StoryLine.content = StoryLine.querySelector('div.content');
	StoryLine.Button = {
		OK: StoryLine.querySelector('div.btn_ok'),
		Yes: StoryLine.querySelector('div.btn_yes'),
		No: StoryLine.querySelector('div.btn_no'),
		Cancel: StoryLine.querySelector('div.btn_cancel'),
	};
	StoryLine.Event = {
		onOK: () => {},
		onYes: () => {},
		onNo: () => {},
		onCancel: () => {},
	};
	StoryLine.Shown = false;
	MonsterInfo.forEach((mon, id) => mon.id = id);

	const getHouseName = (x, y, block, house) => {
		if (block.closed) return "关上的" + (house.sort === 'house' ? "房子" : "废楼");
		if (block.locked) return "上锁的" + (house.sort === 'house' ? "房子" : "废楼");

		var info = HouseInfo[house.type];
		if (!house.type || !info || !info.name) {
			return house.sort === 'house' ? '空屋' : (house.sort === 'ruin' ? '已被摧毁无法查明……' : '一座雕塑');
		}

		if (house.sort === 'ruin') return '废弃的' + info.name;
		return info.name;
	};
	const onResize = () => {
		if (!gameShown) return;

		var width = window.innerWidth, height = window.innerHeight;
		width = width * 0.9 - 2 - 300;
		height = height * 0.9 - 2 - 24 - 100;
		var size = Math.floor(Math.min(width / gridWidth, height / gridHeight));
		gridSize = size;
		var sizeW = gridWidth * size;
		var sizeH = gridHeight * size;
		gridOffsetX = (width - sizeW) / 2;
		gridOffsetY = (height - sizeH) / 2;
		MapCanvas.style.top = gridOffsetY + 'px';
		MapCanvas.style.left = gridOffsetX + 'px';
		MapCanvas.style.width = sizeW + 'px';
		MapCanvas.style.height = sizeH + 'px';

		icons.forEach(icon => {
			icon.style.top = (gridOffsetY + (icon.Y + 0.15) * size) + 'px';
			icon.style.left = (gridOffsetX + icon.X * size) + 'px';
			icon.style.width = size + 'px';
			icon.style.height = size + 'px';
			icon.style.fontSize = (size * 0.8) + 'px';
			if (icon.shown === false) {
				icon.style.display = 'block';
				icon.shown = true;
			}
		});
	};
	const updateTargetList = () => {
		targetSpotList = [...foundSpotList];
		var list = [];
		while (targetSpotList.length > 0) {
			list.push(targetSpotList.splice(Math.floor(Math.random() * targetSpotList.length), 1)[0]);
		}
		var limit = Math.floor(3 * Math.random()) + Math.floor(3 * Math.random());
		list.splice(limit);
		targetSpotList = list;

		var hasHall = foundSpotList.some(house => house.type === 'hall');
		if (hasHall) {
			hasHall = targetSpotList.some(house => house.type === 'hall');
			if (!hasHall && Math.random() < 0.5) {
				Object.values(mapData.houses).some(house => {
					if (house.type !== 'hall') return;
					targetSpotList.splice(Math.floor(targetSpotList.length * Math.random()), 0, house)
					return true;
				});
			}
		}

		TargetList.innerHTML = '';
		list.forEach(h => {
			var info = HouseInfo[h.type];
			var icon = ['fa-icon'];
			icon.push(...info.icon);
			var ele = newEle('i', icon);
			ele.setAttribute('type', h.type);
			TargetList.appendChild(ele)
		});
	};
	const loadMap = () => {
		timestamp = 0;
		isNight = false;
		targetPos = null;
		targetSpotList = [];
		foundSpotList = [];
		plannedPath = null;
		dayID = 0;
		eventHistory = [];
		pathBlocks = [];
		openedBlocks = [];
		unlockedBlocks = [];
		monsterList = [];
		monsterCount = 1;
		houseMap = {};
		EventList.innerText = '';
		TargetList.innerHTML = '';

		mapData = JSON.parse(JSON.stringify(window.Data.casus1));
		[pointX, pointY] = mapData.startPoints[Math.floor(Math.random() * mapData.startPoints.length)];
		lastPos = [pointX, pointY];
		var line = mapData.terrain.split('\n').filter(l => l.length > 0);
		gridWidth = line[0].length;
		gridHeight = line.length;
		grid = [];
		icons = [];
		MapCanvas.width = gridWidth * PixelSize;
		MapCanvas.height = gridHeight * PixelSize;
		mapData.waitingBuilds.forEach(h => houseMap[h] = 0);

		for (let i = 0; i < gridHeight; i ++) {
			let l = line[i];
			let g = [];
			for (let j = 0; j < gridWidth; j ++) {
				let t = Terrain[l.substr(j, 1)];
				let e = {
					terrain: t,
					x: j,
					y: i,
					isPath: t === 'passway',
				}
				if (e.isPath) {
					e.available = true;
					e.times = 0;
					e.monsters = [];
					pathBlocks.push([j, i]);
				}
				if (t === 'landscape') {
					let house = mapData.houses[j + '-' + i];
					icons.push([j, i, house.type]);
				}
				else if (t === 'house' || t === 'ruin') {
					let house = mapData.houses[j + '-' + i];
					let couldGhost = true;
					e.locked = Math.random() < LockRate;
					if (!!house.type) {
						e.closed = Math.random() < CloseRate;
						couldGhost = !mapData.forbiddens.includes(house.type);
						if (!e.closed && !e.locked && couldGhost) {
							foundSpotList.push(house);
						}
					}
					else {
						e.closed = true;
					}
					if (!e.closed) {
						let tag = [j, i];
						if (couldGhost) openedBlocks.push(tag);
						if (e.locked) {
							icons.push([j, i, "locked", t === 'ruin']);
						}
						else {
							if (couldGhost) unlockedBlocks.push(tag);
							if (!!house && !!house.type) {
								icons.push([j, i, house.type, t === 'ruin']);
							}
						}
					}
				}
				g.push(e);
			}
			grid.push(g);
		}
		mapData.extraPath.forEach(([x, y]) => {
			var e = grid[y][x];
			e.isPath = true;
			e.available = true;
			e.times = 0;
			e.monsters = [];
			pathBlocks.push([x, y]);
		});
		icons = icons.map(([x, y, type, isRuin]) => {
			var icon = ['fa-icon'];
			if (type === 'locked') {
				icon.push("fa-solid", "fa-lock");
			}
			else {
				let house = HouseInfo[type];
				if (!!house.icon) icon.push(...house.icon);
			}
			if (isRuin) icon.push('ruin');
			var ele = addIcon(x, y, icon);
			return ele;
		});
		mapData.startPoints = mapData.startPoints.map(a => [a, 0]);

		Player.X = pointX;
		Player.Y = pointY;
		Player.shown = false;
		icons.push(Player);

		updateMap();
		showGridInfo(pointX, pointY);
		showTimeInfo();
		updateTargetList();
	};
	const updateMap = () => {
		var hlist = [];
		for (let i = 0; i < gridHeight; i ++) {
			for (let j = 0; j < gridWidth; j ++) {
				let g = grid[i][j];
				g.affects = [];
				g.marks = [];
				let ti = TerrainInfo[g.terrain], x = j * PixelSize, y = i * PixelSize;
				let color = ti.color;
				if (g.closed) {
					color = "rgb(205, 209, 211)";
				}
				MapCtx.fillStyle = color;
				MapCtx.fillRect(x, y, PixelSize, PixelSize);
				let house = mapData.houses[j + '-' + i];
				if (!!house) {
					house.pos = [j, i];
					house.sort = g.terrain;
					house.color = color;
					hlist.push(house);
				}
			}
		}
		hlist.forEach(h => {
			var qp = PixelSize / 4, hp = PixelSize / 2;
			if (h.sort === 'landscape') {
				let xs = Math.max(0, h.pos[0] - (h.range || 0)), xa = Math.min(gridWidth - 1, h.pos[0] + (h.range || 0));
				let ys = Math.max(0, h.pos[1] - (h.range || 0)), ya = Math.min(gridHeight - 1, h.pos[1] + (h.range || 0));
				for (let x = xs; x <= xa; x ++) {
					for (let y = ys; y <= ya; y ++) {
						let e = grid[y][x];
						if (!e.isPath) continue;
						e.affects.push(h.pos.join('-'));
					}
				}
			}
			else if (!!h.door) {
				let e = grid[h.door[1]][h.door[0]];
				e.marks.push(h.pos.join('-'));
				let dx = -1, dy = -1;
				if (h.door[0] === h.pos[0] - 1 && h.door[1] === h.pos[1]) {
					dx = h.pos[0] * PixelSize - qp;
					dy = h.pos[1] * PixelSize + qp;
				}
				else if (h.door[0] === h.pos[0] + 1 && h.door[1] === h.pos[1]) {
					dx = (h.pos[0] + 1) * PixelSize - qp;
					dy = h.pos[1] * PixelSize + qp;
				}
				else if (h.door[0] === h.pos[0] && h.door[1] === h.pos[1] - 1) {
					dx = h.pos[0] * PixelSize + qp;
					dy = h.pos[1] * PixelSize - qp;
				}
				else if (h.door[0] === h.pos[0] && h.door[1] === h.pos[1] + 1) {
					dx = h.pos[0] * PixelSize + qp;
					dy = (h.pos[1] + 1) * PixelSize - qp;
				}
				if (dx >= 0 & dy >= 0) {
					MapCtx.fillStyle = h.color;
					MapCtx.fillRect(dx, dy, hp, hp);
				}
			}
		});
	};
	const showGridInfo = (x, y) => {
		var g = (grid[y] || [])[x];
		if (!g) return;

		var info = TerrainInfo[g.terrain] || {};
		EventsArea.querySelector('div.title > span.terrainName').innerText = info.name || '无';
		EventsArea.HouseInfo = EventsArea.HouseInfo || EventsArea.querySelector('div.houseInfo');
		EventsArea.HouseInfo.Desc = EventsArea.HouseInfo.Desc || EventsArea.querySelector('div.desc');
		EventsArea.PathInfo = EventsArea.PathInfo || EventsArea.querySelector('div.pathInfo');
		EventsArea.BuildingList = EventsArea.BuildingList || EventsArea.querySelector('div.pathInfo div.line.building');
		EventsArea.HouseList = EventsArea.HouseList || EventsArea.querySelector('div.pathInfo div.line.house');
		EventsArea.BuildingList.Inner = EventsArea.BuildingList.Inner || EventsArea.querySelector('div.buildingList');
		EventsArea.HouseList.Inner = EventsArea.HouseList.Inner || EventsArea.querySelector('div.houseList');
		if (['house', 'ruin', 'landscape'].includes(g.terrain)) {
			EventsArea.HouseInfo.style.display = 'block';
			EventsArea.PathInfo.style.display = 'none';
			let house = mapData.houses[x + '-' + y];
			EventsArea.HouseInfo.querySelector('span.houseType').innerText = getHouseName(x, y, g, house);
			let info = HouseInfo[house.type];
			if (!g.closed && !!info && !!info.desc) {
				EventsArea.HouseInfo.Desc.style.display = 'block';
				EventsArea.HouseInfo.Desc.innerText = info.desc;
			}
			else {
				EventsArea.HouseInfo.Desc.style.display = 'none';
			}
		}
		else if (g.isPath) {
			EventsArea.HouseInfo.style.display = 'none';
			EventsArea.PathInfo.style.display = 'block';
			if (g.affects.length === 0) {
				EventsArea.BuildingList.style.display = 'none';
			}
			else {
				EventsArea.BuildingList.style.display = 'block';
				let list = g.affects.map(pos => {
					pos = mapData.houses[pos];
					return getHouseName(x, y, g, pos);
				});
				list = list.join('\n');
				EventsArea.BuildingList.Inner.innerText = list;
			}
			if (g.marks.length === 0) {
				EventsArea.HouseList.style.display = 'none';
			}
			else {
				EventsArea.HouseList.style.display = 'block';
				let list = g.marks.map(pos => {
					pos = mapData.houses[pos];
					return getHouseName(x, y, g, pos);
				});
				list = list.join('\n');
				EventsArea.HouseList.Inner.innerText = list;
			}
		}
		else {
			EventsArea.HouseInfo.style.display = 'none';
			EventsArea.PathInfo.style.display = 'none';
		}
	};
	const showRoleInfo = () => {
		PropertyUI.name.innerText = GateOfNovosibirsk.Player.id.toUpperCase() + '【' + Role.title + '】';
		PropertyUI.life.innerText = Role.life;
		PropertyUI.speed.innerText = Role.speed;
		PropertyUI.attack.innerText = Role.attack;
		PropertyUI.defence.innerText = Role.defence;
		PropertyUI.rate.innerText = Role.records.present + '/' + Role.records.win + '/' + Role.records.total;
	};
	const showTimeInfo = () => {
		var left = timestamp;
		var min = left - Math.floor(left / 60) * 60;
		left = (left - min) / 60;
		var hour = left - Math.floor(left / 24) * 24;
		left = (left - hour) / 24 + 1;
		var isN = hour < 6 || hour >= 18;
		dayID = left + 1;

		if (min < 10) min = '0' + min;
		if (hour < 10) hour = '0' + hour;
		if (left < 10) left = '0' + left;

		TimeZone.innerText = `D${left} ${hour}:${min}`;
		if (isN !== isNight) {
			isNight = isN;
			if (isN) {
				DayNight.classList.remove('fa-sun');
				DayNight.classList.add('fa-moon');
			}
			else {
				DayNight.classList.add('fa-sun');
				DayNight.classList.remove('fa-moon');
			}
		}
	};
	const getNextBlock = (x=Player.X, y=Player.Y, notRandom=true) => {
		var list = []
		var blockU = (grid[y - 1] || [])[x];
		var blockD = (grid[y + 1] || [])[x];
		var blockL = grid[y][x - 1];
		var blockR = grid[y][x + 1];
		if (!!blockU && blockU.isPath) list.push(blockU);
		if (!!blockD && blockD.isPath) list.push(blockD);
		if (!!blockL && blockL.isPath) list.push(blockL);
		if (!!blockR && blockR.isPath) list.push(blockR);

		if (list.length === 0) return null;
		if (list.length === 1) return list[0];

		if (notRandom) {
			list = list.filter(b => b.x !== lastPos[0] || b.y !== lastPos[1]);
			list.sort((a, b) => {
				return a.times - b.times;
			});
			var t = list[0].times;
			list = list.filter(b => b.times <= t);
		}

		return list[Math.floor(list.length * Math.random())];
	};
	const moveRole = (role) => {
		role.style.top = (gridOffsetY + (role.Y + 0.15) * gridSize) + 'px';
		role.style.left = (gridOffsetX + role.X * gridSize) + 'px';
	};
	const dealCurrent = async () => {
		var b = grid[Player.Y][Player.X], finds = [];
		var mapChanged = false;
		var updateRole = false, shouldUnlock = Role.package.key > 0 && Settings.autoUnlock, mayUnlock = false;
		var message = [];

		if (!!targetPos) {
			if (targetPos[0] === Player.X && targetPos[1] === Player.Y) {
				if (!Settings.autoUnlock && Role.package.key > 0) mayUnlock = true;
				targetPos = null;
			}
		}
		else if (!!b.marks && b.marks.length > 0) {
			let rmv = [];
			targetSpotList.forEach((s, i) => {
				if (s.door[0] === Player.X && s.door[1] === Player.Y) {
					rmv.push(i);
				}
			});
			rmv.reverse().forEach(i => targetSpotList.splice(i, 1));
			rmv = [];
			foundSpotList.forEach((s, i) => {
				if (s.door[0] === Player.X && s.door[1] === Player.Y) {
					rmv.push([i, s.type]);
				}
			});
			rmv.reverse().forEach(([i, type]) => {
				let x = TargetList.querySelector('i[type="' + type + '"]');
				if (!!x) {
					TargetList.removeChild(x);
					let count = TargetList.querySelectorAll('i').length;
					if (count === 0) {
						let empty = newEle("i", "fa-solid", "fa-person-hiking");
						empty.style.pointEvents = 'none';
						TargetList.appendChild(empty);
					}
				}
			});
		}

		if (!!b.affects) {
			for (let m of b.affects) {
				let h = mapData.houses[m];
				let info = HouseInfo[h.type];
				if (!info.action || h.dayId === dayID) continue;
				h.dayId = dayID;
				let [msg, ts] = await info.action(Role, isNight, false, h, Utils);
				message.unshift(msg);
				updateRole = true;
			}
		}

		if (!!b.marks) {
			for (let m of b.marks) {
				let h = mapData.houses[m];
				let [x, y] = h.pos;
				let g = grid[y][x];
				let closed = g.closed;

				if (g.locked) {
					if (mayUnlock) {
						let ok = await requestUnlock();
						if (ok) {
							mayUnlock = false;
							shouldUnlock = true;
						}
					}
					if (shouldUnlock) {
						Role.package.key --;
						g.locked = false;
						message.unshift("使用一把钥匙打开了一间上锁的房间");
						icons.some((icon, idx) => {
							if (icon.X !== x || icon.Y !== y) return false;
							var info = HouseInfo[h.type];
							if (!info) {
								MapArea.removeChild(icon);
								icons.splice(idx, 1);
							}
							else {
								icon.classList.remove('fa-solid');
								icon.classList.remove('fa-lock');
								info.icon.forEach(c => icon.classList.add(c));
							}
							return true;
						});
						if (Settings.allowMusic) {
							MscUnlock.currentTime = 0;
							MscUnlock.play();
						}
					}
				}

				if (g.closed) {
					g.closed = false;
					let info;
					if (g.locked) {
						info = [x, y, "locked", g.terrain === 'ruin'];
					}
					else {
						if (!!h && !!h.type) {
							info = [x, y, h.type, g.terrain === 'ruin'];
						}
					}
					if (!!info) {
						let icon = ['fa-icon'];
						if (info[2] === 'locked') {
							icon.push("fa-solid", "fa-lock");
						}
						else {
							let house = HouseInfo[info[2]];
							if (!!house.icon) icon.push(...house.icon);
						}
						if (info[3]) icon.push('ruin');
						addIcon(info[0], info[1], icon);
					}
					if (Settings.allowMusic) {
						MscOpen.currentTime = 0;
						MscOpen.play();
					}
				}

				if (!g.locked && !h.type) {
					let newType;
					if (Math.random() > HauntedRate) {
						newType = await requestChooseHouse();
					}
					else {
						newType = mapData.hauntedBuilds[Math.floor(Math.random() * mapData.hauntedBuilds.length)];
					}
					h.type = newType;
					// h.type = 'hall';
					if (newType === 'residential') {
						if (h.sort === 'ruin') mapData.startPoints.push([[g.x, g.y], 2]);
						else mapData.startPoints.push([[g.x, g.y], 1]);
					}
					else if (newType === 'haunted') {
						if (h.sort === 'ruin') mapData.startPoints.push([[g.x, g.y], 3]);
						else mapData.startPoints.push([[g.x, g.y], 4]);
					}
					let icon = ['fa-icon'];
					let house = HouseInfo[newType];
					if (!!house.icon) icon.push(...house.icon);
					if (g.terrain === 'ruin') icon.push('ruin');
					addIcon(x, y, icon);
					g.dayId = dayID;
					// g.dayId = dayID - 1;
				}

				if (closed) {
					let tag = [x, y];
					openedBlocks.push(tag);
					let name = getHouseName(x, y, g, h);
					finds.push(name);
					info = mapData.houses[x + '-' + y];
					if (!g.locked) {
						unlockedBlocks.push(tag);
						if (!!info.type) {
							foundSpotList.push(info);
							pointX = x;
							pointY = y;
							showGridInfo(x, y);
						}
					}
					mapChanged = true;
				}

				if (!g.locked && !closed && g.dayId !== dayID) {
					let info = HouseInfo[h.type];
					if (info.action) {
						let [msg, ts, act] = await info.action(Role, isNight, h.sort === 'ruin', Utils);
						timestamp += ts;
						updateRole = true;
						message.unshift(msg);
						if (act === 1) mapChanged = true;
					}
					g.dayId = dayID;
				}
			}
		}

		if (mapChanged) {
			updateMap();
			message.unshift('发现新房间：' + finds.join('、'));
		}

		addHistory(...message);
		if (updateRole) {
			updateRoleInfo(Role);
			showRoleInfo();
		}
	};
	const requestChooseHouse = () => new Promise(res => {
		var max = 0, min = Infinity;
		mapData.waitingBuilds.forEach(h => {
			var v = houseMap[h];
			if (v > max) max = v;
			if (v < min) min = v;
		});
		var limit = (min + max) / 2 + 3;
		var list = [];
		mapData.waitingBuilds.forEach(h => {
			var v = houseMap[h];
			if (v < limit) list.push(h);
		});
		if (list.length === 0) list = mapData.waitingBuilds;

		if (Settings.autoBuild) {
			let newType = list[Math.floor(Math.random() * list.length)];
			houseMap[newType] ++;
			res(newType);
		}
		else {
			newPopup('选择建筑', {
				top: '50%',
				left: '50%',
				width:'600px',
				height:'400px',
				noCloser: true,
				onActive: pop => {
					pop.onClose = () => {
						if (!RqtBuild.HouseName) return;
						pop.hide();
					};
					pop.style.transform = "translate(-50%, -50%)";
					RqtBuild.Content.innerHTML = '';
					list.forEach(house => {
						var info = HouseInfo[house];
						var item = newEle('div', 'item');
						item.setAttribute('name', house);
						var icon = ['fa-icon'];
						icon.push(...info.icon);
						icon = newEle('i', icon);
						icon.setAttribute('type', house);
						item.appendChild(icon);
						var title = newEle('div', 'label');
						title.innerHTML = info.name;
						item.appendChild(title);
						RqtBuild.Content.appendChild(item);
					});
					pop.UI.content.appendChild(RqtBuild);

					pop.show();
				},
				onHide: pop => {
					var name = RqtBuild.HouseName;
					if (!!RqtBuild.LastItem) RqtBuild.LastItem.classList.remove('selected');
					RqtBuild.LastItem = null;
					RqtBuild.HouseName = null;
					ForbiddenCity.appendChild(RqtBuild);
					houseMap[name] ++;
					res(name);
				},
			});
		}
	});
	const randomWalk = () => {
		var next = getNextBlock();
		if (!!next) {
			next.times ++;
			lastPos[0] = Player.X;
			lastPos[1] = Player.Y;
			Player.X = next.x;
			Player.Y = next.y;
			moveRole(Player);
		}
	};
	const gotoTarget = () => {
		var target = !!targetPos ? targetPos : targetSpotList[0].door;

		var used = [Player.X + '-' + Player.Y];
		var paths = [[[Player.X, Player.Y]]];
		var notFound = true, targetPath;
		while (notFound) {
			let nextPaths = [];
			paths.forEach(path => {
				var last = path[path.length - 1];
				var u = (grid[last[1] - 1] || [])[last[0]];
				var d = (grid[last[1] + 1] || [])[last[0]];
				var l = grid[last[1]][last[0] - 1];
				var r = grid[last[1]][last[0] + 1];

				var nexts = [];
				if (!!u && u.isPath) {
					nexts.push(u);
				}
				if (!!d && d.isPath) {
					nexts.push(d);
				}
				if (!!l && l.isPath) {
					nexts.push(l);
				}
				if (!!r && r.isPath) {
					nexts.push(r);
				}

				var t = null;
				nexts = nexts.filter(n => {
					var tag = n.x + '-' + n.y;
					if (used.includes(tag)) return false;
					if (n.x === target[0] && n.y === target[1]) {
						t = [n.x, n.y];
						notFound = false;
						return true;
					}
					used.push(tag);
					return true;
				});
				if (!!t) {
					targetPath = [...path];
					targetPath.push(t);
					return;
				}

				nexts.forEach(n => {
					var p = [...path];
					p.push([n.x, n.y]);
					nextPaths.push(p);
				});
			});
			paths = nextPaths;
			if (paths.length === 0) break;
		}
		if (!targetPath || targetPath.length === 0) {
			if (!!targetPos) {
				targetPos = null;
			}
			else {
				targetSpotList.splice(0, 1);
			}
			return;
		}

		plannedPath = targetPath;
		plannedPath.splice(0, 1);
		gotViaPath();
	};
	const gotViaPath = () => {
		var next = plannedPath.splice(0, 1)[0];
		if (plannedPath.length === 0) plannedPath = null;

		next = grid[next[1]][next[0]];
		next.times ++;
		lastPos[0] = Player.X;
		lastPos[1] = Player.Y;
		Player.X = next.x;
		Player.Y = next.y;
		moveRole(Player);
	};
	const movement = async (doThis=true) => {
		tmrMove = null;

		// 先处理当前格事件
		if (doThis) {
			updateMonsters();
			let last = Math.floor(timestamp / 1440);
			await dealCurrent();
			timestamp += TimeSpeed;
			let curr = Math.floor(timestamp / 1440);
			showTimeInfo();
			if (curr !== last) {
				dayOff();
				return;
			}
		}
		if (shouldStop) {
			return;
		}

		// 打怪物
		await hitMonster();
		if (shouldStop) {
			return;
		}

		// 移动到下一格
		if (!targetPos) {
			if (!!plannedPath) {
				gotViaPath();
			}
			else if (targetSpotList.length === 0) {
				randomWalk();
			}
			else {
				gotoTarget();
			}
		}
		else {
			if (!!plannedPath) {
				gotViaPath();
			}
			else {
				gotoTarget();
			}
		}

		// 打怪物
		await hitMonster();
		if (shouldStop) {
			return;
		}

		// 移动怪物
		moveMonsters();

		tmrMove = setTimeout(movement, 300);
	};
	const addHistory = (...events) => {
		events = events.filter(e => !!e);
		eventHistory.unshift(...events);
		eventHistory.splice(HistoryLimit);
		if (eventHistory.length > 0) EventList.innerText = eventHistory.join('\n');
	};
	const checkEventPath = async () => {
		var len = mapData.eventPath.length;
		var count = len - 1;
		for (let i = 0; i < count; i ++) {
			let d = Math.round(DayLimit / len * (i + 1)) + 1;
			if (d !== dayID) continue;
			await addEventPath(i);
			break;
		}
	};
	const addFinalEventPath = async () => {
		await addEventPath(mapData.eventPath.length - 1);
	};
	const addEventPath = async id => {
		var path = [...mapData.eventPath[id]];
		var house = path.splice(0, 1)[0];
		house = [...house];

		openedBlocks.push(house[1]);

		house[2] = mapData.houses[house[1].join('-')];
		foundSpotList.push(house[2]);

		house[3] = HouseInfo[house[0]];
		addHistory('发现新场所：' + house[3].name);
		await showFightResult('发现新场所', [house[3].name]);

		path.forEach(([x, y]) => {
			var e = grid[y][x];
			e.isPath = true;
			e.available = true;
			e.times = 0;
			e.monsters = [];
			pathBlocks.push([x, y]);
		});
	};
	const loopOff = () => {
		console.log('==========================> OVER');
		var lastT = 0, lastW = 0;
		Role.records.rates.forEach((rec, i) => {
			var r1 = 100, r2 = 100;
			if (rec[0] > 0) r1 = Math.round(rec[1] / rec[0] * 10000) / 100;
			var t = rec[0] - lastT, w = rec[1] - lastW;
			lastT = rec[0];
			lastW = rec[1];
			if (t > 0) r2 = Math.round(w / t * 10000) / 100;
			console.log('Day ' + (i + 1) + ': ' + r1 + '% \t/\t' + r2 + '% (' + t + ')');
		});
	};
	const dayOff = async () => {
		Role.records.rates.push([Role.records.total, Role.records.win]);
		if (dayID >= DayLimit + 2) {
			loopOff();
			return;
		}

		(() => {
			console.log('Win Rate Daily:');
			var lastT = 0, lastW = 0;
			Role.records.rates.forEach((rec, i) => {
				var r1 = 100, r2 = 100;
				if (rec[0] > 0) r1 = Math.round(rec[1] / rec[0] * 10000) / 100;
				var t = rec[0] - lastT, w = rec[1] - lastW;
				lastT = rec[0];
				lastW = rec[1];
				if (t > 0) r2 = Math.round(w / t * 10000) / 100;
				console.log('Day ' + (i + 1) + ': ' + r1 + '% \t/\t' + r2 + '% (' + t + ')');
			});
		}) ();

		plannedPath = null;
		targetSpotList = [];
		CasusStage.classList.add('dayoff');
		await wait(GameSpeed);

		await checkEventPath();

		var list = mapData.startPoints.map(([b, t]) => {
			var r = ((Player.X - b[0]) ** 2 + (Player.Y - b[1]) ** 2) ** 0.5;
			return [r, b, t];
		});
		list.sort((a, b) => a[0] - b[0]);
		var dis = list[0][0];
		list = list.filter(a => a[0] <= dis).map(a => [a[1], a[2]]);
		var target = list[Math.floor(Math.random() * list.length)];
		pointX = target[0][0];
		pointY = target[0][1];
		var morningType = target[1];
		if (morningType === 0) {
			Role.base.life += 5;
			addHistory("增加5点能量");
		}
		else if (morningType === 1) {
			Role.base.life += 2;
			addHistory("在民居过夜，增加2点能量");
		}
		else if (morningType === 2) {
			addHistory("在民居遗迹过夜");
		}
		else if (morningType === 3) {
			Role.base.life -= 2;
			addHistory("住在凶宅，损失2点能量");

			let house = mapData.houses[target[0][0] + '-' + target[0][1]];
			let list = getAvailableMonsters();
			let monster = list[Math.floor(Math.random() * list.length)];
			generateMonsterInfo(monster);
			addMonster(house.door, monster);
			addHistory('在凶宅门口遭遇' + monster.name);
		}
		else if (morningType === 4) {
			Role.base.life -= 5;
			addHistory("住在凶宅，损失5点能量");

			let house = mapData.houses[target[0][0] + '-' + target[0][1]];
			let list = getAvailableMonsters();
			let monster = list[Math.floor(Math.random() * list.length)];
			generateMonsterInfo(monster);
			addMonster(house.door, monster);
			addHistory('在凶宅门口遭遇' + monster.name);
		}
		lastPos = [pointX, pointY];
		Player.X = pointX;
		Player.Y = pointY;
		moveRole(Player);
		updateRoleInfo(Role);
		showRoleInfo();

		await wait(GameSpeed);
		CasusStage.classList.remove('dayoff');
		await wait(GameSpeed);

		updateTargetList();

		stopMove();
		if (Settings.autoDay) {
			await wait(GameSpeed * 2);
			startMove();
		}
	};
	const startMove = () => {
		if (!shouldStop) return;
		shouldStop = false;
		BtnMove.Icon.classList.remove('fa-circle-play');
		BtnMove.Icon.classList.add('fa-circle-pause');

		if (!!tmrMove) return;
		// setTimeout(() => {movement(false)}, 0);
		setTimeout(movement, 0);
	};
	const stopMove = () => {
		if (!!shouldStop) return;
		shouldStop = true;
		BtnMove.Icon.classList.add('fa-circle-play');
		BtnMove.Icon.classList.remove('fa-circle-pause');

		if (!tmrMove) return;
		clearTimeout(tmrMove);
		tmrMove = null;
	};
	const moveTrigger = () => {
		if (StoryLine.Shown) return;
		if (shouldStop) startMove();
		else stopMove();
	};
	const generateMonsterInfo = role => {
		role.base = {};
		role.slot = Math.max(4, GateOfNovosibirsk.Player.slot - 2 + Math.floor((Math.random() + Math.random()) / 2 * 5));
		role.bag = Math.max(10, GateOfNovosibirsk.Player.bag - 2 + Math.floor((Math.random() + Math.random()) / 2 * 5));
		role.base.life = Math.round(GateOfNovosibirsk.Player.life * monsterRate());
		role.base.speed = Math.round(GateOfNovosibirsk.Player.speed * monsterRate());
		role.base.attack = Math.round(GateOfNovosibirsk.Player.attack * monsterRate());
		role.base.defence = Math.round(GateOfNovosibirsk.Player.defence * monsterRate());
		role.equips = [];

		var totalLevel = 0, currLevel = 0;
		Role.equips.forEach(eq => totalLevel += eq.props.length);
		totalLevel = Math.round(totalLevel / Role.slot * role.slot + Math.random());

		var needAdd = false;
		if (Math.random() < -0.5) {
			for (let i = 0; i < role.slot; i ++) {
				let eq = newEquipment(0, false, i < 4 ? i : -1);
				role.equips.push(eq);
				currLevel += eq.props.length;
			}
			if (Math.random() < dayID / 50) {
				needAdd = true;
			}
		}
		else {
			for (let i = 0; i < role.slot; i ++) {
				let eq = newEquipment(0, true, i < 4 ? i : -1);
				role.equips.push(eq);
				currLevel += eq.props.length;
			}
			needAdd = true;
		}

		if (needAdd) {
			let left = totalLevel - currLevel;
			let idx = 0;
			while (left > 0) {
				eq = role.equips[idx];
				addEquipHalo(eq);
				left --;
				idx ++;
				if (idx === role.slot) idx = 0;
			}
		}

		updateRoleInfo(role);
		return role;
	};
	const updateRoleInfo = role => {
		role.life = role.base.life;
		role.speed = role.base.speed;
		role.attack = role.base.attack;
		role.defence = role.base.defence;
		var halo = {};
		halo.attack = 0;
		halo.defence = 0;
		role.halo = {};
		role.halo.speed = 0;
		role.halo.attack = 0;
		role.halo.defence = 0;
		role.halo.reflect = 0;
		role.halo.punchback = 0;
		role.halo.vampire = 0;
		role.halo.coma = 0;
		role.halo.ignore = false;
		role.equips.forEach(equip => {
			role.life += equip.life;
			role.speed += equip.speed;
			role.attack += equip.attack;
			role.defence += equip.defence;
			var props = getEquipProp(equip);
			if (props[0] > 0) halo.attack += props[0];
			if (props[1] > 0) halo.defence += props[1];
			if (props[2] > 0) role.halo.attack += props[2];
			if (props[3] > 0) role.halo.defence += props[3];
			if (props[4] > 0) role.halo.speed += props[4];
			if (props[5] > 0) role.halo.reflect += props[5];
			if (props[6] > 0) role.halo.punchback += props[6];
			if (props[7] > 0) role.halo.vampire += props[7];
			if (props[8] > 0) role.halo.coma += props[8];
			if (props[9]) role.halo.ignore = true;
		});

		role.attack = Math.round(role.attack * (1 + halo.attack));
		role.defence = Math.round(role.defence * (1 + halo.defence));
	};
	const monsterRate = () => {
		var rate = (Math.random() + Math.random() + Math.random() + Math.random()) / 2 - 1;
		rate = 1 + rate / 2;
		return rate;
	};
	const addMonster = (block, monster) => {
		var ele = addIcon(block[0], block[1], ['fa-icon', 'role', ...monster.icon]);
		ele.info = monster;
		monsterList.push(ele);
		var b = grid[block[1]][block[0]];
		if (!!b.monsters) b.monsters.push(ele);
	};
	const addIcon = (x, y, icon) => {
		let ele = newEle('i', ...icon);
		ele.X = x;
		ele.Y = y;
		ele.style.width = gridSize + 'px';
		ele.style.height = gridSize + 'px';
		ele.style.fontSize = (gridSize * 0.8) + 'px';
		MapArea.appendChild(ele);
		icons.push(ele);
		moveRole(ele);
		return ele;
	};
	const getAvailableMonsters = () => {
		return MonsterInfo.filter(m => {
			if (m.day > dayID) return false;
			if (m.name === Role.title) return false;

			var has = false;
			monsterList.some(ele => {
				if (ele.info === m) {
					has = true;
					return true;
				}
			});
			if (has) return false;
			return true;
		});
	};
	const updateMonsters = () => {
		var rate = 5 * (1 + dayID / 10);
		rate = MonsterRate * rate / (rate + monsterList.length ** 2);
		if (Math.random() > rate) return;

		var list = getAvailableMonsters();
		if (list.length === 0) return;

		var mc = Math.min(list.length, monsterCount + Math.round((dayID ** 0.7) / 6));
		for (let i = 0; i < mc; i ++) {
			let block = openedBlocks[Math.floor(Math.random() * openedBlocks.length)];

			let id = Math.floor(Math.random() * list.length);
			let m = list.splice(id, 1)[0];
			generateMonsterInfo(m);
			addMonster(block, m);
			addHistory(m.name + '出现在了镇上');
		}
	};
	const moveMonsters = () => {
		monsterList.forEach(m => {
			if (Math.random() < 0.6) return;
			var curr = grid[m.Y][m.X];
			var next = getNextBlock(m.X, m.Y, false);
			if (!!curr.monsters) {
				let idx = curr.monsters.indexOf(m);
				if (idx >= 0) curr.monsters.splice(idx, 1);
			}
			next.monsters.push(m);
			m.X = next.x;
			m.Y = next.y;
			moveRole(m);
		});
	};
	const getMonsterCard = (mon, isMonster=true) => {
		var info = {
			monster: isMonster,
			name: mon.name,
			icon: mon.icon,
			life: mon.life,
			speed: mon.speed,
			attack: mon.attack,
			defence: mon.defence,
			halo: mon.halo,
			process: 100,
			died: false,
			coma: false,
			origin: mon,
		};
		if (!isMonster) {
			info.name = info.name || GateOfNovosibirsk.Player.id;
			info.icon = info.icon || Role.icon;
		}
		else {
			let rate = Math.min(1, ((dayID + 15) / 25) ** 0.6);
			if (rate < 1) {
				info.life = Math.round(info.life * rate);
				info.speed = Math.round(info.speed * rate);
				info.attack = Math.round(info.attack * rate);
				info.defence = Math.round(info.defence * rate);
			}
		}
		return info;
	};
	const newRoleCard = (card, type="monster") => {
		var ui = newEle('div', 'war_card', type);

		var icon = ['fa-icon'];
		icon.push(...card.icon);
		icon = newEle('i', icon);
		ui.appendChild(icon);

		var name = newEle('span', 'name');
		name.innerText = card.name;
		ui.appendChild(name);

		var att = newEle('span', 'att');
		att.innerText = card.attack;
		ui.appendChild(att);

		var def = newEle('span', 'def');
		def.innerText = card.defence;
		ui.appendChild(def);

		var life = newEle('span', 'life');
		life.innerText = card.life;
		ui.life = life;
		ui.appendChild(life);

		var speed = newEle('span', 'speed');
		speed.innerText = card.speed;
		ui.speed = speed;
		ui.appendChild(speed);

		var hint = newEle('span', 'hint');
		ui.hint = hint;
		ui.appendChild(hint);

		return ui;
	};
	const calProp = (a, b) => {
		var p = 1;
		if (b > a) p = a / b;
		return p - b / a / 2 * p * p;
	};
	const calPower = (attacker, defencer, ignore) => {
		var power, def = ignore ? 0 : defencer.defence;
		if (attacker.attack > def) power = (attacker.attack - def) / defencer.life * attacker.speed;
		else power = 1 / defencer.life * attacker.speed;
		var p1 = calProp(attacker.speed, 2 * defencer.speed);
		var p2 = 1 - calProp(2 * attacker.speed, defencer.speed);
		var total = (1 - p1 - p2) * power;
		if (2 * attacker.attack > def) power = (2 * attacker.attack - def) / defencer.life * attacker.speed;
		else power = 1 / defencer.life * attacker.speed;
		total += p1 * power;
		return total;
	};
	const hitMonster = (g, mini=false) => new Promise(async res => {
		if (!g) {
			g = grid[Player.Y][Player.X];
			if (!g.monsters || g.monsters.length === 0) return res(false);
		}
		else {
			g.monsters = g.monsters || g;
		}
		WarZone.shown = true;

		var monsters = [], players = [];
		var hero = getMonsterCard(Role, false);
		var previews = [];
		previews.A = 0;
		previews.D = 0;
		players.push(hero);
		g.monsters.forEach((ele, i) => {
			if (!mini) {
				ele.parentElement.removeChild(ele);
				var idx = icons.indexOf(ele);
				if (idx >= 0) icons.splice(idx, 1);
				idx = monsterList.indexOf(ele);
				if (idx >= 0) monsterList.splice(idx, 1);
			}
			var mon = getMonsterCard(ele.info || ele);
			monsters.push(mon);

			var attacker = applyHalo(hero, mon.halo);
			var defencer = applyHalo(mon, hero.halo);
			var powerAtt = calPower(attacker, defencer, hero.halo.ignore);
			var powerDef = calPower(defencer, attacker, mon.halo.ignore);
			previews.push([powerAtt, powerDef]);
			previews.A += 1 / powerAtt;
			previews.D += powerDef;
		});
		previews.Ar = 1 / previews.A;
		if (Math.random() < dayID / 100) {
			while (previews.Ar > previews.D) {
				let idx = Math.floor(Math.random() * previews.length);
				let m = monsters[idx];
				m = JSON.parse(JSON.stringify(m));
				previews.A += 1 / previews[idx][0];
				previews.D += previews[idx][1];
				previews.Ar = 1 / previews.A;
				if (previews.Ar <= previews.D) {
					if (Math.random() < 0.5) {
						break;
					}
				}
				monsters.push(m);
			}
		}
		players.push(...monsters);

		anime = !Settings.autoFight;
		if (anime) {
			HeroWarZone.innerHTML = '';
			hero.ui = newRoleCard(hero, "hero");
			HeroWarZone.appendChild(hero.ui);

			MonsterWarZone.innerHTML = '';
			monsters.forEach(card => {
				card.ui = newRoleCard(card);
				MonsterWarZone.appendChild(card.ui);
			});

			await showWarZone();
		}

		var notDone = true, gifts = [];
		gifts.keys = 0;
		gifts.killer = null;
		if (anime) await wait(GameSpeed);
		Role.records.total += monsters.length;
		while (notDone) {
			if (anime) await wait(GameSpeed);
			let step = 100;
			players.forEach(info => {
				var s = Math.ceil(info.process / info.speed);
				if (s < step) step = s;
			});
			let goes = [];
			players.forEach(info => {
				info.process -= step * info.speed;
				if (info.process <= 0) {
					info.process += 100;
					goes.push(info);
				}
			});
			goes.sort((a, b) => a.process - b.process);

			for (let info of goes) {
				if (info.died || info.life <= 0) continue;
				if (info.coma) {
					if (anime) info.ui.classList.remove('coma');
					info.coma = false;
					continue;
				}

				let target = info.monster ? hero : monsters[Math.floor(monsters.length * Math.random())];

				if (anime) {
					info.ui.classList.add('hitter');
					await wait(GameSpeed / 2);
					target.ui.classList.add('hitted');
					await wait(GameSpeed);
					info.ui.classList.remove('hitter');
					target.ui.classList.remove('hitted');
				}

				let attacker = applyHalo(info, target.halo);
				let defencer = applyHalo(target, info.halo);

				let as = Math.random() * attacker.speed;
				let ds = Math.random() * defencer.speed;
				let burst = as > ds * 2;
				let block = ds > as * 2;

				let msgD = [], msgA = [];
				if (burst) {
					msgA.push('暴击');
					attacker.attack *= 2;
				}
				if (block) {
					if (anime) target.ui.hint.innerText = '闪避';
					continue;
				}

				let damage = attacker.attack - (info.halo.ignore ? 0 : defencer.defence);
				if (damage <= 0) {
					msgD.push('格挡');
					damage = 1;
				}

				msgD.push(0 - damage);

				target.life = Math.max(0, target.life - damage);
				if (target.life === 0) {
					target.died = true;
					msgD.push('被击杀');
				}
				else if (Math.random() <= info.halo.coma) {
					msgD.push('被击昏');
					target.coma = true;
					if (anime) target.ui.classList.add('coma');
				}

				if (info.halo.vampire > 0) {
					let v = Math.round(damage * info.halo.vampire);
					if (v > 0) {
						info.life += v;
						msgA.push('吸收' + v + '点能量');
					}
				}
				if (!info.halo.ignore) {
					if (target.halo.reflect > 0) {
						let r = Math.round(damage * target.halo.reflect);
						if (r > 0) {
							info.life = Math.max(0, info.life - r);
							msgA.push('反弹' + r + '点伤害');
						}
					}
					if (target.halo.punchback > 0) {
						let p = Math.round(defencer.defence * target.halo.punchback);
						if (p > 0) {
							info.life = Math.max(0, info.life - p);
							msgA.push('反击' + p + '点伤害');
						}
					}
				}

				if (anime) {
					info.ui.hint.innerText = msgA.join('\n');
					target.ui.hint.innerText = msgD.join('\n');
					info.ui.life.innerText = info.life;
					target.ui.life.innerText = target.life;
				}

				if (!target.died) continue;

				if (anime) {
					target.ui.style.opacity = 0;
					await wait(GameSpeed);
					target.ui.parentElement.removeChild(target.ui);
				}

				if (target.monster) {
					if (!mini) {
						let msg = `击退${target.name}！`;
						if (Math.random() <= KeyRate) {
							let count = 1;
							Object.values(target.origin.halo).forEach(i => count += !!i ? 1 : 0);
							Role.package.key += count;
							gifts.keys += count;
						}
						let eq = target.origin.equips[Math.floor(target.origin.equips.length * Math.random())];
						addEquipmentIntoBag(eq);
						gifts.push(eq.fullname);
						addHistory(msg);
						Role.records.win ++;
						Role.records.present ++;
						showRoleInfo();
					}

					let idx = monsters.indexOf(target);
					if (idx >= 0) monsters.splice(idx, 1);
					idx = players.indexOf(target);
					if (idx >= 0) monsters.splice(idx, 1);

					if (monsters.length === 0) {
						notDone = false;
						break;
					}
				}
				else {
					if (!mini) {
						addHistory(`被${info.name}击退！`);
						Role.title = info.name;
						Role.icon.forEach(i => Player.classList.remove(i));
						Role.icon = [...info.icon];
						Role.icon.forEach(i => Player.classList.add(i));
						Role.slot = info.origin.slot;
						Role.base.life = info.origin.base.life;
						Role.base.speed = info.origin.base.speed;
						Role.base.attack = info.origin.base.attack;
						Role.base.defence = info.origin.base.defence;
						Role.package.bag = [];
						Role.package.key = 0;
						Role.equips = [];
						info.origin.equips.forEach(eq => {
							Role.equips.push(eq);
							Role.package.bag.push(eq);
						});
						Role.records.present = 0;
						Role.records.dead ++;
						updateRoleInfo(Role);
						showRoleInfo();

						gifts.killer = info.name;
					}

					notDone = false;
					break;
				}
			}
		}

		if (Settings.allowMusic) {
			if (hero.died) {
				MscLose.currentTime = 0;
				MscLose.play();
			}
			else {
				MscWin.currentTime = 0;
				MscWin.play();
			}
		}

		if (anime) {
			await WarZone.parentElement.parentElement.parentElement.close();
		}

		if (mini) {
			WarZone.shown = false;

			if (Settings.autoStopAfterBattle) stopMove();
			res(hero.died);
			return;
		}

		g.monsters.splice(0, g.monsters.length);

		if (!!gifts.killer) gifts.splice(0, gifts.length);
		else if (gifts.keys > 0) gifts.unshift(gifts.keys + '把钥匙');
		if (hero.died) {
			gifts.push('与' + gifts.killer + '交换身体！');
		}
		else {
			gifts.unshift('获得奖励：');
		}
		await showFightResult(!hero.died, gifts);
		WarZone.shown = false;

		if (Settings.autoStopAfterBattle) stopMove();
		res(hero.died);

		if (1 === 0) {
			addHistory(`你战死了……`);
			shouldStop = true;
			newPopup('离开元宇宙', {
				top: '50%',
				left: '50%',
				width: '250px',
				height: '140px',
				onActive: pop => {
					pop.style.transform = 'translate(-50%, -50%)';
					PanelResult.Content.innerText = '你被击败，新西伯利亚之门元宇宙将强行将你拍出。';
					pop.UI.content.appendChild(PanelResult);
					pop.show();
				},
				onHide: pop => {
					ForbiddenCity.appendChild(PanelResult);
					CasusStage.parentElement.parentElement.parentElement.hide();
				},
			});
		}
	});
	const showWarZone = () => new Promise(res => {
		newPopup('战斗', {
			top: "50%",
			left: "50%",
			width: "850px",
			height: "500px",
			noCloser: true,
			onActive: pop => {
				pop.close = () => new Promise(res => {
					if (WarZone.onClosed) WarZone.onClosed();
					WarZone.onClosed = res;
					pop.hide();
				});
				pop.style.transform = "translate(-50%, -50%)";

				pop.UI.content.appendChild(WarZone);

				pop.show();
			},
			onShow: () => {
				res();
			},
			onHide: () => {
				ForbiddenCity.appendChild(WarZone);
				var onClosed = WarZone.onClosed;
				if (!onClosed) return;
				delete WarZone.onClosed;
				onClosed();
			},
		});
	});
	const showFightResult = (win, msgList) => new Promise(res => {
		newPopup('战斗结果', {
			top: '50%',
			left: '50%',
			width: '300px',
			height: (120 + msgList.length * 20) + 'px',
			onActive: pop => {
				pop.style.transform = 'translate(-50%, -50%)';

				pop.UI.content.classList.add('war_result');
				var title, content;
				content = newEle('div', 'content');
				if (win === true) {
					title = newEle('div', 'title', 'success');
					title.innerText = '战斗胜利！';
				}
				else if (win === false) {
					title = newEle('div', 'title', 'failed');
					title.innerText = '战斗失败！';
				}
				else {
					title = newEle('div', 'title');
					title.innerText = win;
				}
				content.innerText = msgList.join('\n');

				pop.UI.content.appendChild(title);
				pop.UI.content.appendChild(content);

				pop.show();

				pop.tmrCloser = setTimeout(() => {
					delete pop.tmrCloser;
					pop.hide();
				}, 2000);
			},
			onDeactive: pop => {
				if (!!pop.tmrCloser) {
					clearTimeout(pop.tmrCloser);
					delete pop.tmrCloser;
				}
			},
			onHide: pop => {
				res();
			},
		});
	});
	const appendStoreLine = (line, type) => {
		if (!StoryLine.Shown) return;
		var ele = newEle('div', 'storyline', type || 'narration');
		ele.innerText = line;
		StoryLine.content.appendChild(ele);
		ele.scrollIntoViewIfNeeded();
	};
	const triggerSettingPanel = () => {
		if (SettingPanel.shown) {
			SettingPanel.close();
		}
		else {
			showSettingPanel();
		}
	};
	const showSettingPanel = () => {
		if (!gameShown) return;
		if (StoryLine.Shown) return;
		if (SettingPanel.shown) return;
		SettingPanel.shown = true;
		newPopup('设置', {
			top: "50%",
			left: "50%",
			width: "250px",
			height: "350px",
			noCloser: true,
			onActive: pop => {
				StoryLine.Shown = true;
				pop.onClose = () => {
					Settings.autoDay = !!SettingPanel.AutoDay.opt.checked;
					Settings.autoFight = !!SettingPanel.AutoFight.opt.checked;
					Settings.autoBuild = !!SettingPanel.AutoBuild.opt.checked;
					Settings.autoUnlock = !!SettingPanel.AutoUnlock.opt.checked;
					Settings.allowMusic = !!SettingPanel.AllowMusic.opt.checked;
					Settings.autoStopAfterBattle = !!SettingPanel.AutoStopAfterBattle.opt.checked;
					Settings.autoUpdateEquipment = !!SettingPanel.AutoUpdateEquipment.opt.checked;

					pop.hide();
				};
				pop.style.transform = "translate(-50%, -50%)";

				SettingPanel.close = pop.onClose;
				SettingPanel.AutoDay.opt.checked = Settings.autoDay;
				SettingPanel.AutoFight.opt.checked = Settings.autoFight;
				SettingPanel.AutoBuild.opt.checked = Settings.autoBuild;
				SettingPanel.AutoUnlock.opt.checked = Settings.autoUnlock;
				SettingPanel.AllowMusic.opt.checked = Settings.allowMusic;
				SettingPanel.AutoStopAfterBattle.opt.checked = Settings.autoStopAfterBattle;
				SettingPanel.AutoUpdateEquipment.opt.checked = Settings.autoUpdateEquipment;
				pop.UI.content.appendChild(SettingPanel);

				pop.show();
			},
			onHide: () => {
				ForbiddenCity.appendChild(SettingPanel);
				StoryLine.Shown = false;
				SettingPanel.shown = false;
			},
		});
	};
	const requestUnlock = () => new Promise(res => {
		newPopup('发现一间锁住的房间', {
			top: '50%',
			left: '50%',
			width: '200px',
			height: '130px',
			noCloser: true,
			onActive: win => {
				win.onClose = (ok) => {
					win.hide();
					res(ok);
				};
				win.style.transform = 'translate(-50%, -50%)';
				win.UI.content.appendChild(RqtUnlock);
				win.show();
			},
			onHide: win => {
				ForbiddenCity.appendChild(RqtUnlock);
			},
		});
	});
	const getEquipName = equip => {
		return EquipmentTitles[Math.min(EquipmentTitles.length - 1, equip.props.length)] + equip.name;
	};
	const getEquipProp = equip => {
		var props = [], haloFactor = EquipHaloCount ** 0.8;
		for (let i = 0; i < 10; i ++) props[i] = 0;
		equip.props.forEach(([i, v]) => {
			props[i] += v;
		});
		props[0] = props[0] ** 1.5 / 2;
		props[1] = props[1] ** 1.5 / 2;
		if (props[2] > 0) props[2] /= haloFactor * 5;
		if (props[3] > 0) props[3] /= haloFactor;
		if (props[4] > 0) props[4] = Math.ceil(EquipSpeedMax / haloFactor * props[4]);
		if (props[5] > 0) props[5] = props[5] * props[5] * props[5] * props[5];
		if (props[6] > 0) props[6] = props[6] * props[6];
		if (props[7] > 0) props[7] /= haloFactor;
		if (props[8] > 0) props[8] /= haloFactor * 2;
		props[9] = props[9] > 0.9;
		return props;
	};
	const getEquipDesc = (equip, full=true) => {
		var desc = [];
		if (full) {
			if (equip.life > 0) desc.push('增加能量: ' + equip.life + '点');
			if (equip.speed > 0) desc.push('能量转换增速: ' + equip.speed + '点');
			if (equip.attack > 0) desc.push('破坏力: ' + equip.attack + '点');
			if (equip.defence > 0) desc.push('防护力: ' + equip.defence + '点');
		}

		var props = getEquipProp(equip);
		if (props[0] > 0) desc.push('放大自身破坏力' + Math.round(props[0] * 100) + '%');
		if (props[1] > 0) desc.push('放大自身防护力' + Math.round(props[1] * 100) + '%');
		if (props[2] > 0) desc.push('减弱对手破坏力' + Math.round(props[2] * 100) + '%');
		if (props[3] > 0) desc.push('减弱对手防护力' + Math.round(props[3] * 100) + '%');
		if (props[4] > 0) desc.push('减弱对手能量转换速度' + props[4] + '点');
		if (props[5] > 0) desc.push('反弹' + Math.round(props[5] * 100) + '%破坏');
		if (props[6] > 0) desc.push('强化反击' + Math.round(props[6] * 100) + '%防护');
		if (props[7] > 0) desc.push('将造成的' + Math.round(props[7] * 100) + '%破坏吸收为能量');
		if (props[8] > 0) desc.push('有' + Math.round(props[8] * 100) + '%几率造成昏迷');
		if (props[9]) desc.push('无视防御');

		return desc;
	};
	const addEquipHalo = (equip) => {
		var prop = [];
		prop[0] = Math.floor(Math.random() * 10);
		prop[1] = Math.random();
		equip.props.push(prop);
	};
	const newEquipment = (level=0, force=false, type=-1) => {
		var item = {};
		item.life = Math.floor(Math.random() * Math.random() * EquipLifeMax * EquipMainFactor);
		item.speed = Math.floor(Math.random() * Math.random() * EquipSpeedMax * EquipMainFactor);
		item.attack = Math.floor(Math.random() * Math.random() * Math.random() * Math.random() * EquipAttackMax * EquipMainFactor);
		item.defence = Math.floor(Math.random() * Math.random() * EquipDefenceMax * EquipMainFactor / 4);

		var main;
		if (type >= 0 && type <= 3) {
			main = type;
		}
		else {
			main = Math.floor(Math.random() * 4);
		}
		if (main === 0) {
			item.type = 'life';
			item.name = EquipmentNames.life[Math.floor(EquipmentNames.life.length * Math.random())];
			item.life = Math.floor(EquipLifeMax * (Math.random() * (1 - EquipMainFactor) + EquipMainFactor));
			item.speed = Math.max(item.speed, Math.floor(Math.random() * EquipSpeedMax * EquipMainFactor));
		}
		else if (main === 1) {
			item.type = 'speed';
			item.name = EquipmentNames.speed[Math.floor(EquipmentNames.speed.length * Math.random())];
			item.speed = Math.floor(EquipSpeedMax * (Math.random() * (1 - EquipMainFactor) + EquipMainFactor));
			item.attack = Math.max(item.attack, Math.floor(Math.random() * Math.random() * Math.random() * Math.random() * EquipAttackMax * EquipMainFactor));
		}
		else if (main === 2) {
			item.type = 'attack';
			item.name = EquipmentNames.attack[Math.floor(EquipmentNames.attack.length * Math.random())];
			item.attack = Math.floor(EquipAttackMax * (Math.random() * (1 - EquipMainFactor) + EquipMainFactor));
		}
		else if (main === 3) {
			item.type = 'defence';
			item.name = EquipmentNames.defence[Math.floor(EquipmentNames.defence.length * Math.random())];
			item.defence = Math.floor(EquipDefenceMax * (Math.random() * (1 - EquipMainFactor) + EquipMainFactor) / 4);
			item.life = Math.max(item.life, Math.floor(Math.random() * Math.random() * Math.random() * EquipLifeMax));
			item.speed = Math.max(item.speed, Math.floor(Math.random() * Math.random() * Math.random() * EquipSpeedMax));
		}

		var count = 0;
		if (force) {
			count = level;
		}
		else {
			for (let i = 0; i < EquipHaloCount; i ++) {
				if (Math.random() < (dayID / 50) ** 1.5) count ++;
			}
			if (count < level) count = level;
		}
		item.props = [];
		for (let i = 0; i < count; i ++) {
			addEquipHalo(item);
		}
		item.fullname = getEquipName(item);

		return item;
	};
	const applyHalo = (role, halo) => {
		var result = {};
		result.life = role.life;
		result.speed = Math.max(0, role.speed - halo.speed);
		result.attack = Math.max(0, Math.floor(role.attack * (1 - halo.attack)));
		result.defence = Math.max(0, Math.floor(role.defence * (1 - halo.defence)));
		if (role.life === 0) {
			result.speed = 0;
			result.attack = 0;
			result.defence = 0;
		}
		return result;
	};
	const triggerEquipments = () => {
		if (Equipments.shown) {
			Equipments.close();
		}
		else {
			showEquipments();
		}
	};
	const showEquipments = () => {
		if (!gameShown) return;
		if (WarZone.shown) return;
		if (Equipments.shown) return;
		Equipments.shown = true;

		var ss = shouldStop;
		if (!ss) stopMove();
		newPopup('我的装备', {
			top: "50%",
			left: "50%",
			width: "650px",
			height: "700px",
			onActive: pop => {
				pop.style.transform = "translate(-50%, -50%)";

				Equipments.close = pop.hide;
				Equipments.Body.innerHTML = '';
				Equipments.Body.Title.innerText = Role.slot;
				Equipments.Pack.innerHTML = '';
				Equipments.Pack.Title.innerHTML = Role.bag;
				Equipments.Info.innerHTML = '无附加属性';
				Equipments.Info.Name.innerText = '无';
				Equipments.Info.Life.innerText = 0;
				Equipments.Info.Speed.innerText = 0;
				Equipments.Info.Attack.innerText = 0;
				Equipments.Info.Defence.innerText = 0;

				Role.equips.forEach(eq => {
					var ele = newEle('div', 'item');
					var icon = newEle('i', 'icon', ...EquipIcon[eq.type]);
					ele.appendChild(icon);
					var btn = newEle('span', 'button');
					btn.innerText = '卸下';
					ele.appendChild(btn);
					ele.INDEX = Role.package.bag.indexOf(eq);
					ele.setAttribute('name', ele.INDEX);
					Equipments.Body.appendChild(ele);
				});
				updateEquipmentHalo();

				(() => {
					var ele = newEle('div', 'item', 'invalid');
					var icon = newEle('i', 'icon', 'fa-solid', 'fa-staff-aesculapius');
					ele.appendChild(icon);
					ele.INDEX = -2;
					ele.setAttribute('name', ele.INDEX);
					Equipments.Pack.appendChild(ele);
				}) ();
				if (Role.package.key > 0) {
					let ele = newEle('div', 'item', 'invalid');
					let icon = newEle('i', 'icon', 'fa-solid', 'fa-key');
					ele.appendChild(icon);
					let count = newEle('span', 'value');
					count.innerText = Role.package.key;
					ele.appendChild(count);
					ele.INDEX = -1;
					ele.setAttribute('name', ele.INDEX);
					Equipments.Pack.appendChild(ele);
				}
				Role.package.bag.forEach((eq, idx) => {
					var ele = newEle('div', 'item');
					var icon = newEle('i', 'icon', ...EquipIcon[eq.type]);
					ele.appendChild(icon);
					if (Role.equips.indexOf(eq) >= 0) {
						ele.classList.add('mounted');
					}
					ele.INDEX = idx;
					ele.setAttribute('name', ele.INDEX);
					Equipments.Pack.appendChild(ele);
				});

				pop.UI.content.appendChild(Equipments);
				pop.show();
			},
			onHide: pop => {
				ForbiddenCity.appendChild(Equipments)
				if (!ss) startMove();
				Equipments.shown = false;
			},
		});
	};
	const updateEquipmentHalo = () => {
		var halo = [];
		for (let i = 0; i < 10; i ++) {
			halo[i] = 0;
		}
		Role.equips.forEach(equip => {
			var props = getEquipProp(equip);
			for (let i = 0; i < 9; i ++) {
				if (props[i] > 0) halo[i] += props[i];
			}
			if (props[9]) halo[9] = true;
		});

		var desc = [];
		if (halo[0] > 0) desc.push('放大自身破坏力' + Math.round(halo[0] * 100) + '%');
		if (halo[1] > 0) desc.push('放大自身防护力' + Math.round(halo[1] * 100) + '%');
		if (halo[2] > 0) desc.push('减弱对手破坏力' + Math.round(halo[2] * 100) + '%');
		if (halo[3] > 0) desc.push('减弱对手防护力' + Math.round(halo[3] * 100) + '%');
		if (halo[4] > 0) desc.push('减弱对手能量转换速度' + halo[4] + '点');
		if (halo[5] > 0) desc.push('反弹' + Math.round(halo[5] * 100) + '%破坏');
		if (halo[6] > 0) desc.push('强化反击' + Math.round(halo[6] * 100) + '%防护');
		if (halo[7] > 0) desc.push('将造成的' + Math.round(halo[7] * 100) + '%破坏吸收为能量');
		if (halo[8] > 0) desc.push('有' + Math.round(halo[8] * 100) + '%几率造成昏迷');
		if (halo[9]) desc.push('无视防御');
		Equipments.Body.Halo.innerText = desc.join('\n');
	};
	const showEquipmentInfo = id => {
		if (id === -1) {
			Equipments.Info.Name.innerText = "钥匙";
			Equipments.Info.Life.innerText = Role.package.key;
			Equipments.Info.Speed.innerText = "∞";
			Equipments.Info.Attack.innerText = "∞";
			Equipments.Info.Defence.innerText = "∞";
			Equipments.Info.innerText = '可以打开被锁住的房间';
			return;
		}
		else if (id === -2) {
			Equipments.Info.Name.innerText = EquipmentNames.connector;
			Equipments.Info.Life.innerText = "∞";
			Equipments.Info.Speed.innerText = "∞";
			Equipments.Info.Attack.innerText = "∞";
			Equipments.Info.Defence.innerText = "∞";
			Equipments.Info.innerText = '激活后可与最近的赛灵格互换身体，并有机会一窥其内心世界。';
			return;
		}

		var equip = Role.package.bag[id];
		if (!equip) return;

		Equipments.Info.Name.innerText = equip.fullname;
		Equipments.Info.Life.innerText = equip.life;
		Equipments.Info.Speed.innerText = equip.speed;
		Equipments.Info.Attack.innerText = equip.attack;
		Equipments.Info.Defence.innerText = equip.defence;

		var info = getEquipDesc(equip, false);
		if (info.length === 0) Equipments.Info.innerText = '无附加属性';
		else Equipments.Info.innerText = info.join('\n');
	};
	const takeOffEquipment = id => {
		var eq = Role.package.bag[id];

		var idx = Role.equips.indexOf(eq);
		if (idx >= 0) Role.equips.splice(idx, 1);
		var ele = Equipments.Body.querySelector('div.item[name="' + id + '"]')
		if (!!ele) Equipments.Body.removeChild(ele);

		ele = Equipments.Pack.querySelector('div.item.mounted[name="' + id + '"]')
		if (!!ele) ele.classList.remove('mounted');

		updateRoleInfo(Role);
		showRoleInfo();
		updateEquipmentHalo();
	};
	const takeOnEquipment = id => {
		if (Role.equips.length >= Role.slot) return;

		var ele = Equipments.Pack.querySelector('div.item[name="' + id + '"]')
		if (!ele) return;
		if (ele.classList.contains('mounted')) return;
		ele.classList.add('mounted');

		var eq = Role.package.bag[id];
		var idx = Role.equips.indexOf(eq);
		if (idx >= 0) return;
		Role.equips.push(eq);

		var ui = newEle('div', 'item');
		var icon = newEle('i', 'icon', ...EquipIcon[eq.type]);
		ui.appendChild(icon);
		var btn = newEle('span', 'button');
		btn.innerText = '卸下';
		ui.appendChild(btn);
		ui.INDEX = id;
		ui.setAttribute('name', id);
		Equipments.Body.appendChild(ui);

		updateRoleInfo(Role);
		showRoleInfo();
		updateEquipmentHalo();
	};
	const addEquipmentIntoBag = eq => {
		var list = [];
		Role.package.bag.forEach((e, i) => {
			if (Role.equips.includes(e)) return;
			list.push(i);
		});
		if (list.length >= Role.bag) {
			let item = list[0];
			Role.package.bag.splice(item, 1);
		}
		Role.package.bag.push(eq);

		if (!Settings.autoUpdateEquipment) return;

		if (Role.equips.length < Role.slot) {
			Role.equips.push(eq);
			return;
		}

		list = [];
		Role.equips.forEach((_, i) => {
			var copy1 = {}, copy2 = {};
			copy1.base = {
				life: Role.base.life,
				speed: Role.base.speed,
				attack: Role.base.attack,
				defence: Role.base.defence,
			};
			copy2.base = {
				life: Role.base.life,
				speed: Role.base.speed,
				attack: Role.base.attack,
				defence: Role.base.defence,
			};
			copy1.equips = [...Role.equips];
			copy2.equips = [...Role.equips];
			copy2.equips.splice(i, 1, eq);

			updateRoleInfo(copy1);
			updateRoleInfo(copy2);

			var attacker = applyHalo(copy2, copy1.halo);
			var defencer = applyHalo(copy1, copy2.halo);
			var powerAtt = calPower(attacker, defencer, copy2.halo.ignore);
			var powerDef = calPower(defencer, attacker, copy1.halo.ignore);
			var score = powerAtt - powerDef;
			if (score > 0) {
				list.push([i, score]);
			}
		});
		if (list.length === 0) return;
		list.sort((eq1, eq2) => eq2[1] - eq1[1]);
		list = list[0][0];
		Role.equips.splice(list, 1, eq);
	};
	const pickRuinHouses = () => {
		var house = Object.values(mapData.houses)
			.filter(info => info.sort === 'ruin')
			.map(h => [h, grid[h.pos[1]][h.pos[0]]])
			.filter(info => !info[1].closed)
			.map(h => h[0]);
		return house;
	};
	const rebuildRuin = (x, y) => {
		var h = mapData.houses[x + '-' + y];
		h.sort = 'house';
		var g = grid[y][x];
		g.terrain = 'house';
		icons.some((icon, idx) => {
			if (icon.X !== x || icon.Y !== y) return false;
			icon.classList.remove('ruin');
			return true;
		});
	};

	window.addEventListener('resize', onResize);
	MapCanvas.addEventListener('mousemove', evt => {
		var x = Math.floor(evt.offsetX / gridSize);
		var y = Math.floor(evt.offsetY / gridSize);
		if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) {
			lastX = pointX;
			lasyY = pointY;
			showGridInfo(pointX, pointY);
			return;
		}
		if (x === lastX && y === lastY) return;
		lastX = x;
		lastY = y;
		showGridInfo(x, y);
	});
	MapCanvas.addEventListener('mousedown', evt => {
		var x = Math.floor(evt.offsetX / gridSize);
		var y = Math.floor(evt.offsetY / gridSize);
		if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) return;
		pointX = x;
		pointY = y;

		var g = grid[y][x];
		if (g.isPath) {
			targetPos = [x, y];
		}
		else if (g.terrain === 'house' || g.terrain === 'ruin') {
			let h = mapData.houses[g.x + '-' + g.y];
			let gg = grid[h.door[1]][h.door[0]];
			if (gg.isPath) targetPos = [...h.door];
		}
		if (!!targetPos) {
			plannedPath = null;
		}

		showGridInfo(x, y);
	});
	MapCanvas.addEventListener('mouseout', evt => {
		showGridInfo(pointX, pointY);
	});
	BtnEquipment.addEventListener('click', showEquipments);
	BtnMemory.addEventListener('click', () => {
		newPopup('我的记忆', {
			bottom: "5%",
			right: "5%",
			width: "300px",
			height: "600px",
			onActive: p => {
				p.show();
			},
		});
	});
	BtnMove.addEventListener('click', moveTrigger);
	BtnConfig.addEventListener('click', showSettingPanel);
	TargetList.addEventListener('click', evt => {
		var ele = evt.target;
		var type = ele.getAttribute('type');
		if (!type) return;
		TargetList.removeChild(ele);
		var idx = -1;
		targetSpotList.some((t, i) => {
			if (t.type === type) {
				idx = i;
				return true;
			}
		});
		if (idx >= 0) targetSpotList.splice(idx, 1);
	});
	StoryLine.Button.OK.addEventListener('click', () => {
		if (StoryLine.Shown && !!StoryLine.Event.OK) StoryLine.Event.OK();
	});
	StoryLine.Button.Yes.addEventListener('click', () => {
		if (StoryLine.Shown && !!StoryLine.Event.Yes) StoryLine.Event.Yes();
	});
	StoryLine.Button.No.addEventListener('click', () => {
		if (StoryLine.Shown && !!StoryLine.Event.No) StoryLine.Event.No();
	});
	StoryLine.Button.Cancel.addEventListener('click', () => {
		if (StoryLine.Shown && !!StoryLine.Event.Cancel) StoryLine.Event.Cancel();
	});
	SettingPanel.AutoDay.addEventListener('click', () => {
		SettingPanel.AutoDay.opt.checked = !SettingPanel.AutoDay.opt.checked;
	});
	SettingPanel.AutoFight.addEventListener('click', () => {
		SettingPanel.AutoFight.opt.checked = !SettingPanel.AutoFight.opt.checked;
	});
	SettingPanel.AutoBuild.addEventListener('click', () => {
		SettingPanel.AutoBuild.opt.checked = !SettingPanel.AutoBuild.opt.checked;
	});
	SettingPanel.AutoUnlock.addEventListener('click', () => {
		SettingPanel.AutoUnlock.opt.checked = !SettingPanel.AutoUnlock.opt.checked;
	});
	SettingPanel.AllowMusic.addEventListener('click', () => {
		SettingPanel.AllowMusic.opt.checked = !SettingPanel.AllowMusic.opt.checked;
	});
	SettingPanel.AutoStopAfterBattle.addEventListener('click', () => {
		SettingPanel.AutoStopAfterBattle.opt.checked = !SettingPanel.AutoStopAfterBattle.opt.checked;
	});
	SettingPanel.AutoUpdateEquipment.addEventListener('click', () => {
		SettingPanel.AutoUpdateEquipment.opt.checked = !SettingPanel.AutoUpdateEquipment.opt.checked;
	});
	SettingPanel.querySelector('div.button button').addEventListener('click', () => {
		SettingPanel.parentElement.parentElement.parentElement.onClose();
	});
	RqtUnlock.querySelector('div.panel button.btn_ok').addEventListener('click', () => {
		RqtUnlock.parentElement.parentElement.parentElement.onClose(true);
	});
	RqtUnlock.querySelector('div.panel button.btn_cancel').addEventListener('click', () => {
		RqtUnlock.parentElement.parentElement.parentElement.onClose(false);
	});
	RqtBuild.querySelector('div.panel button.btn_ok').addEventListener('click', () => {
		RqtBuild.parentElement.parentElement.parentElement.onClose();
	});
	RqtBuild.querySelector('div.content div.icons').addEventListener('click', evt => {
		var ele = evt.target;
		var name = ele.getAttribute('name');
		if (!name) return;

		if (!!RqtBuild.LastItem) RqtBuild.LastItem.classList.remove('selected');
		RqtBuild.LastItem = ele;
		ele.classList.add('selected');
		RqtBuild.HouseName = name;
	});
	PanelResult.querySelector('div.panel button').addEventListener('click', () => {
		PanelResult.parentElement.parentElement.parentElement.hide();
	});
	Equipments.Body.addEventListener('mouseover', evt => {
		var ele = evt.target;
		if (ele.tagName === 'SPAN') ele = ele.parentElement;
		else if (ele.tagName === 'I') ele = ele.parentElement;
		if (isNaN(ele.INDEX)) return;
		showEquipmentInfo(ele.INDEX);
	});
	Equipments.Body.addEventListener('click', evt => {
		var ele = evt.target;
		if (ele.tagName !== 'SPAN') return;
		ele = ele.parentElement;
		if (isNaN(ele.INDEX)) return;

		takeOffEquipment(ele.INDEX);
	});
	Equipments.Pack.addEventListener('mouseover', evt => {
		var ele = evt.target;
		if (ele.tagName === 'SPAN') ele = ele.parentElement;
		else if (ele.tagName === 'I') ele = ele.parentElement;
		if (isNaN(ele.INDEX)) return;
		showEquipmentInfo(ele.INDEX);
	});
	Equipments.Pack.addEventListener('click', evt => {
		var ele = evt.target;
		if (ele.tagName === 'SPAN') ele = ele.parentElement;
		else if (ele.tagName === 'I') ele = ele.parentElement;
		if (isNaN(ele.INDEX)) return;

		if (ele.classList.contains('mounted')) {
			takeOffEquipment(ele.INDEX);
			return;
		}
		takeOnEquipment(ele.INDEX);
	});

	Utils.addHistory = addHistory;
	Utils.hitMonster = hitMonster;
	Utils.pickRuinHouses = pickRuinHouses;
	Utils.rebuildRuin = rebuildRuin;
	Utils.newEquipment = newEquipment;
	Utils.addEquipHalo = addEquipHalo;
	Utils.getEquipName = getEquipName;
	Utils.updateRoleInfo = updateRoleInfo;
	Utils.addEquipmentIntoBag = addEquipmentIntoBag;
	Utils.showFightResult = showFightResult;
	Utils.addEquipmentIntoBag = addEquipmentIntoBag;
	Utils.addFinalEventPath = addFinalEventPath;

	GateOfNovosibirsk.startGameLoop = () => {
		window.Role = Role;
		Role.title = PlayerInfo.titles[GateOfNovosibirsk.Player.title];
		Role.icon = ["fa-solid", "fa-user-secret"];
		Role.base = {};
		Role.base.life = GateOfNovosibirsk.Player.life;
		Role.base.speed = GateOfNovosibirsk.Player.speed;
		Role.base.attack = GateOfNovosibirsk.Player.attack;
		Role.base.defence = GateOfNovosibirsk.Player.defence;
		Role.equips = [];
		Role.slot = GateOfNovosibirsk.Player.slot;
		Role.bag = GateOfNovosibirsk.Player.bag;
		Role.package = {
			key: 0,
			bag: [],
		};
		Role.records = {
			dead: 0,
			total: 0,
			win: 0,
			present: 0,
			rates: []
		};
		for (let i = 0; i < Role.slot; i ++) {
			let eq = newEquipment(0, false, i < 4 ? i : -1);
			Role.equips.push(eq);
			Role.package.bag.push(eq);
		}
		updateRoleInfo(Role);
		MonsterInfo[0].name = Role.title;
		MonsterInfo[0].icon = Role.icon;

		PersonelArea.querySelector('div.name').innerText = GateOfNovosibirsk.Player.id.toUpperCase() + '【' + Role.title + '】';
		showRoleInfo();

		newPopup('新西伯利亚之门', {
			top: '5%',
			left: '5%',
			width: '90%',
			height: '90%',
			notBlurBG: true,
			noCloser: true,
			onActive: win => {
				loadMap();
				win.UI.content.appendChild(CasusStage);
				win.show();
			},
			onLoad: win => {
				gameShown = true;
				onResize();
			},
			onShow: async win => {
				await wait(GameSpeed);
				popStoryLine = newPopup('来自虚空的声音', {
					top: '50%',
					left: '50%',
					width: '650px',
					height: '400px',
					noCloser: true,
					onShow: async () => {
						StoryLine.content.innerHTML = '';
						StoryLine.Shown = true;
						StoryLine.Button.OK.style.display = 'inline-block';
						StoryLine.Event.OK = () => {
							popStoryLine.hide();
						};

						appendStoreLine('一点亮光融化了四周无尽的黑暗……');
						await wait(GameSpeed);
						appendStoreLine('我：这……这里是哪？', 'local');
						await wait(GameSpeed);
						appendStoreLine('【我看了看自己的双手】', 'local');
						await wait(GameSpeed);
						appendStoreLine('我：我……我的身体又是怎么了？', 'local');
						await wait(GameSpeed * 1.5);
						appendStoreLine('虚空之声：现在的你是你本体的赛灵格。', 'remote');
						await wait(GameSpeed);
						appendStoreLine('我：赛……赛灵格……', 'local');
						await wait(GameSpeed * 1.5);
						appendStoreLine('虚空之声：也就是灵魂碎片。真正的你正在上一层元宇宙看着你。', 'remote');
						await wait(GameSpeed * 1.5);
						appendStoreLine('我：这里是哪里？你又是谁？', 'local');
						await wait(GameSpeed * 1.5);
						appendStoreLine('虚空之声：这里是新西伯利亚之门，你的本体分化出了你来探索这个异常了的元宇宙。', 'remote');
						await wait(GameSpeed);
						appendStoreLine('虚空之声：而我，是这个元宇宙的观察者，我会协助你探索这里。', 'remote');
						await wait(GameSpeed * 1.5);
						appendStoreLine('我：那……我应该怎么做？', 'local');
						await wait(GameSpeed * 2);
						appendStoreLine('虚空之声：你能在这个世界停留最多28天，28天后这个元宇宙会将你强行挤走，所以你必须在28天内找出线索。', 'remote');
						await wait(GameSpeed / 2);
						appendStoreLine('每天清晨你都会想到一些想去的地方，那里有什么没人知道，但你可以通过点击【右侧面板】中的【目标地标】来删除这些预想的目标，同时通过点击地图来让走到那里进行探索。', 'remote');
						await wait(GameSpeed / 2);
						appendStoreLine('地图上会出现一些由这个世界的BUG凝聚而成的傀儡，你必须击败它们，否则可能会提前离开这个元宇宙。', 'remote');
						await wait(GameSpeed / 2);
						appendStoreLine('每天凌晨，你都会进入最近的房间进行休息，但要小心，如果那是凶宅的话，你会倒霉的哦！', 'remote');
						await wait(GameSpeed / 2);
						appendStoreLine('当然，别忘了你可以通过点击左上角的按钮或按下【空格键】来暂停或继续这个世界的运行，这是作为上层元宇宙中的本体对这个元宇宙非常有限的操控权。', 'remote');
						await wait(GameSpeed / 2);
						appendStoreLine('好了，' + PlayerInfo.titles[GateOfNovosibirsk.Player.title] + GateOfNovosibirsk.Player.id + '，开始你的探索吧！', 'remote');
					},
					onHide: async () => {
						StoryLine.Shown = false;
						ForbiddenCity.appendChild(StoryLine);
						// await wait(GameSpeed * 2);
						// if (Settings.autoDay) startMove();
					},
				});
				popStoryLine.style.transform = 'translate(-50%, -50%)';
				popStoryLine.UI.content.appendChild(StoryLine);
				popStoryLine.show();
			},
			onDeactive: win => {
				CmdLineHint.style.display = '';
				PanelStage.classList.remove('fadeout');
			},
			onHide: win => {
				gameShown = false;
				if (!!tmrMove) clearTimeout(tmrMove);
				ForbiddenCity.appendChild(CasusStage);
			},
			onUnload: win => {
				stopMove();
				icons.forEach(i => {
					if (i === Player) return;
					if (!i.parentElement) return;
					i.parentElement.removeChild(i);
				});
				GateOfNovosibirsk.canInput = true;
				GateOfNovosibirsk.stage = 1;
			},
		});
	};
	GateOfNovosibirsk.moveTrigger = () => {
		if (StoryLine.Shown) return;
		if (GateOfNovosibirsk.stage !== 2) return;
		if (shouldStop) startMove();
		else stopMove();
	};
	GateOfNovosibirsk.settingTrigger = triggerSettingPanel;
	GateOfNovosibirsk.showPackage = triggerEquipments;
}) ();