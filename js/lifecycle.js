LifeCycle.on.ready(app => {
	if (Devices.isMobile && Devices.isSafari) {
		const app = document.querySelector('#app');
		app.innerHTML = "<p>阁下所用之浏览器似乎是移动版 Safari。</p><p>由于其对 ES6 的支持之恶劣，以及鄙人不吝于屈尊降贵来适配它，故请阁下换用现代浏览器。</p><p>告辞不送。</p>";
		app.style.position = 'absolute';
		app.style.height = 'auto';
		app.style.top = '50%';
		app.style.transform = 'translateY(-50%)';
		app.style.textAlign = 'center';
		app.style.fontWeight = 'bolder';
		return true;
	}
});