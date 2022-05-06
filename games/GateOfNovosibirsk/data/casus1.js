window.Data = window.Data || {};
window.Data.casus1 = window.Data.casus1 || {};
window.Data.casus1.terrain =
`
FFFFFFFFFFFFFFFRFFFFFFFFFFFFFF
FHLLLFFFFFFFFFFFFFFFFFWWWWWWWW
FFFFLFFFFFWWWWWWWWWWWWWBBBBBBB
FFFFLTWWWWWBBBBBRBBBBBBBFFFFFF
WWWWWWWFFFFFLLLLLLLLLLLLLFFFFF
FFFFLFFFLLLLLHUUUUHLUHUHLMMMMM
FFPHLFFLLUUHLUUHLLLLUUUULMMMMM
FFPLLLLLUUULLUULLUULHUHULCCCCR
FFPLUUUHUUULUUULUUHLLLLLLMMMMM
FFHLHUUUUHLLUUULUUUUUUUHLLLLMM
FPPLUUHUUUHUUHLLLUUHUUUHUUHLFF
LLLLLLLLLLLLLLLTLLLLLLLLLLLLLL
FPLHUULUHUUHUULLLUHUUUHUUHUULF
FPLUUULUUUUUUUHLUUUHLUUUUUUHLF
FPLUUULLHUULLLLLUUUULLLHUUULLF
FPLHUUULUUULHHUUUUUUUULUUUULFF
FPLUUUULLUULLLLLLHUUUHLUUHLLFF
FHLUUUUHLUHLUUHULLLLLLLHUULFFF
FLLLLLLLLUULUUUUUURUUHLLLLLFFF
FLPHUUHUHUULHUUUUUUUUULFFFFFFF
RLPUUUUUUUPLLLLSSSSSSSLTMMMMMM
FLLLLLRUUUPLFFLLLFFFMMCMMMMMMM
FPPPRLLLPPRLRFSSLLFMMMCCCCRMMM
FFFFPPRLLLLLSSSSFHMMMMMMMMMMMM
FFFFFFFFFFFFFFFFFFMMMMMMMMMMMM
`;

window.Data.casus1.extraPath = [
	[4, 4],
	[22, 21],
	[22, 22],
	[23, 22],
	[24, 22],
	[25, 22],
	[11, 3],
	[12, 3],
	[13, 3],
	[14, 3],
	[15, 3],
	[17, 3],
	[18, 3],
	[19, 3],
	[20, 3],
	[21, 3],
	[22, 3],
	[23, 3],
	[23, 2],
	[24, 2],
	[25, 2],
	[26, 2],
	[27, 2],
	[28, 2],
	[29, 2],
];
window.Data.casus1.eventPath = [
	[
		['laboratory', [29, 7]],
		[25, 7],
		[26, 7],
		[27, 7],
		[28, 7],
		[28, 8],
		[29, 8],
		[29, 9],
		[29, 10],
		[28, 6],
		[29, 6],
		[29, 5],
		[29, 4],
		[29, 3],
	],
	[
		['secretLab', [15, 0]],
		[14, 0],
		[13, 0],
		[12, 0],
		[11, 0],
		[10, 0],
		[9, 0],
		[8, 0],
		[7, 0],
		[7, 1],
		[6, 1],
		[5, 1],
		[14, 1],
		[15, 1],
		[16, 1],
		[17, 1],
		[18, 1],
		[18, 2],
		[3, 5],
		[2, 5],
		[1, 5],
		[0, 5],
		[0, 6],
		[0, 7],
		[0, 8],
		[0, 9],
		[0, 10],
		[0, 12],
		[0, 13],
		[0, 14],
		[0, 15],
		[0, 16],
		[0, 17],
		[0, 18],
		[12, 23],
		[13, 23],
		[14, 23],
		[15, 23],
		[15, 24],
		[16, 24],
		[17, 24],
		[18, 24],
		[19, 24],
		[20, 24],
		[21, 24],
		[22, 24],
		[23, 24],
		[24, 24],
		[25, 24],
		[26, 24],
		[26, 23],
		[27, 23],
		[27, 22],
		[27, 21],
		[26, 21],
		[25, 21],
		[20, 12],
		[20, 9],
		[20, 10],
		[11, 10],
		[9, 16],
		[10, 16],
		[15, 20],
		[16, 20],
		[17, 20],
		[18, 20],
		[19, 20],
		[20, 20],
		[21, 20],
	]
];

window.Data.casus1.startPoints = [
	[14, 10],
	[15, 10],
	[16, 10],
	[16, 11],
	[16, 12],
	[15, 12],
	[14, 12],
	[14, 11],
];

window.Data.casus1.forbiddens = ['laboratory', 'secretLab'];
window.Data.casus1.waitingBuilds = ["residential", "restaurant", "storehouse", "refitor", "school", "bookshop", "comproom", "printroom"];
window.Data.casus1.hauntedBuilds = ["haunted"];
window.Data.casus1.houses = {
	// Sculpture
	"15-11": {
		type: "fountain",
		range: 1,
	},
	"5-3": {
		type: "devilsculpture",
		range: 1,
		power: 2,
	},
	"23-20": {
		type: "devilsculpture",
		range: 1,
		power: 1,
	},

	// House
	"1-1": {
		door: [2, 1],
		type: "manor",
	},
	"1-17": {
		door: [2, 17],
		type: "church",
	},
	"2-9": {
		door: [3, 9],
	},
	"3-6": {
		door: [4, 6],
	},
	"3-12": {
		door: [3, 11],
	},
	"3-15": {
		door: [2, 15],
	},
	"3-19": {
		door: [3, 18],
	},
	"4-9": {
		door: [3, 9],
	},
	"6-10": {
		door: [6, 11],
	},
	"6-19": {
		door: [6, 18],
	},
	"7-8": {
		door: [7, 7],
	},
	"7-17": {
		door: [8, 17],
		type: "dataCenter",
	},
	"8-12": {
		door: [8, 11],
	},
	"8-14": {
		door: [7, 14],
	},
	"8-19": {
		door: [8, 18],
	},
	"9-9": {
		door: [10, 9],
		type: "hall",
	},
	"10-10": {
		door: [10, 11],
	},
	"10-17": {
		door: [11, 17],
	},
	"11-6": {
		door: [12, 6],
	},
	"11-12": {
		door: [11, 11],
	},
	"12-15": {
		door: [11, 15],
	},
	"12-19": {
		door: [12, 20],
		type: "library",
	},
	"13-5": {
		door: [13, 4],
	},
	"13-10": {
		door: [14, 10],
	},
	"13-15": {
		door: [13, 16],
	},
	"14-13": {
		door: [14, 12],
	},
	"14-17": {
		door: [14, 16],
	},
	"15-6": {
		door: [15, 7],
	},
	"17-16": {
		door: [16, 16],
	},
	"17-23": {
		door: [17, 22],
		type: "chargeStation",
	},
	"18-5": {
		door: [18, 4],
	},
	"18-8": {
		door: [19, 8],
	},
	"18-12": {
		door: [18, 11],
	},
	"19-10": {
		door: [19, 11],
	},
	"19-13": {
		door: [20, 13],
	},
	"20-7": {
		door: [20, 8],
	},
	"21-5": {
		door: [21, 4],
	},
	"21-16": {
		door: [21, 17],
	},
	"21-18": {
		door: [21, 17],
	},
	"22-7": {
		door: [22, 8],
	},
	"22-12": {
		door: [22, 11],
		type: "gym",
	},
	"23-10": {
		door: [23, 11],
	},
	"23-5": {
		door: [23, 4],
	},
	"23-9": {
		door: [23, 8],
	},
	"23-14": {
		door: [22, 14],
	},
	"23-17": {
		door: [22, 17],
	},
	"25-12": {
		door: [25, 11],
	},
	"25-16": {
		door: [26, 16],
	},
	"26-10": {
		door: [27, 10],
	},
	"27-13": {
		door: [27, 14],
		type: "medical",
	},

	// Ruin
	"0-20": {
		door: [1, 20],
	},
	"4-22": {
		door: [4, 21],
	},
	"6-21": {
		door: [5, 21],
	},
	"6-23": {
		door: [6, 22],
		type: "cemetery",
	},
	"10-22": {
		door: [10, 23],
	},
	"12-22": {
		door: [11, 22],
	},
	"15-0": {
		door: [14, 0],
		type: "secretLab",
	},
	"16-3": {
		door: [16, 4],
	},
	"18-18": {
		door: [18, 17],
	},
	"26-22": {
		door: [25, 22],
		type: "mineral",
	},
	"29-7": {
		door: [28, 7],
		type: "laboratory",
	},
};