(() => {
	const initZ = 100;
	const list = [];
	const map = {};

	var frame = document.querySelector('div.popup_container');

	window.newPopup = (title, config) => {
		var popup = newEle('div', 'popup_container');
		popup.background = newEle('div', 'popup_background');
		popup.innerHTML = frame.innerHTML;
		popup.UI = {};
		popup.UI.content = popup.querySelector('div.content');
		popup.UI.title = popup.querySelector('div.titlebar>span.title');
		popup.UI.title.innerText = title;
		if (!!config) {
			if (!!config.width) popup.style.width = config.width;
			if (!!config.height) popup.style.height = config.height;
			if (!!config.top) popup.style.top = config.top;
			if (!!config.bottom) popup.style.bottom = config.bottom;
			if (!!config.left) popup.style.left = config.left;
			if (!!config.right) popup.style.right = config.right;
			if (!!config.noCloser) popup.querySelector('div.titlebar>span.closer').style.display = 'none';
		}
		popup.id = newToken();

		popup.show = async () => {
			document.body.appendChild(popup.background);
			document.body.appendChild(popup);
			var z = list.length;
			popup.background.style.zIndex = initZ + z;
			popup.style.zIndex = initZ + z;
			list[z] = popup;
			map[popup.id] = popup;
			if (!!config.onLoad) config.onLoad(popup);

			await wait();
			popup.classList.add('fadein');
			if (!config.notBlurBG) popup.style.backdropFilter = 'blur(2px)';

			if (!!config.onShow) {
				await wait(550);
				config.onShow(popup);
			}
		};
		popup.hide = async () => {
			if (!!config.onDeactive) config.onDeactive(popup);
			popup.classList.add('fadeout');
			popup.classList.remove('fadein');
			await wait(500);
			popup.classList.remove('fadeout');
			if (!!config.onHide) config.onHide(popup);
			document.body.removeChild(popup.background);
			document.body.removeChild(popup);
			if (!!config.onUnload) config.onUnload(popup);
			var has = false, total = list.length;
			for (let i = total - 1; i >= 0; i --) {
				let p = list[i];
				if (p === popup) {
					list.splice(i, 1);
					break;
				}
				p.background.style.zIndex = initZ + i - 1;
				p.style.zIndex = initZ + i - 1;
			}
			delete map[popup.id];
		};
		popup.querySelector('div.titlebar>span.closer').onclick = popup.hide;

		if (!!config.onActive) config.onActive(popup);

		return popup;
	};
	window.newPopup.getById = id => {
		return map[id];
	};
}) ();