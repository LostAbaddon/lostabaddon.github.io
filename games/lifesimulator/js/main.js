const LifeSimulator = {};

(() => {
	const UIS = {};
	var playerPoints;
	var currentSheet;

	LifeSimulator.startNewLife = () => {
		playerPoints = {};

		UIS.sheet = ScnPlay.querySelector('div.sheet');
		UIS.cover = ScnPlay.querySelector('div.cover');
		UIS.hint = ScnPlay.querySelector('div.hint');
		UIS.option = [];
		UIS.option.push(ScnPlay.querySelector('button[name="option1"]'));
		UIS.option.push(ScnPlay.querySelector('button[name="option2"]'));
		UIS.option.push(ScnPlay.querySelector('button[name="option3"]'));
		UIS.option.push(ScnPlay.querySelector('button[name="option4"]'));
		UIS.option.push(ScnPlay.querySelector('button[name="option5"]'));

		currentSheet = WorldLine.events[WorldLine.start] || {};
		showStorySheet();

		ScnWelcome.classList.add('gone');
		ScnPlay.classList.remove('waiting');
	};
	LifeSimulator.gotoChoise = async id => {
		for (let i = 0; i < 5; i ++) {
			UIS.option[i].style.display = 'none';
		}
		if (!currentSheet.choise) {
			if (currentSheet.finish) {
				ScnWelcome.classList.remove('gone');
				ScnPlay.classList.add('waiting');
			}
			else {
				currentSheet = WorldLine.events[currentSheet.next];
				UIS.sheet.classList.add('hide');
				await wait(300);
				showStorySheet();
			}
			return;
		}

		var choise = currentSheet.choise[id];
		var result = {};
		if (choise.goto instanceof Function) {
			result = choise.goto(playerPoints);
		}
		result = Object.assign({}, choise, result);
		if (!!result.points && result.points.length >= 2) {
			playerPoints[result.points[0]] = (playerPoints[result.points[0]] || 0) + result.points[1];
		}

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

	const showStorySheet = async () => {
		UIS.hint.classList.remove('hide');

		if (!!currentSheet.cover) {
			UIS.cover.style.backgroundImage = 'url("' + currentSheet.cover + '")';
		}
		else {
			UIS.cover.style.backgroundImage = '';
		}
		if (!!currentSheet.hint) {
			UIS.hint.innerText = currentSheet.hint;
		}
		else {
			UIS.hint.innerHTML = '';
		}
		var len = (currentSheet.choise || []).length;
		if (currentSheet.finish) {
			UIS.option[0].style.display = 'block';
			UIS.option[0].innerText = WorldLine.finish(playerPoints);
			for (let i = 1; i < 5; i ++) {
				UIS.option[i].style.display = 'none';
			}
		}
		else if (len === 0) {
			UIS.option[0].style.display = 'block';
			UIS.option[0].innerText = "下一页";
			for (let i = 1; i < 5; i ++) {
				UIS.option[i].style.display = 'none';
			}
		}
		else {
			for (let i = 0; i < len; i ++) {
				let sheet = currentSheet.choise[i];
				UIS.option[i].style.display = 'block';
				UIS.option[i].innerText = sheet.hint;
			}
			for (let i = len; i < 5; i ++) {
				UIS.option[i].style.display = 'none';
			}
		}
		UIS.sheet.classList.remove('hide');
	};
}) ();