/*
 * Common Utils for ES6
 */

((root) => {
	// Common Utils
	root.CommonUtils = root.CommonUtils || {};

	// Event Manager
	const mEventPool = new WeakMap();
	class EventManager {
		constructor () {
			var pool = {};
			mEventPool.set(this, pool);
		}
		emit (event, ...args) {
			if (event === 'emit' || event === 'hook') return;
			var pool = mEventPool.get(this);
			if (!pool) return;
			pool = pool[event];
			if (!pool) return;
			pool.forEach((callback) => callback.apply(lifeController, args));
		}
		hook (event, callback) {
			if (event === 'emit' || event === 'hook') return;
			var pool = mEventPool.get(this);
			if (!pool) return;
			if (!pool[event]) {
				pool[event] = new Set();
			}
			pool = pool[event];
			if (pool.has(callback)) return;
			pool.add(callback);
		}
	}
	root.CommonUtils.EventManager = EventManager;

	// Modals
	var body = $('body');
	var modalBlocker = $('#modalBlocker');
	root.CommonUtils.modalShow = (selector) => {
		modalBlocker.addClass('active');
		$(selector).addClass('active');
	};
	root.CommonUtils.modalHide = (selector) => {
		if (!selector) $('.modal').removeClass('active');
		else $(selector).removeClass('active');
		modalBlocker.removeClass('active');
	};

}) (window);