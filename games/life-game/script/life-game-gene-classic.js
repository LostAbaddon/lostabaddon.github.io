(function (root) {
	"use strict";

	var mGene = new WeakMap();
	class LifeGameGeneClassic {
		constructor () {
			this.alive = false;
		}
		birth () {
			this.alive = true;
		}
		die () {
			this.alive = false;
		}
		envolve () {
		}
		update (neighbor) {
			if (this.alive) {
				if (neighbor < 2 || neighbor > 3) {
					this.die();
				}
			}
			else {
				if (neighbor === 3) {
					this.birth();
				}
			}
		}
		get effect () {
			return this.alive ? 1 : 0;
		}

		static get originEffect () {
			return 0;
		}
		static addEffect (oldEffect, effect) {
			return oldEffect + effect;
		}
		static getLifeEffect (effect) {
			return effect;
		}
	}

	// Export
	root.LifeGame = root.LifeGame || {};
	root.LifeGame.Gene = root.LifeGame.Gene || {};
	root.LifeGame.Gene.Classic = LifeGameGeneClassic;
}) (window);