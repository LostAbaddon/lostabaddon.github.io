((root) => {
	"use strict";

	class LifeGameGeneClassic {
		constructor (template) {
			this.type = 0;
			this.template = template || LifeGameGeneClassic.SampleGene;
			this.alive = false;
			this.gene = {};
			this.init();
		}
		init () {
			this.life = LifeGameGeneClassic.AgeLimit;
			this.isRebirth = false;
			this.design(this.template);
		}
		design (gene) {
			if (!gene) return;
			if (gene.rebirth) this.gene.rebirth = gene.rebirth;
			if (gene.friends) this.gene.friends = gene.friends;
			if (gene.overpop) this.gene.overpop = gene.overpop;
			this.gene.force = getGeneForce(this.gene);
			this.aging = getGeneAging(this.gene);
		}
		birth (type) {
			this.type = type;
			this.alive = true;
			this.life = LifeGameGeneClassic.AgeLimit;
		}
		die () {
			this.alive = false;
			this.life = 0;
			this.design(this.template);
		}
		envolve () {
			if (LifeGameGeneClassic.AgeLimit <= 0) return;
			this.life -= this.aging;
			if (this.life <= 0) {
				this.die();
			}
		}
		update (neighbors) {
			var effect = getTotalEffect(neighbors);
			this.isRebirth = false;
			if (this.alive) {
				if (this.gene.friends.indexOf(effect) < 0 || this.gene.overpop.indexOf(effect) < 0) {
					this.die();
				}
			}
			else {
				if (this.gene.rebirth.indexOf(effect) >= 0) {
					this.isRebirth = true;
					var life = pickStrongest(neighbors);
					this.birth(life.type);
					this.design(life.gene);
				}
			}
		}
		mutate (property) {
			if (!this.isRebirth || !this.alive) return;
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
			this.gene.force = getGeneForce(this.gene);
			this.aging = getGeneAging(this.gene);
		}
		get copy () {
			var self = this;
			return {
				alive: self.alive,
				type: self.type,
				gene: copyGene(self.gene),
			}
		}
	}

	var copyGene = (gene) => {
		var copy = {};
		copy.friends = [];
		gene.friends.map((g) => copy.friends.push(g));
		copy.overpop = [];
		gene.overpop.map((g) => copy.overpop.push(g));
		copy.rebirth = [];
		gene.rebirth.map((g) => copy.rebirth.push(g));
		copy.force = gene.force;
		return copy;
	};
	var getGeneForce = (gene) => {
		var force = 32 - gene.rebirth.length * 2 - gene.friends.length - gene.overpop.length;
		force += gene.rebirth.length / 8;
		force += gene.overpop.length / 64;
		force += gene.friends.length / 512;
		return force;
	};
	var getGeneAging = (gene) => {
		var aging = 24 - (gene.rebirth.length + gene.friends.length + gene.overpop.length);
		return aging;
	};
	var getTotalEffect = (neighbors) => {
		var effect = 0;
		neighbors.map((life) => {
			if (life.alive) effect ++;
		});
		return effect;
	};
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
	};
	var pickStrongest = (genes) => {
		var random = LifeGame.Core.randomFight;
		var life = genes[0], force, f, g;
		if (random) force = life.gene.force * (Math.random() + Math.random());
		else force = life.gene.force;
		for (let i = 1, l = genes.length; i < l; i++) {
			g = genes[i];
			if (random) f = g.gene.force * (Math.random() + Math.random());
			else f = g.gene.force;
			if (f > force) {
				life = g;
				force = f;
			}
		}
		return life;
	};

	LifeGameGeneClassic.SampleGene = {
		rebirth: [3],
		friends: [2, 3, 4, 5, 6, 7, 8],
		overpop: [0, 1, 2, 3],
	};
	LifeGameGeneClassic.AgeLimit = -1;

	// Export
	root.LifeGame = root.LifeGame || {};
	root.LifeGame.Gene = root.LifeGame.Gene || {};
	root.LifeGame.Gene.Classic = LifeGameGeneClassic;
}) (window);