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
			var total = getTotalNeighbor(neighbors), alien;
			var neigh = [], types = [], my_type = this.type, new_life;
			this.isRebirth = false;
			if (this.alive) {
				neighbors.map((life) => {
					if (life.alive && (life.type !== my_type) && (types.indexOf(life.type) < 0)) types.push(life.type);
				});
				alien = [];
				types.map((type) => alien[type] = getTotalAlien(neighbors, type));
				neighbors.map((life) => {
					if (!life.alive) return;
					if (life.type === my_type) return;
					if (life.gene.rebirth.indexOf(alien[life.type] || 0) < 0) return;
					neigh.push(life);
				});
				if (neigh.length > 0) {
					new_life = pickStrongest(neigh);
					if (LifeGame.Core.randomFight) neigh = new_life.gene.force * Math.random();
					else neigh = new_life.gene.force;
				}
				else {
					neigh = 0;
				}
				alien = getTotalAlien(neighbors, this.type);
				if (LifeGame.Core.randomFight) neigh -= this.gene.force * (1 + alien / 2) * Math.random();
				else neigh -= this.gene.force * (1 + alien / 2);
				if (neigh <= 0) {
					if (this.gene.friends.indexOf(alien) < 0 || this.gene.overpop.indexOf(total) < 0) {
						this.die();
					}
				}
				else {
					this.isRebirth = true;
					this.birth(new_life.type);
					this.design(new_life.gene);
				}
			}
			else {
				neighbors.map((life) => {
					if (life.alive && (types.indexOf(life.type) < 0)) types.push(life.type);
				});
				alien = [];
				types.map((type) => alien[type] = getTotalAlien(neighbors, type));
				neighbors.map((life) => {
					if (!life.alive) return;
					if (life.gene.rebirth.indexOf(alien[life.type] || 0) < 0) return;
					neigh.push(life);
				});
				if (neigh.length > 0) {
					this.isRebirth = true;
					new_life = pickStrongest(neigh);
					this.birth(new_life.type);
					this.design(new_life.gene);
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
				angle: 0,
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
		var force = 50 - gene.rebirth.length * 3 - gene.friends.length - gene.overpop.length * 2;
		force -= gene.rebirth.length / 8;
		force -= gene.overpop.length / 64;
		force -= gene.friends.length / 512;
		if (force < 0) force = 0;
		return force;
	};
	var getGeneAging = (gene) => {
		var aging = 40 - (gene.rebirth.length + gene.friends.length + gene.overpop.length * 3);
		return aging / 2;
	};
	var getTotalNeighbor = (neighbors) => {
		var total = 0;
		neighbors.map((life) => {
			if (life.alive) total ++;
		});
		return total;
	};
	var getTotalAlien = (neighbors, type) => {
		var alien = 0;
		neighbors.map((life) => {
			if (life.alive && life.type === type) alien ++;
		});
		return alien;
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