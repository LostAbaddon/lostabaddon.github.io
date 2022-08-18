const onResize = () => {
	var info = getBrowserInfo();
	var width = window.innerWidth, height = window.innerHeight;
	var body = document.body;

	body.setAttribute('platform', info.platform);
	if (info.isStandAlone) {
		body.setAttribute('mode', 'standalone');
		FullScreenTrigger.style.display = 'none';
	}
	else {
		body.setAttribute('mode', 'normal');
		FullScreenTrigger.style.display = 'block';
	}
	if (info.platform === 'mobile') {
		if (width > height) {
			body.setAttribute('screen', 'horizontal');
			Page.style.width = width + 'px';
			Page.style.height = height + 'px';
			Page.style.transformOrigin = '';
		}
		else {
			body.setAttribute('screen', 'vertical');
			Page.style.width = height + 'px';
			Page.style.height = width + 'px';
			let half = width / 2;
			Page.style.transformOrigin = half + 'px ' + half + 'px';
		}
	}
	else {
		body.removeAttribute('screen');
		Page.style.width = width + 'px';
		Page.style.height = height + 'px';
		Page.style.transformOrigin = '';
	}
};

const checkQualify = () => {
	Mask.classList.add('show');
	Qualifier.classList.remove('hide');
};

const init = () => {
	window.onresize = onResize;

	onResize();
	document.body.classList.remove('loading');

	FullScreenTrigger.addEventListener('click', () => {
		var mode = document.body.getAttribute('mode');
		if (mode === 'standalone') return;

		if (!!document.fullscreenElement) {
			document.exitFullscreen();
			FullScreenTrigger.classList.add('fa-maximize');
			FullScreenTrigger.classList.remove('fa-minimize');
			document.body.setAttribute('mode', 'normal');
		}
		else {
			document.body.requestFullscreen();
			FullScreenTrigger.classList.remove('fa-maximize');
			FullScreenTrigger.classList.add('fa-minimize');
			document.body.setAttribute('mode', 'fullscreen');
		}
	});

	Qualifier.querySelector('button.cancel').addEventListener('click', async () => {
		location.href = "../lifesimulator/index.html?all=true";
	});
	Qualifier.querySelector('button.submit').addEventListener('click', async () => {
		var code = Qualifier.querySelector('input').value;
		if (code !== "cyberdemon") {
			location.href = "../lifesimulator/index.html?all=true";
		}
		Mask.classList.remove('show');
		Qualifier.classList.add('hide');
		await wait(300);
		Qualifier.querySelector('input').value = '';
	});
	checkQualify();
};

init();