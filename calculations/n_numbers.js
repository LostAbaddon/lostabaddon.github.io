const ALLOW_SEMI = false;
const ALLOW_MONOID = ALLOW_SEMI || false;
const MUST_ABEL = false;
const MUST_QUASI_ABEL = MUST_ABEL || false;
const MUST_IMAGE = false;
const MUST_AXIS = MUST_IMAGE || false;

var N = 3;

var tables = [];

var multiple = (table, a, b) => {
	var result = table[a][b];
	var coeff = result[1], point = result[0];
	return [point, coeff];
};

var checkTable = (table) => {
	"use strict";
	// Check Image
	if (MUST_IMAGE) {
		for (let i = 1; i < N; i ++) {
			let value = table[i][i];
			if (value[0] !== 0) return false;
			if (value[1] !== -1) return false;
		}
	}
	// Check Axis
	else if (MUST_AXIS) {
		for (let i = 1; i < N; i ++) {
			let value = table[i][i];
			if (value[0] !== 0) return false;
		}
	}
	// Check Unit
	if (!ALLOW_SEMI) {
		for (let i = 0; i < N; i ++) {
			let value;
			value = table[0][i];
			if (value[0] !== i) return false;
			if (value[1] !== 1) return false;
			value = table[i][0];
			if (value[0] !== i) return false;
			if (value[1] !== 1) return false;
		}
	}
	// Check Abelian
	if (MUST_ABEL) {
		for (let i = 0; i < N; i ++) {
			for (let j = i + 1; j < N; j ++) {
				let resultIJ = table[i][j], resultJI = table[j][i];
				if (resultIJ[0] !== resultJI[0]) return false;
				if (resultIJ[1] !== resultJI[1]) return false;
			}
		}
	}
	// Check Quasi-Abelian
	else if (MUST_QUASI_ABEL) {
		for (let i = 0; i < N; i ++) {
			for (let j = i + 1; j < N; j ++) {
				let resultIJ = table[i][j], resultJI = table[j][i];
				if (resultIJ[0] !== resultJI[0]) return false;
				if (Math.abs(resultIJ[1]) !== Math.abs(resultJI[1])) return false;
			}
		}
	}
	// Check Inverse
	if (!ALLOW_MONOID) {
		for (let i = 0; i < N; i ++) {
			let inversable = false;
			for (let j = 0; j < N; j ++) {
				let result = table[i][j];
				if (result[0] === 0 && result[1] !== 0) inversable = true;
			}
			if (!inversable) return false;
			inversable = false
			for (let j = 0; j < N; j ++) {
				let result = table[j][i];
				if (result[0] === 0 && result[1] !== 0) inversable = true;
			}
			if (!inversable) return false;
		}
	}
	// Check Association
	for (let i = 0; i < N; i ++) {
		for (let j = 0; j < N; j ++) {
			let resultIJ = table[i][j];
			for (let k = 0; k < N; k ++) {
				let resultIJ_K = table[resultIJ[0]][k];
				let resultJK = table[j][k];
				let resultI_JK = table[i][resultJK[0]];
				if (resultI_JK[0] !== resultIJ_K[0]) {
					return false;
				}
				resultIJ_K = resultIJ[1] * resultIJ_K[1];
				resultI_JK = resultI_JK[1] * resultJK[1];
				if (resultI_JK !== resultIJ_K) {
					return false;
				}
			}
		}
	}
	return true;
};

var copy = (table) => {
	"use strict";
	var result = [];
	for (let i = 0; i < N; i ++) {
		result[i] = [];
		for (let j = 0; j < N; j ++) {
			result[i][j] = [table[i][j][0], table[i][j][1]];
		}
	}
	return result;
};

var loop = (table) => {
	"use strict";
	var end = false;
	while (!end) {
		let i = 0, j = 0, hasChange = true;
		while (hasChange) {
			hasChange = false;
			let value = table[i][j];
			if (checkTable(table)) tables.push(copy(table));
			if (value[1] === -1) {
				hasChange = true;
				value[1] = 0;
				value[0] ++;
				if (value[0] === N) {
					value[0] = 0;
					j ++;
					if (j === N) {
						j = 0;
						i ++;
						if (i === N) {
							hasChange = false;
							end = true;
							i = 0;
						}
					}
				}
			}
			else if (value[1] === 1) {
				value[1] = -1;
			}
			else if (value[1] === 0) {
				value[1] = 1;
			}
		}
	}
};

var generate = (last) => {
	"use strict";
	if (!last) {
		let table = [];
		for (let i = 0; i < N; i ++) {
			table[i] = [];
			for (let j = 0; j < N; j ++) {
				table[i][j] = [0, 0];
			}
		}
		if (checkTable(table)) tables.push(table);
		generate(table);
	}
	else {
		loop(copy(last));
	}
};

var showPoint = (point) => {
	if (point === 0) return 'E';
	if (point === 1) return 'I';
	if (point === 2) return 'J';
	if (point === 3) return 'K';
	point -= 3;
	return 'Z' + point;
};
var showLine = (i, j, result, k) => {
	i = showPoint(i);
	j = showPoint(j);
	if (result === 0) return i + ' × ' + j + ' = 0;';
	if (result === 1) return i + ' × ' + j + ' = ' + showPoint(k) + ';';
	if (result === -1) return i + ' × ' + j + ' = -' + showPoint(k) + ';';
};
var showResult = (table) => {
	"use strict";
	var result = '';
	for (let i = 0; i < N; i ++) {
		let multi = multiple(table, i, i);
		result += showLine(i, i, multi[1], multi[0]) + '\n';
		for (let j = i + 1; j < N; j ++) {
			multi = multiple(table, i, j);
			result += showLine(i, j, multi[1], multi[0]) + '\t';
			multi = multiple(table, j, i);
			result += showLine(j, i, multi[1], multi[0]) + '\n';
		}
	}
	return result;
};

generate();

console.log(tables.map((t) => {
	var result = showResult(t);
	return result;
}).join('\n====\n\n'));