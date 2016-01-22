(function (root) {
	function DrawPad (selector) {
		var self = this;

		// UIs
		this.container = $(selector);
		this.button = $('<div class="close"><i class="fa fa-times-circle"></i></div>').appendTo(this.container);
		this.drawarea = $('<canvas>').appendTo(this.container);

		// Init
		this.container[0].widget = this;
		this.options = {};
		this.options.width = this.container.data('width') || "80%";
		this.options.height = this.container.data('height') || "80%";
		this.options.padding = this.container.data('padding') || "20px";
		if (!isNaN(this.options.width)) this.options.width = this.options.width + 'px';
		if (!isNaN(this.options.height)) this.options.height = this.options.height + 'px';
		if (!isNaN(this.options.padding)) this.options.padding = this.options.padding + 'px';
		this.container.css({
			width: this.options.width,
			height: this.options.height,
			padding: this.options.padding,
		});
		var width = this.drawarea.width(), height = this.drawarea.height();
		this.drawarea[0].width = width;
		this.drawarea[0].height = height;
		this.canvas = this.drawarea[0].getContext('2d');

		// Methods
		this.open = function () {
			self.container.removeClass('hide');
		};
		this.close = function () {
			self.container.addClass('hide');
		};

		// Private Methods
		var drawing = false, old_x = 0, old_y = 0;;
		function start (x, y) {
			drawing = true;
			old_x = x;
			old_y = y;
			self.canvas.beginPath();
			self.canvas.moveTo(old_x, old_y);
			self.canvas.lineTo(x, y);
			self.canvas.lineTo(old_x, old_y);
			self.canvas.closePath();
			self.canvas.stroke();
		};
		function end (x, y) {
			drawing = false;
			self.canvas.beginPath();
			self.canvas.moveTo(old_x, old_y);
			self.canvas.lineTo(x, y);
			self.canvas.lineTo(old_x, old_y);
			self.canvas.closePath();
			self.canvas.stroke();
		};
		function moving (x, y) {
			if (!drawing) return;
			self.canvas.beginPath();
			self.canvas.moveTo(old_x, old_y);
			self.canvas.lineTo(x, y);
			self.canvas.lineTo(old_x, old_y);
			self.canvas.closePath();
			self.canvas.stroke();
			old_x = x;
			old_y = y;
		}
		function clear () {

		}

		// Events
		this.button.on('click', this.close).on('tap', this.close);
		this.drawarea.on('mousedown', function (e) {
			start(e.offsetX, e.offsetY);
		}).on('mouseup', function (e) {
			end(e.offsetX, e.offsetY);
		}).on('mousemove', function (e) {
			moving(e.offsetX, e.offsetY);
		}).on('doubleclick', function (e) {
			console.log('Double Click');
		});

		// Test
		this.open();
	}

	root.DrawPad = DrawPad;
}) (window);