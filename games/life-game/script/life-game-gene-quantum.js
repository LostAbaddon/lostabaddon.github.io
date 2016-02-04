((root) => {
	"use strict";

	class LifeGameGeneQuantum {
		constructor (template) {
			this.type = 0;
			this.template = template || LifeGameGeneQuantum.SampleGene;
			this.alive = false;
			this.gene = {};
			this.init();
		}
		init () {
			this.angle = 0;
			this.life = LifeGameGeneQuantum.AgeLimit;
			this.isRebirth = false;
			this.design(this.template);
		}
		design (gene) {
			if (!gene) return;
			if (gene.rebirth) this.gene.rebirth = gene.rebirth;
			if (gene.friends) this.gene.friends = gene.friends;
			if (gene.overpop) this.gene.overpop = gene.overpop;
			if (gene.actions) this.gene.actions = gene.actions;
			this.gene.force = getGeneForce(this.gene);
			this.aging = getGeneAging(this.gene);
		}
		birth (type) {
			this.type = type;
			this.alive = true;
			this.angle = 0;
			this.life = LifeGameGeneQuantum.AgeLimit;
		}
		die () {
			this.alive = false;
			this.angle = 0;
			this.life = 0;
			this.design(this.template);
		}
		envolve () {
			if (LifeGameGeneQuantum.AgeLimit <= 0) return;
			this.life -= this.aging;
			if (this.life <= 0) {
				this.die();
			}
		}
		update (neighbors) {
			var total = getTotalNeighbor(neighbors), alien;
			var neigh = [], types = [], my_type = this.type, new_life;
			this.angle += lifeEnergy(total, this.gene);
			if (this.angle > LifeGameGeneQuantum.AngleLimit) this.angle -= LifeGameGeneQuantum.AngleLimit;
			total = Math.round(total);
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
				alien = Math.round(alien);
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
			if (Math.random() <= property) {
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
			if (Math.random() <= property) {
				var index = Math.floor(this.gene.actions.length * Math.random());
				this.gene.actions[index] = LifeGameGeneQuantum.AngleLimit * Math.random() * Math.random();
			}
		}
		get copy () {
			var self = this;
			return {
				alive: self.alive,
				type: self.type,
				angle: self.angle,
				gene: copyGene(self.gene),
			}
		}
	}

	var lifeEnergy = (life, gene) => {
		var min = Math.floor(life), max = min + 1;
		if (max >= gene.actions.length) max = gene.actions.length - 1;
		life -= min;
		life = life * life * (3 - 2 * life);
		min = gene.actions[min];
		max = gene.actions[max];
		life = min + (max - min) * life;
		return life;
	};
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
		var x = 0, y = 0, delta = Math.PI * 2 / LifeGameGeneQuantum.AngleLimit, angle;
		neighbors.map((life) => {
			if (life.alive) {
				var angle = life.angle * delta;
				x += Math.sin(angle);
				y += Math.cos(angle);
			}
		});
		return Math.sqrt(x * x + y * y);
	};
	var getTotalAlien = (neighbors, type) => {
		var x = 0, y = 0, delta = Math.PI * 2 / LifeGameGeneQuantum.AngleLimit, angle;
		neighbors.map((life) => {
			if (life.alive && life.type === type) {
				var angle = life.angle * delta;
				x += Math.sin(angle);
				y += Math.cos(angle);
			}
		});
		return Math.sqrt(x * x + y * y);
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

	LifeGameGeneQuantum.SampleGene = {
		rebirth: [3],
		friends: [2, 3, 4, 5, 6, 7, 8],
		overpop: [0, 1, 2, 3],
		actions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	};
	LifeGameGeneQuantum.AgeLimit = -1;
	LifeGameGeneQuantum.AngleLimit = 50;

	// Export
	root.LifeGame = root.LifeGame || {};
	root.LifeGame.Gene = root.LifeGame.Gene || {};
	root.LifeGame.Gene.Quantum = LifeGameGeneQuantum;
}) (window);