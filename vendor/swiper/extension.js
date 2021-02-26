(() => {
	const AutoSlideBackgroundStep = 0.5; // 自行滑动背景图的交叠部分在滑动进度中的占比

	// 跳转到指定PPT页
	Swiper.prototype.slideToHash = function (hash, speed, callback) {
		var index = this.container.find('[slide-hash="' + hash + '"]').index();
		if (!index && index !== 0) index = -1;
		if (index >= 0 && index < this.slides.length) {
			this.slideTo(index, speed, callback);
		}
	};

	// HintBullet上增加悬停提示
	Swiper.prototype.plugins.hintBullet = (swiper) => {
		var container = swiper.container;
		var slides = container.find('.swiper-slide');
		var bullets = container.find('.swiper-pagination-bullet');
		slides.each((index, slide) => {
			var hint = slide.getAttribute('slide-hint');
			if (!!hint) {
				bullets[index].setAttribute('slide-hint', hint);
			}
		});
	};
	//	分页显示
	Swiper.prototype.plugins.pageInsidePage = (swiper) => {
		const showSubPage = (page, step=-1) => {
			if (step > 0) page.currentStep = step;
			page.classList.remove('bounded');
			var subs = [].map.call(page.querySelectorAll('[step]'), p => p);
			var nexts = 0;
			subs.forEach(sub => {
				var step = sub.getAttribute('step') * 1;
				if (isNaN(step)) return;
				var leave = sub.getAttribute('leave-step');
				if (leave === undefined || leave === null) {
					leave = Infinity
				}
				else if (leave === '') {
					leave = step + 1;
				}
				else {
					leave = leave * 1;
					if (isNaN(leave)) leave = step + 1;
				}

				if (step > page.currentStep) {
					nexts ++;
					sub.classList.remove('show');
				}
				else {
					sub.classList.add('show');
				}

				if (leave > page.currentStep) {
					sub.classList.remove('leave');
				}
				else {
					sub.classList.add('leave');
				}
			});
			if (nexts === 0) {
				page.currentStep --;
				if (page.currentStep < 1) page.currentStep = 1;
				page.classList.add('bounded');
			}
		};
		const getPPT = (target) => {
			if (!target) return null;
			if (!!target.classList && !!target.classList.contains) {
				if (target.classList.contains('swiper-containser')) return null;
				if (target.classList.contains('stepped-page')) return target;
			}
			target = target.parentNode;
			if (!target) return null;
			return getPPT(target);
		};

		const onTransitionEnd = swiper => {
			showSubPage(swiper.slides[swiper.activeIndex || 0], 1);
		};
		const onMouseDown = evt => {
			var ele = evt.target;
			var page = getPPT(ele);
			if (!page) return;
			page.currentStep = page.currentStep || 1;
			if (evt.button === 0) {
				page.currentStep ++;
			}
			else if (evt.button === 1) {
				page.currentStep --;
				if (page.currentStep < 1) page.currentStep = 1;
			}
			showSubPage(page);
		};
		const onKeyDown = evt => {
			if (evt.keyCode !== 13) return;
			var page = swiper.activeIndex;
			if (isNaN(page)) return;
			page = swiper.slides[page];
			if (!page) return;
			page.currentStep = page.currentStep || 1;
			page.currentStep ++;
			showSubPage(page);
		};
		const onDestroy = (...args) => {
			swiper.off('onDestroy', onDestroy);
			swiper.off('onTransitionEnd', onTransitionEnd);
			swiper.container.off('mousedown', onMouseDown);
			document.removeEventListener('keydown', onKeyDown);
		};

		swiper.slides.each((i, page) => {
			if (!page.querySelector('[step]')) return;
			page.classList.add('stepped-page');
		});

		swiper.on('onDestroy', onDestroy);
		swiper.on('onTransitionEnd', onTransitionEnd);
		swiper.container.on('mousedown', onMouseDown);
		document.addEventListener('keydown', onKeyDown);
	};
	// 滑动停止控制器
	Swiper.prototype.plugins.autoLock = (swiper) => {
		var is_locked = false;

		const setPreventer = () => {
			var page = swiper.slides[swiper.activeIndex];
			var no_prev = page.getAttribute('prevent-prev') !== null, no_next = page.getAttribute('prevent-next') !== null;
			if (no_prev) swiper.lockSwipeToPrev();
			if (no_next) swiper.lockSwipeToNext();
			is_locked = true;
		};
		const clearPreventer = () => {
			swiper.unlockSwipes();
			is_locked = false;
		};
		const onClick = (evt) => {
			if (!is_locked) return;
			swiper.releaseAutoLock();
			var target = evt.target.getAttribute('target');
			if (!target) return;
			swiper.slideToHash(target);
		};
		const onDestroy = () => {
			swiper.off("onTransitionStart", clearPreventer);
			swiper.off("onTransitionEnd", setPreventer);
			swiper.container.off('click', '.swiper-slide-jumper', onClick);
			delete swiper.releaseAutoLock;
			swiper.off('onDestroy', onDestroy);
		};

		swiper.on("onTransitionStart", clearPreventer);
		swiper.on("onTransitionEnd", setPreventer);
		swiper.container.on('click', '.swiper-slide-jumper', onClick);
		swiper.releaseAutoLock = (e) => {
			if (is_locked) clearPreventer();
		};
		swiper.on('onDestroy', onDestroy);

		setPreventer();
	};
	// 适配背景
	Swiper.prototype.plugins.dynamicBackground = (swiper) => {
		var bgc = swiper.originalParams.autoBackground;
		var extraPics = swiper.originalParams.backgroundPics || {};

		var available = false;
		if (!!bgc) {
			bgc = document.querySelector(bgc);
			if (!!bgc) available = true;
		}
		if (!available) {
			swiper.initBackground = () => {};
			swiper.swipeBackground = () => {};
			return;
		}
		bgc._autoBGInitialized = false;
		extraPics = Object.keys(extraPics).map(i => extraPics[i]);

		const onProgress = (swiper, process) => {
			swiper.swipeBackground(process);
		};
		const onDestroy = () => {
			swiper.off('onProgress', onProgress);
			swiper.off('onDestroy', onDestroy);
			delete swiper.initBackground;
			delete swiper.swipeBackground;
		};

		swiper.initBackground = () => new Promise(res => {
			for (let i = 0; i < extraPics.length; i ++) {
				let img = document.createElement('img');
				img.classList.add('bg');
				img.setAttribute('data-src', extraPics[i]);
				bgc.appendChild(img);
			}

			var imgs = [].map.call(bgc.querySelectorAll('img.bg[data-src]'), i => i);
			var tasks = Array.generate(imgs.length, false);
			var bgs = Array.generate(imgs.length, null);

			var check = (i, ok=true) => {
				var ele = bgs[i], img = imgs[i];
				if (ok) {
					ele.style.backgroundImage = 'url(' + img.src + ')';
				}
				bgc.removeChild(img);
				var done = tasks.every(t => t);
				if (!done) return;

				bgc.total = tasks.length;
				bgc.images = bgs;
				imgs.clear();
				tasks.clear();
				bgc._autoBGInitialized = true;

				swiper.swipeBackground(0);
				res();
			};

			for (let i = 0; i < imgs.length; i ++) {
				let e = document.createElement('div');
				e.className = 'bg';
				bgc.appendChild(e);
				bgs[i] = e;
			}

			imgs.forEach((img, i) => {
				var src = img.getAttribute('data-src');
				img.removeAttribute('data-src');
				if (!src) {
					tasks[i] = true;
					check(i);
					return;
				}
				img.onload = () => {
					tasks[i] = true;
					check(i);
				};
				img.onerror = (err) => {
					console.error(err);
					tasks[i] = true;
					check(i, false);
				};
				img.src = src;
			});
		});
		swiper.swipeBackground = process => {
			if (!bgc._autoBGInitialized) return;
			if (process < 0) process = 0;
			else if (process > 1) process = 1;
			var max = 1 / bgc.total;
			var current = Math.floor(bgc.total * process);
			if (current >= bgc.total) current = bgc.total - 1;
			var rate = (process - max * current) / max;
			for (let i = 0; i < current; i ++) {
				let bg = bgc.images[i];
				bg.style.backgroundPosition = '100% 50%';
				bg.style.opacity = 0;
			}
			for (let i = current + 1; i < bgc.total; i ++) {
				let bg = bgc.images[i];
				bg.style.backgroundPosition = '0% 50%';
				bg.style.opacity = 0;
			}
			if (current === bgc.total - 1) {
				let bg = bgc.images[current];
				bg.style.backgroundPosition = (rate * 100) + '% 50%'
				bg.style.opacity = 1;
			}
			else {
				let bg = bgc.images[current];
				let r = rate * (1 + AutoSlideBackgroundStep);
				if (r < 1) {
					bg.style.backgroundPosition = (r * 100) + '% 50%'
					bg.style.opacity = 1;
				}
				else {
					r = 1 - (r - 1) / AutoSlideBackgroundStep;
					bg.style.backgroundPosition = '100% 50%'
					bg.style.opacity = r;
					bg = bgc.images[current + 1];
					bg.style.backgroundPosition = '0% 50%'
					bg.style.opacity = 1 - r;
				}
			}
		};

		swiper.on('onProgress', onProgress);
		swiper.on('onDestroy', onDestroy);
	};
}) ();