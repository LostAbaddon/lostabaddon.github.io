const PI4 = Math.PI * 4;

const MAX = 10000;
const dX = 0.001;
const dT = 0.001;

const scalar = [];
const gaugeH = [];
const gaugeF = [];

const dSx = [];
const dSt = [];
const dHx = [];
const dHt = [];
const dFx = [];
const dFt = [];

const diffSpace = (field, df) => {
	for (let i = 1; i < MAX; i ++) {
		df[i] = (field[i] - field[i - 1]) / dX;
	}
	df[0] = df[1] + (df[1] - df[2]) * 0.5;
};
const calFSfromH = () => {
	for (let i = MAX - 1; i > 0; i --) {
		let r = (i + 1) * dX;
		let h = gaugeH[i];
		let dh = dHx[i];
		let df = dh / h + 2 / r * (h - 1);
		let f = gaugeF[i];
		dFt[i] = df * f;
		gaugeF[i - 1] = f - dFt[i] * dX;
		let ds = (dh / h + 1 / r * (h - 1)) / (PI4 * r) - (dSx[i] ** 2);
		ds = ds * f / h;
	}
	dFt[0] = dFt[1] + (dFt[1] - dFt[2]) * 0.5;
};

const initSpace = () => {
	for (let i = 0; i < MAX; i ++) {
		let r = (i + 1) * dX;
		gaugeH[i] = 1 + 1 / (0.1 + r);
		dHt[i] = 0;
		scalar[i] = 0;
	}
	gaugeF[MAX - 1] = gaugeH[MAX - 1];
	diffSpace(gaugeH, dHx);
	diffSpace(scalar, dSx);
	calFSfromH();
};

const init = () => {
	initSpace();
};

init();

console.log(gaugeH, gaugeF, dSt);