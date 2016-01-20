(function () {
	// Extensions
	Swiper.prototype.slideToHash = function (hash, speed, callback) {
		var index = this.container.find('[data-hash="' + hash + '"]').index();
		if (!index && index !== 0) index = -1;
		if (index >= 0) this.slideTo(index, speed, callback);
	};
	// History Control
	Swiper.prototype.launchTimeMachine = function (limit) {
		var self = this;
		this.history = [];
		if (isNaN(limit) || limit < 1) {
			this.history.limit = 0;
		}
		else {
			this.history.limit = limit;
		}
		this.history.index = 0;
		this.history.state = 0; // 0: no time travelling; 1: travel back; 2: travel future.
		this.history.callbacks = [];
		this.history.push(this.activeIndex); // For Initial
		this.on('onSlideChangeEnd', function (s) {
			if (self.history.state === 0) {
				if (self.history.index > 0) {
					self.history.splice(0, self.history.index);
				}
				self.history.unshift(self.activeIndex);
				if (self.history.limit > 0) self.history.splice(self.history.limit, self.history.length);
				self.history.index = 0;
				self.history.callbacks.map(function (callback) {
					callback(self, false, self.history.index === 0, self.history.index === (self.history.length - 1));
				});
			}
			else {
				self.history.state = 0;
				self.history.callbacks.map(function (callback) {
					callback(self, true, self.history.index === 0, self.history.index === (self.history.length - 1));
				});
			}
		});
		this.history.goto = function (index) {
			if (index < 0 || index >= self.history.length) return;
			if (index === self.history.index) return;
			if (index < self.history.index) self.history.state = 2;
			else self.history.state = 1;
			self.history.index = index;
			index = self.history[index];
			self.slideTo(index);
		};
		this.history.prev = function () {
			self.history.goto(self.history.index + 1);
		};
		this.history.next = function () {
			self.history.goto(self.history.index - 1);
		};
		// Callback : function (swiper, isTimeTravelling, isFirstTimeSlice, isLastTimeSlice)
		this.onHistoryChanged = function (callback) {
			if (self.history.callbacks.indexOf(callback) < 0) {
				self.history.callbacks.push(callback);
			}
		};
	};
	// Hint Pagination Bullet
	Swiper.prototype.hintBullet = function () {
		var slides = this.container.find('.swiper-slide');
		var bullets = this.container.find('.swiper-pagination-bullet');
		slides.each(function (index, slide) {
			slide = $(slide);
			var hint = slide.data('hint');
			if (!!hint) {
				$(bullets[index]).data('hint', hint);
			}
		});
	};

	// Window Event for SlideToHash
	$(document).on('click tap', '.swiper-slide-jumper', function (e) {
		var hint = $(this).data('target');
		if (!isNaN(hint)) mySwiper.slideTo(hint);
		else if (!!hint) mySwiper.slideToHash(hint);
	});
}) ();