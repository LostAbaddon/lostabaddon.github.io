(function (root) {
	// Background Controller
	var BackgroundController = function (selector, options) {
		var self = this;
		this.dom = $(selector);
		this.images = [];
		this.options = {};
		if (!!options && !isEmpty(options.isVertical)) this.options.isVertical = options.isVertical;
		else this.options.isVertical = (this.dom.data('direction').toLowerCase() === 'vertical');
		if (!!options && !isEmpty(options.viewPerImage)) this.options.viewPerImage = options.viewPerImage;
		else this.options.viewPerImage = this.dom.data('view-per-image') || 1;
		this.options.containerHeight = this.dom.height();
		this.options.containerWidth = this.dom.width();
		if (!!options && !isEmpty(options.imageWidth)) this.options.imageWidth = options.imageWidth;
		else this.options.imageWidth = this.dom.data('width');
		if (!!options && !isEmpty(options.imageHeight)) this.options.imageHeight = options.imageHeight;
		else this.options.imageHeight = this.dom.data('height');
		if (!!options && !isEmpty(options.minScale)) this.options.minScale = options.minScale;
		else this.options.minScale = this.dom.data('min-scale') || 0;

		this.dom.find('img').each(function (index, img) {
			self.images.push(new BackgroundController.BackgroundImage(img, self));
		});

		this.total = this.images.length * this.options.viewPerImage;
		this.index = 0;

		this.onResize();

		return this;
	};
	BackgroundController.prototype.onResize = function () {
		this.resetImages();
		this.update();
	};
	BackgroundController.prototype.resetImages = function () {
		var self = this, cw = self.options.containerWidth * self.options.minScale, ch = self.options.containerHeight * self.options.minScale;
		this.images.map(function (img) {
			var ui = img.dom, w, h, option = {};
			h = self.options.imageHeight;
			if (!isNaN(h)) h = (h * 100) + '%';
			if (!!h) option.height = h;
			w = self.options.imageWidth;
			if (!isNaN(w)) w = (w * 100) + '%';
			if (!!w) option.width = w;
			if (!option.width) option.width = "auto";
			if (!option.height) option.height = "auto";
			ui.css(option);
			img.fitScale(cw, ch);
			w = ui.data('width');
			h = ui.data('height');
			option = {};
			if (self.options.isVertical) {
				w = (self.options.containerWidth - w) / 2;
				option.left = w + 'px';
			}
			else {
				h = (self.options.containerHeight - h) / 2;
				option.top = h + 'px';
			}
			ui.css(option);
		});
	};
	BackgroundController.prototype.update = function () {
		var imgTotal = this.images.length;
		var imgStep = this.options.viewPerImage;
		var index = this.index;
		var imgIndex = this.images.length;
		this.images.map(function (img) {
			imgIndex--;
			if (imgIndex === 0 && index > imgStep - 1) index = imgStep - 1;
			img.update(index);
			index -= imgStep;
		});
	};
	BackgroundController.prototype.next = function () {
		if (this.index >= this.total - 1) {
			this.index = this.total - 1;
			return;
		}
		this.index ++;
		this.update();
	};
	BackgroundController.prototype.prev = function () {
		if (this.index < 1) {
			this.index = 0;
			return;
		}
		this.index --;
		this.update();
	};
	BackgroundController.prototype.set = function (progress) {
		if (progress < 0) progress = 0;
		else if (progress > 1) progress = 1;
		this.index = this.total * progress;
		if (this.index > this.total) this.index = this.total;
		this.update();
	};
	BackgroundController.prototype.goto = function (index) {
		if (index < 0) index = 0;
		else if (index > this.total - 1) index = this.total - 1;
		this.index = index;
		this.update();
	};
	BackgroundController.BackgroundImage = function (img, controller) {
		this.dom = $(img);
		this.img = img;
		this.controller = controller;
	};
	BackgroundController.BackgroundImage.prototype.update = function (step) {
		var css = {}, delta = 0;
		if (step < -1 || step > this.controller.options.viewPerImage) {
			css.opacity = 0;
		}
		else if (step > this.controller.options.viewPerImage - 1) {
			css.opacity = this.controller.options.viewPerImage - step;
			if (this.controller.options.isVertical) {
				delta = (this.controller.options.containerHeight - thid.dom.data('height'));
				css.top = delta + 'px';
			}
			else {
				delta = (this.controller.options.containerWidth - this.dom.data('width'));
				css.left = delta + 'px';
			}
		}
		else if (step < 0) {
			css.opacity = step + 1;
			if (this.controller.options.isVertical) {
				css.top = '0px';
			}
			else {
				css.left = '0px';
			}
		}
		else {
			css.opacity = 1;
			if (this.controller.options.isVertical) {
				delta = (this.controller.options.containerHeight - thid.dom.data('height')) * step / (this.controller.options.viewPerImage - 1);
				css.top = delta + 'px';
			}
			else {
				delta = (this.controller.options.containerWidth - this.dom.data('width')) * step / (this.controller.options.viewPerImage - 1);
				css.left = delta + 'px';
			}
		}
		this.dom.css(css);
	};
	BackgroundController.BackgroundImage.prototype.fitScale = function (cw, ch) {
		var w = this.img.width, h = this.img.height, option = {}, changed = false;
		if (w < cw && h < ch) {
			w = w / h * ch;
			h = ch;
			changed = true;
		}
		if (w < cw) {
			h = h / w * cw;
			w = cw;
			changed = true;
		}
		else if (h < ch) {
			w = w / h * ch;
			h = ch;
			changed = true;
		}
		if (changed) {
			if (isFinite(w)) option.width = Math.round(w) + 'px';
			else option.width = "auto";
			if (isFinite(h)) option.height = Math.round(h) + 'px';
			else option.height = "auto";
		}
		if (!!option.width || !!option.height) this.dom.css(option);
		if (isNaN(w) || !isFinite(w)) w = this.dom.width();
		if (isNaN(h) || !isFinite(h)) h = this.dom.height();
		this.dom.data('width', w).data('height', h);
	};

	root.BackgroundController = BackgroundController;
}) (window);