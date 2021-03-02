(() => {
	class Role {
		type = 'human';
		name = '乖宝宝';
		score = 0;
		char = [0, 0, 0, 0, 0, false];
		blackCount = 0;
		blackWin = 0;
		blackLose = 0;
		whiteCount = 0;
		whiteWin = 0;
		whiteLose = 0;
	}

	const AITesterOne = new Role();
	AITesterOne.type = 'aiOne';
	AITesterOne.name = '阿呆';
	AITesterOne.char = [0.95, 0, 0, 1, 0, false];

	const AITesterTwo = new Role();
	AITesterTwo.type = 'aiOne';
	AITesterTwo.name = '阿瓜';
	AITesterTwo.char = [0.05, 0, 0, 1, 0, false];

	const AIJack = new Role();
	AIJack.type = 'aiFour';
	AIJack.name = '杰克船长';
	AIJack.char = [0.5, 0, 3, 5, 0.15, false, 2, 2, 0.5];

	const AIManager = {};
	AIManager.AIList = [];
	AIManager.init = (ui, callback) => {
		var roleChar = {};

		var list = ui.querySelector('select[name="RoleType"]');
		var html = '<option value="human">人类</option>';
		html += '<option value="aiOne">AI-1</option>';
		html += '<option value="aiTwo">AI-2</option>';
		html += '<option value="aiThree">AI-3</option>';
		list.innerHTML = html;
		ui._roleType = list;
		ui._roleName = ui.querySelector('input[name="Name"]');
		ui._attacktive = ui.querySelector('input[name="Attacktive"]');
		ui._attitude = ui.querySelector('input[name="Attitude"]');
		ui._deep = ui.querySelector('input[name="Deepth"]');
		ui._range = ui.querySelector('input[name="Range"]');
		ui._outside = ui.querySelector('input[name="Outsider"]');
		ui._deepRange = ui.querySelector('input[name="DeepRange"]');
		ui._decayPower = ui.querySelector('input[name="DecayPower"]');
		ui._decayRate = ui.querySelector('input[name="DecayRate"]');

		[].forEach.call(ui.querySelectorAll('span.radio'), ui => {
			var name = ui.radio.name;
			if (ui.radio.checked) roleChar[name] = ui.radio.value;
			ui.addEventListener('click', () => {
				ui.radio.checked = true;
				roleChar[name] = ui.radio.value;
			});
			ui.radio.addEventListener('click', () => {
				ui.radio.checked = true;
				roleChar[name] = ui.radio.value;
			});
		});

		ui.querySelector('.controller .btn.cancel').addEventListener('click', () => {
			ui.classList.remove('show');
		});
		ui.querySelector('.controller .btn.ok').addEventListener('click', () => {
			var role = new Role();
			var type = ui._roleType.value
			role.type = type;
			role.name = ui._roleName.value;
			role.char[0] = ui._attacktive.valueAsNumber;
			role.char[1] = ui._attitude.valueAsNumber;
			role.char[2] = ui._deep.valueAsNumber;
			role.char[3] = ui._range.valueAsNumber;
			role.char[4] = ui._outside.valueAsNumber;
			role.char[5] = roleChar.ThinkAsEnemy === 'true';
			if (type === 'aiThree') {
				role.char[6] = ui._deepRange.valueAsNumber;
				role.char[7] = ui._decayPower.valueAsNumber;
				role.char[8] = ui._decayRate.valueAsNumber;
			}
			AIManager.AIList.push(role);
			localStorage.AIList = JSON.stringify(AIManager.AIList);
			callback();
			ui.classList.remove('show');
		});

		list.addEventListener('click', (evt) => {
			var sel = list.options[list.selectedIndex].value;
			ui.setAttribute('currentoption', sel);
		});
	};
	AIManager.prepare = () => {
		var list = [new Role(), AITesterOne, AITesterTwo, AIJack];
		localStorage.AIList = JSON.stringify(list);
		AIManager.AIList = list;
	};
	AIManager.load = () => {
		var list = localStorage.AIList;
		if (!list) {
			AIManager.prepare();
		}
		else {
			try {
				list = JSON.parse(list);
				list = list.map(r => {
					var role = new Role();
					for (let key in r) {
						role[key] = r[key];
					}
					return role;
				});
				AIManager.AIList = list;
			}
			catch {
				AIManager.prepare();
			}
		}
		return AIManager.AIList;
	};
	AIManager.save = () => {
		localStorage.AIList = JSON.stringify(AIManager.AIList);
	};

	window.RushGo = window.RushGo || {};
	window.RushGo.AIManager = AIManager;
}) ();