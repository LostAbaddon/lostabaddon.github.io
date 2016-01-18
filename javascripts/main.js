var Devices = {};
(function (ua) {
	Devices.isAndroid = !!ua.match(/Android/i);
	Devices.isiOS = !!ua.match(/iPhone|iPad|iPod/i);
	Devices.isBlackBerry = !!ua.match(/BlackBerry/i);
	Devices.isOpera = !!ua.match(/Opera Mini/i);
	Devices.isWindows = !!ua.match(/IEMobile/i) || !!ua.match(/WPDesktop/i);
	Devices.isWebOS = !!ua.match(/webOS/i);
	Devices.isMobile = Devices.isAndroid || Devices.isiOS || Devices.isBlackBerry || Devices.isOpera || Devices.isWindows;
}) (navigator.userAgent);