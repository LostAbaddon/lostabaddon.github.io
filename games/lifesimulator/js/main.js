const LifeSimulator = {};

(() => {
	const UIS = {};
	var playerPoints = {};
	var currentSheet, currentChoises;
	var currentIndex = -1;
	var resultPoints = null;
	var popGameOverInfo;

	LifeSimulator.startNewLife = async (id) => {
		playerPoints = {};
		resultPoints = null;

		UIS.sheet = ScnPlay.querySelector('div.sheet');
		UIS.cover = ScnPlay.querySelector('div.cover');
		UIS.hint = ScnPlay.querySelector('div.hint');
		UIS.option = [];
		UIS.option.push(ScnPlay.querySelector('button[name="option1"]'));
		UIS.option.push(ScnPlay.querySelector('button[name="option2"]'));
		UIS.option.push(ScnPlay.querySelector('button[name="option3"]'));
		UIS.option.push(ScnPlay.querySelector('button[name="option4"]'));
		UIS.option.push(ScnPlay.querySelector('button[name="option5"]'));

		window.WorldLine = window['StoryLine' + id];
		if (WorldLine.init) WorldLine.init(playerPoints);
		currentSheet = WorldLine.events[WorldLine.start] || {};

		showStorySheet();

		ScnWelcome.classList.add('gone');
		ScnPlay.classList.remove('waiting');
	};
	LifeSimulator.gotoChoise = async id => {
		for (let i = 0; i < 5; i ++) {
			UIS.option[i].style.display = 'none';
		}
		if (currentChoises.length === 0) {
			if (currentSheet.finish) {
				if (!!WorldLine.step) WorldLine.step(playerPoints);
				gameOver();
			}
			else {
				currentSheet = WorldLine.events[currentSheet.next];
				UIS.sheet.classList.add('hide');
				await wait(300);
				showStorySheet();
			}
			return;
		}
		else if (currentIndex >= 0) {
			UIS.hint.classList.add('hide');
			await wait(300);
			showStorySheet();
			return;
		}

		var choise = currentChoises[id];
		var result = {};
		if (choise.goto instanceof Function) {
			result = choise.goto(playerPoints);
		}
		result = Object.assign({}, choise, result);
		if (!!result.points) {
			for (let key in result.points) {
				let value = result.points[key] || 0;
				playerPoints[key] = (playerPoints[key] || 0) + value;
			}
		}
		if (!!WorldLine.step) WorldLine.step(playerPoints);

		UIS.hint.classList.add('hide');

		if (!!result.result) {
			await wait(300);
			UIS.hint.innerText = result.result;
			UIS.hint.classList.remove('hide');
			let delay = 500 + Math.ceil(result.result.length / 10) * 500;
			await wait(delay);
		}

		currentSheet = WorldLine.events[result.goto];
		UIS.sheet.classList.add('hide');
		await wait(300);
		showStorySheet();
	};
	LifeSimulator.gotoArena = () => {
		location.href = './fight.html';
	};

	const showStorySheet = async () => {
		UIS.hint.classList.remove('hide');

		if (!!currentSheet.cover) {
			UIS.cover.style.backgroundImage = 'url("' + currentSheet.cover + '")';
		}
		else {
			UIS.cover.style.backgroundImage = '';
		}
		if (!!currentSheet.hint) {
			if (typeof currentSheet.hint === 'string') {
				currentIndex = -1;
				UIS.hint.innerText = currentSheet.hint;
			}
			else if (currentIndex === -1) {
				currentIndex = 0;
				UIS.hint.innerText = currentSheet.hint[0];
			}
			else {
				currentIndex ++;
				UIS.hint.innerText = currentSheet.hint[currentIndex];
			}
		}
		else {
			currentIndex = -1;
			UIS.hint.innerHTML = '';
		}

		currentChoises = [];
		if (!!currentSheet.choise) currentSheet.choise.forEach(ch => {
			if (!ch.condition) {
				currentChoises.push(ch);
			}
			else {
				if (ch.condition(playerPoints)) {
					currentChoises.push(ch);
				}
			}
		});
		var len = currentChoises.length;
		if (currentSheet.finish) {
			currentIndex = -1;
			UIS.option[0].style.display = 'block';
			let endInfo = WorldLine.finish(playerPoints);
			UIS.option[0].innerText = endInfo.hint;
			for (let i = 1; i < 5; i ++) {
				UIS.option[i].style.display = 'none';
			}
			resultPoints = endInfo.gift;
		}
		else if (currentIndex >= 0 && currentIndex < currentSheet.hint.length - 1) {
			UIS.option[0].style.display = 'block';
			UIS.option[0].innerText = "下一页";
			for (let i = 1; i < 5; i ++) {
				UIS.option[i].style.display = 'none';
			}
		}
		else if (len === 0) {
			currentIndex = -1;
			UIS.option[0].style.display = 'block';
			UIS.option[0].innerText = "下一页";
			for (let i = 1; i < 5; i ++) {
				UIS.option[i].style.display = 'none';
			}
		}
		else {
			currentIndex = -1;
			for (let i = 0; i < len; i ++) {
				let sheet = currentChoises[i];
				UIS.option[i].style.display = 'block';
				UIS.option[i].innerText = sheet.hint;
			}
			for (let i = len; i < 5; i ++) {
				UIS.option[i].style.display = 'none';
			}
		}
		UIS.sheet.classList.remove('hide');
	};
	const showGameOverInfo = () => new Promise(res => {
		newPopup('来自瓦尔哈拉的信', {
			top: '50%',
			left: '50%',
			width:'240px',
			height: '260px',
			onActive: pop => {
				pop.style.transform = "translate(-50%, -50%)";
				pop.UI.content.appendChild(GameOverInfo);
				popGameOverInfo = pop;

				pop.show();
			},
			onHide: pop => {
				document.body.appendChild(GameOverInfo);
				res();
			},
		});
	});
	const gotoFightField = async () => {
		await popGameOverInfo.hide();
		sessionStorage.set('newCard', resultPoints);
		location.href = './fight.html';
	};
	const gameOver = async () => {
		var info = '';
		if (playerPoints.money > playerPoints.man) {
			info = '虽然你这辈子并没有找到真爱，但你还是在生命的最后一刻获得了属于你的真爱骑士，快去看看他吧！';
		}
		else {
			info = "虽然你这辈子被各种无良骑士各种欺骗，但你在生命的最后一刻还是获得了属于你的真爱骑士，快去看看他吧！"
		}
		GameOverInfo.querySelector('div.hint').innerHTML = info;
		localStorage.set('get_fancylady_card', true);
		await showGameOverInfo();
		ScnWelcome.classList.remove('gone');
		ScnPlay.classList.add('waiting');
	};

	GameOverInfo.querySelector('button').addEventListener('click', gotoFightField);

	var gotFLC = localStorage.get('get_fancylady_card', false);
	console.log(gotFLC);
}) ();

const backIndex = () => {
	location.href = './index.html';
};