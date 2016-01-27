(function (root) {
	"use strict";

	var mGene = new WeakMap();
	class LifeGameGeneClassic {
		constructor () {
			this.alive = false;
			this.gene = {};
			this.design(LifeGameGeneClassic.SampleGene);
			this.isRebirth = false;
		}
		design (gene) {
			if (!gene) return;
			if (gene.rebirth) this.gene.rebirth = gene.rebirth;
			if (gene.friends) this.gene.friends = gene.friends;
			if (gene.overpop) this.gene.overpop = gene.overpop;
			this.gene.force = 32 - this.gene.rebirth.lenght * 2 - this.gene.friends.length - this.gene.overpop.length;
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
			this.isRebirth = false;
			if (this.alive) {
				if (this.gene.friends.indexOf(neighbor) < 0 || this.gene.overpop.indexOf(neighbor) < 0) {
					this.die();
					this.design(LifeGameGeneClassic.SampleGene);
				}
			}
			else {
				if (this.gene.rebirth.indexOf(neighbor) >= 0) {
					this.isRebirth = true;
					this.birth();
				}
			}
		}
		mutate (property) {
			if (!this.isRebirth) return;
			if (Math.random() > property) return;
			if (Math.random() < 0.3) {
				this.gene.rebirth = mutateGene(this.gene.rebirth);
			}
			else {
				if (Math.random() < 0.5) {
					this.gene.overpop = mutateGene(this.gene.overpop);
				}
				else {
					this.gene.friends = mutateGene(this.gene.friends);
				}
			}
			this.gene.force = 32 - this.gene.rebirth.lenght * 2 - this.gene.friends.length - this.gene.overpop.length;
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

	var mutateGene = (gene) => {
		var result = [];
		for (let i = 0; i < 9; i++) result[i] = false;
		gene.map((g) => result[g] = true);
		var index = Math.floor(Math.random() * 9);
		if (index === 10) index = 9;
		result[index] = !result[index];
		gene = [];
		result.forEach((g, i) => {
			if (g) gene.push(i);
		});
		return gene;
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