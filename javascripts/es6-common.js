/*
 * Common Utils for ES6
 */

((root) => {
	"use strict";

	// Common Utils
	root.CommonUtils = root.CommonUtils || {};

	// Event Manager
	const mEventPool = new WeakMap();
	class EventManager {
		constructor (host) {
			this.host = host;
			var pool = {};
			mEventPool.set(this, pool);
		}
		emit (event, ...args) {
			if (event === 'emit' || event === 'hook') return;
			var pool = mEventPool.get(this);
			if (!pool) return;
			pool = pool[event];
			if (!pool) return;
			pool.forEach((callback) => callback.apply(this.host, args));
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

	// Read-Only Property
	root.CommonUtils.setReadOnly = (name, value) => {
		Object.defineProperty(this, name, {
			value: value,
			writable: false,
			enumerable: true,
			configurable: false,
		});
	};

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
