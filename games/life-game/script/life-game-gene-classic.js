(function (root) {
	"use strict";

	var mGene = new WeakMap();
	class LifeGameGeneClassic {
		constructor () {
			this.alive = false;
			this.gene = {};
			this.design(LifeGameGeneClassic.SampleGene);
		}
		design (gene) {
			if (!gene) return;
			if (gene.rebirth) this.gene.rebirth = gene.rebirth;
			if (gene.friends) this.gene.friends = gene.friends;
			if (gene.overpop) this.gene.overpop = gene.overpop;
			this.gene.force = 25 - this.gene.rebirth.lenght - this.gene.friends.length - this.gene.overpop.length;
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
				if (this.gene.friends.indexOf(neighbor) < 0 || this.gene.overpop.indexOf(neighbor) < 0) {
					this.die();
				}
			}
			else {
				if (this.gene.rebirth.indexOf(neighbor) >= 0) {
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

	LifeGameGeneClassic.SampleGene = {
		rebirth: [3],
		friends: [2, 3, 4, 5, 6, 7, 8],
		overpop: [0, 1, 2, 3],
	};

	// Export
	root.LifeGame = root.LifeGame || {};
	root.LifeGame.Gene = root.LifeGame.Gene || {};
	root.LifeGame.Gene.Classic = LifeGameGeneClassic;
}) (window);