var Devices = {};
var Support = {};

(function (root, ua, nav) {
	Devices.isAndroid = !!ua.match(/Android/i);
	Devices.isiPhone = !!ua.match(/iPhone/i);
	Devices.isiPad = !!ua.match(/iPad/i);
	Devices.isiPod = !!ua.match(/iPod/i);
	Devices.isiOS = Devices.isiPhone || Devices.isiPad || Devices.isiPod;
	Devices.isBlackBerry = !!ua.match(/BlackBerry/i);
	Devices.isIE = nav.pointerEnabled || nav.msPointerEnabled;
	Devices.isSafari = (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
	Devices.isOpera = !!ua.match(/Opera/i) && !ua.match(/Opera Mini/i);
	Devices.isOperaMini = !!ua.match(/Opera Mini/i);
	Devices.isWinPhone = !!ua.match(/IEMobile/i) || !!ua.match(/WPDesktop/i);
	Devices.isWebOS = !!ua.match(/webOS/i);
	Devices.isUiWebView = !!ua.match(/AppleWebKit/i);
	Devices.isMobile = Devices.isAndroid || Devices.isiOS || Devices.isBlackBerry || Devices.isOpera || Devices.isWindows;

	if (Devices.isMobile) {
		$('body').addClass('mobile');
	}

	Support.canTouch = (window.Modernizr && Modernizr.touch === true) || (function () {
		return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	})();
	Support.canTransform3D = (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
		var div = document.createElement('div').style;
		return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
	})();
	Support.canFlexbox = (function () {
		var div = document.createElement('div').style;
		var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
		for (var i = 0; i < styles.length; i++) {
			if (styles[i] in div) return true;
		}
	})();
	Support.canObserver = (function () {
		return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
	})();

	// Functions
	root.isEmpty = function (object) {
		if (object === null) return true;
		if (typeof object === 'undefined') return true;
		return false;
	};

	// Site Map
	root.SiteMap = {};
	root.SiteMap.map = {
		home: "塔尔塔罗斯",
		phymat: "数学与物理",
	};

	// Image Loader
	root.ImageLoader = function (callback) {
		var task = [], done = 0, total = 0, check = function () {
			var result = !task.some(function (t) {return !t;});
			if (result) {
				callback(done, total);
			}
		};
		$('img[data-src]').each(function (index, img) {
			img = $(img);
			total++;
			var src = img.attr('src');
			if (!!src) {
				task[index] = true;
			}
			else {
				task[index] = false;
				src = img.data('src');
				img.data('src', null);
				img[0].onload = function () {
					task[index] = true;
					done++;
					check();
				};
				img[0].onerror = function () {
					task[index] = true;
					check();
				};
				img.attr('src', src);
			}
			check();
		});
	};

}) (window, window.navigator.userAgent, window.navigator);