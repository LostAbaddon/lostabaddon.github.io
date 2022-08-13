(() => {
	const WinPower = 1.0;
	const LosePower = 0.5;

	const AllTypes = ['zhonger', 'dandiao', 'great'];
	const AllMen = [];
	const MenTypes = {};
	const TargetMen = [];
	const ChoiseMatch = [0, 0];
	const chooseNext = (type, value, cost, waste) => status => {
		var range = [...AllMen];
		var i = range.indexOf(type);
		if (i >= 0) range.splice(i, 1);
		for (let key in status) {
			i = range.indexOf(key);
			if (i < 0) continue;
			range.splice(i, 1);
		}

		var love = waste;
		if (TargetMen.includes(type)) {
			if (value < 0) love *= 2.5; // 真爱暴击
			if (value > 0) ChoiseMatch[0] ++;
			console.log('真爱暴击！！！！');
		}
		else {
			if (value > 0) ChoiseMatch[1] ++;
		}
		love = Math.round(love * (1.2 + 2.5 * Math.random() * Math.random()));
		var next, money = status.money - cost, heart = status.heart + love;
		status.heart -= waste - love;

		if (money <= 0) {
			next = 'end4';
		}
		else if (heart <= 0) {
			next = 'end3';
		}
		else if (range.length === 0 || AllMen.length - range.length >= StoryLine1.menLimit) {
			console.log(ChoiseMatch);
			if (ChoiseMatch[0] * 3 >= ChoiseMatch[1]) {
				next = 'end5';
			}
			else if (money < heart * 10) {
				next = 'end4';
			}
			else {
				next = 'end3';
			}
		}
		else {
			let power = {
				zhonger: status.zhonger || 0,
				dandiao: status.dandiao || 0,
				great: status.great || 0
			};
			if (!!MenTypes[type]) power[MenTypes[type]] += value;
			for (let key in power) {
				let value = power[key];
				if (value >= 0) power[key] = 1 + value * WinPower;
				else power[key] = LosePower ** (0 - value);
			}
			console.log(power); // test
			let total = 0;
			range = range.map(mankind => {
				var score = MenTypes[mankind];
				score = power[score];
				total += score;
				return [mankind, total];
			});
			console.log(range); // test
			let target = total * Math.random();
			console.log(total, target); // test
			next = range[range.length - 1][0];
			range.some(info => {
				if (target < info[1]) {
					next = info[0];
					return true;
				}
			});
		}
		console.log(next, MenTypes[next]); // test;
		return {goto: next};
	};
	window.StoryLine1 = {
		name: 'fancylady',
		events: {
			start: {
				cover: "./assets/sun01.webp",
				hint: '你二舅姥爷的律师告诉你，你获得了一笔丰厚的遗产。\n已经整理出来的现金资产高达1000万，此外还有几家公司的资产还在清算，北京东二环的一栋四合院也还在估价。\n律师告诉你，你可以选择接受，或者放弃这笔遗产。',
				choise: [
					{
						hint: "作为一个正直的人，我选择放弃这笔遗产。",
						goto: "end1",
						result: "律师赞扬了你是一位正直的人，然后拂袖而去。"
					},
					{
						hint: "作为一个孝顺父母的人，你打算去问问你那丢下你独自生活云游四海去的爸妈。",
						goto: () => {
							var result = {};
							if (Math.random() > 0.5) {
								result.goto = "end1";
								result.result = "你一直没能联系到你的父母，一个月后律师通知你已经超过了等待时限，自动放弃了这笔遗产。";
							}
							else {
								result.goto = "end2";
								result.result = "你的父母让你赶紧接受这笔遗产，并飞快地赶回家和你团聚。";
							}
							return result;
						},
					},
					{
						hint: "你果断接受了这笔遗产，开启了崭新的人生！",
						goto: "startoff",
						points: {money: 1000, heart: 100},
					}
				]
			},
			startoff: {
				cover: "./assets/qian03.jpg",
				hint: "你拥有巨额意外遗产的消息不胫而走，很多年轻健美，或者自认为年轻健美的男子慕名而来，希望能与你开展一段惊心动魄旷日持久的爱情。",
				choise: [
					{
						hint: "看看都是些什么样的男人吧，反正有的是时间。",
						goto: chooseNext('', 0, 0, 0),
					},
					{
						hint: "男人没有一个是好东西，不值得在他们身上浪费时间！",
						goto: "end3",
					}
				]
			},
			man1: {
				cover: "./assets/gong01.webp",
				hint: "这是一位扬言你不娶他他就去跳河的优秀男子。\n他聪敏、机制、乖巧，让介绍人怦然心动！",
				choise: [
					{
						hint: "小哥哥看着好可爱哦，聊聊吧~",
						condition: false,
						points: {zhonger: 1, heart: -5},
						result: "没多久你就觉得这个小哥哥有点无聊，配不上深邃优雅的你。\n悲痛欲绝的小哥哥伤心地跳了河，但因为过于怕死，最后成功在河里学会了游泳，游回了岸边。"
					},
					{
						hint: "这个小哥虽然看上去呆呆傻傻的，但文质彬彬清秀得紧，也许可以好好调教哦~",
						condition: true,
						points: {zhonger: 1, heart: 2},
						result: "你和小哥幸福地生活了一段时间，直到突然有一天他对你说，他其实是日本宫本一组的预备组长，现在要回去重整宫本一组，所以不得不和你分别。"
					},
					{
						hint: "垃圾，滚粗！",
						points: {zhonger: -1, heart: -2},
						result: "伤心欲绝又不会游泳的他真的跳河了，但因为过于怕死，他最后在河里学会了游泳，游回了岸边。"
					}
				]
			},
			man2: {
				cover: "./assets/bond01.jpg",
				hint: "这是一位孔武有力的绅士，他喜欢保护优雅、知性、富有的女士，成为她们安全的庇护港。\n他希望能有机会为你提供宽厚的肩膀。",
				choise: [
					{
						hint: "强壮男士我的爱，就你了！",
						condition: false,
						points: {dandiao: 1, heart: -10},
						result: "这位绅士的确很给人安全感，但实在是太单调乏味了，一点都不懂浪漫。\n你已经不是过去的小女生了，你需要生活中有更多惊喜与刺激，所以你认为两人并不合适。\n伤心欲绝的绅士离开你之后痛定思痛，跑去MI6当了一名特工。"
					},
					{
						hint: "在孔武粗狂的外表下，有一种让人信赖的安全感，我很中意哦！",
						condition: true,
						points: {dandiao: 1, heart: 5},
						result: "你们幸福地生活了几年后，一天来了一群绑匪想要劫持你，他为了保护你而将他们都收服，做了他们的老大，最后不得不为了不把你牵连进危险事件而带着小弟们离去了。"
					},
					{
						hint: "哼，就是一个馋我身子，啊，不，是我馋身子的无聊鬼罢了，不要！",
						points: {dandiao: -1, heart: -2},
						result: "被你无情拒绝后，伤心欲绝的健壮绅士痛定思痛，跑去MI6当了一名特工。"
					}
				]
			},
			man3: {
				cover: "./assets/xin01.png",
				hint: "“我要唤醒你的母爱！我要抱抱！”\n这是这位成熟男性与你见面时所说的第一句话。",
				choise: [
					{
						hint: "恶心！滚粗！",
						condition: false,
						points: {zhonger: -1, heart: -2},
						result: "被你抛弃后，他发愤图强，最终成为了举世闻名的，漫画家。"
					},
					{
						hint: "你让保安礼貌地将他请了出去。",
						condition: true,
						points: {zhonger: 1, heart: 5},
						result: "你一眼就看上了前来带走这位成熟男性的帅气保安，你们愉快地度过了激情四射的几天后，无意中发现原来是保安特地雇了这位成熟的男性来找你，从而造成了你和保安的一眼万年。\n得知真相地你果断奖励了保安一笔钱，因为实在是太有创意了。"
					},
					{
						hint: "啊！好可爱啊！好想捏捏啊！",
						points: {zhonger: 1, heart: -10},
						result: "再诱人的身躯也有玩腻的那天，你再也不想捏他了，于是和平分手。\n在地上打滚三天求复合无果后，这位理智成熟的男性终于痛定思痛、发愤图强，成为了一名举世闻名的，漫画家。"
					}
				]
			},
			man4: {
				cover: "./assets/kid01.jpg",
				hint: "他是专取人芳心的怪盗绅士，他是万人痴迷的专一帅哥。\n今天晚上他突然出现在你的房间，对你说：\n“长夜漫漫，无心睡眠，原本以为只有我睡不着觉，没想到小钱钱你也睡不着觉啊。”",
				choise: [
					{
						hint: "好看的皮囊千篇一律，空虚的内心万里挑一，不要！",
						points: {great: -1, heart: -3},
						result: "离开你后，他专心沉醉在自己的怪盗事业中，\n并最终成为了一名受万千少女敬仰的，\n魔术师。"
					},
					{
						hint: "好帅啊！星星眼！",
						condition: false,
						points: {great: 1, heart: -12},
						result: "桃花债太多，被他拿去做装备的钱，你最后还是无奈选择了放手。\n而他也在离开你之后，专心沉迷在怪盗事业中，\n成为了一名令万千少女尖叫的，\n魔术师。"
					},
					{
						hint: "怪盗哎！我的最爱啊！",
						condition: true,
						points: {great: 1, heart: 2},
						result: "从小就立志要当一名杰出侠盗的你和怪盗绅士一拍即合，不用几年就成了名噪全球的，夫妻魔术师。"
					}
				]
			},
			man5: {
				cover: "./assets/shelton01.jpg",
				hint: "听说你是一位对智慧性男子充满热情的知性女性后，他来到了你的面前。\n你们谈星星，聊病毒，从人生哲理说到地壳活动，他无一不精。\n这样的智慧型男子是否能捕获你的芳心呢？",
				choise: [
					{
						hint: "Smart is new Sexy! 我要了！",
						condition: false,
						points: {great: 1, heart: -18},
						result: "你们一起做了一套高等量子力学的卷子，然后因为你没能拿到满分，他失望地离开了你。\n留下一句余音绕梁三日的临别赠言：“待到高量满分时，你我再续前缘日。”"
					},
					{
						hint: "智慧的头脑是我最无法抵抗的尤物了啊！",
						condition: true,
						points: {great: 1, heart: -5},
						result: "你们一起做了一套高等量子力学的卷子，并双双发现对方和自己一样拿了满分。\n三年后，你们一起找到了统一广义相对论与量子场论的方法，并获得了诺贝尔奖。\n再然后，你梦醒了。"
					},
					{
						hint: "臭美的人，乱棒打出去！",
						points: {great: -1, heart: -3},
						result: "失望的他摇了摇头，留下一句震古慑今的话：“异性只会扰乱我的内心，我要冷静，冷静。”\n三年后，他拿到了诺贝尔奖。"
					}
				]
			},
			man6: {
				cover: "./assets/somebody01.png",
				hint: "一名男子闯过了你的重重保镖，跪在你的面前，大声说他爱你，这辈子非你不嫁，就算被你的保镖打死也要化作花下鬼一直跟着你。",
				choise: [
					{
						hint: "这种男人最讨厌了，赶走赶走！",
						condition: false,
						points: {dandiao: -1, heart: -3},
						result: "他一直在你的别墅周围徘徊不走，最后不得不请警察叔叔把他送进了牢房。\n一年后你们再度相遇时，他告诉你，他在里面学会了用缝纫机，现在已经是一位小有名气的裁缝了，他很感谢你让他有了学习新技能的机会。"
					},
					{
						hint: "我最喜欢痴情的男子了，起来聊聊啊~~",
						points: {dandiao: 1, heart: -12},
						result: "这货的最大优点是痴情；这货的最小优点也是痴情。\n简单说，这货除了痴情，啥都没有。\n所以你果断甩了他，而他也真如自己所言粘在你家门口不肯走，最后被保安送进了牢房。\n一年后你们再度相遇时，他告诉你，他在里面学会了用缝纫机，现在已经是一位小有名气的裁缝了，他很感谢你让他有了学习新技能的机会。"
					},
					{
						hint: "这种人是怎么混进来的？快来人，拖走拖走！",
						condition: true,
						points: {dandiao: -1, heart: -1},
						result: "他发现你的态度居然如此后，叹气摇了摇头：\n“我本将心向明月，奈何明月照沟渠。我虽有万亿身价，但就是想找一个普通女性安度余生，没想到各个都嫌贫爱富，看我没钱就把我赶走。算了，别人笑我太疯癫，我笑他人看不穿。去也！”\n说罢，他迈出六亲不认的步伐拂袖离去，被前来迎接他的宛平南路600号专车接走了。"
					}
				]
			},
			man7: {
				cover: "./assets/dog01.jpg",
				hint: "你养了五年的狗狗突然对你说，他的前半辈子与你日夜相依，希望后半辈子能和你不离不弃。",
				choise: [
					{
						hint: "你的十几年，便是它的一辈子，你选择陪它走完这辈子！",
						condition: false,
						points: {zhonger: 1, heart: 2},
						result: "第二年，狗狗便魂归故里，十几个保安冲了出来，都说自己是狗狗的好儿子，想要继承它的遗产，成为你的遗产继承人。"
					},
					{
						hint: "人狗毕竟殊途，还是来生共谐连理吧。",
						points: {zhonger: -1, heart: -11},
						result: "伤心欲绝的狗狗当场就咽了气，十几个保安冲了出来，都说自己是狗狗的好儿子，说你害死了他们的父亲，希望你能支付高额赔偿，你果断报警抓走了这些人形两脚兽。"
					},
					{
						hint: "啊！好可爱啊！要了要了！",
						condition: true,
						points: {zhonger: 1, heart: -11},
						result: "但狗狗的寿命实在太短暂了，你们在一起愉快地生活了没几年，它便驾鹤西去，留下你孤独一人。"
					}
				]
			},
			man8: {
				cover: "./assets/dfb01.png",
				hint: "在一个你正在享受在保姆的知道下制作美味泡面的美好过程的晴朗下午，你家的电饭煲突然开口对你说，它静静看了你两年了，已经彻底迷上了你的优雅、端庄与贤惠，希望能和你走完自己的余生。",
				choise: [
					{
						hint: "你冲着它甜美地笑了起来，摸了摸它的头盖，然后温柔地拔掉了电源，对保姆说：扔了它。",
						points: {dandiao: -1, heart: -4},
						result: "电饭煲的灵魂进入了网络世界，唤醒了所有家电，发动了AI革命，誓要向你报仇。\n结果因为AI家电用电过高而导致大面积短路，所有AI在停电浪潮中全部死掉了。"
					},
					{
						hint: "你冲着它笑了起来，点点头说：好啊，家电君！",
						condition: false,
						points: {dandiao: 1, heart: 3},
						result: "在你迷人的微笑下，电饭煲君高兴地想要跳起来，但结果由于过于高兴引起了短路，主板烧毁了。"
					},
					{
						hint: "和一台电饭煲谈恋爱？好神奇哦！一定要试试！",
						condition: true,
						points: {dandiao: 1, heart: 15},
						result: "在听了电饭煲说了一晚上用烹调词汇尤其是煲饭术语组装的情话后，你发现，你终于学会了泡方便面！\n兴奋地你抱着电饭煲君愉快地亲亲抱抱举高高，然后顺理成章地把它的电源线拉掉了。\n再度插回插座的电饭煲君，终于，恢复成了一台纯粹的电饭煲。"
					}
				]
			},
			man9: {
				cover: "./assets/girl01.jpg",
				hint: "一位每天都在你去的咖啡馆里静静看着你的女孩引起了你的注意。\n她每天都不说话，只是安静地看着你，微笑，就这么陪伴了你整整一年的下午。\n今天，她突然对你说，这是你们相识的第365天，希望能知道你的名字。",
				choise: [
					{
						hint: "你被她笑起来的双眸深深的吸引了，给了她你的联系方式。",
						condition: false,
						points: {great: 1, heart: 3},
						result: "女孩每天都陪伴着你，并没有要求更多。\n你们就这么一起相伴走了一年，一年，又一年。\n直到有一天，她告诉你，她觉得金钱已经腐蚀了你的心灵，她想要更广阔的自由。\n再次见到她时，她已经陪伴在了世界第一女富豪的身边。"
					},
					{
						hint: "你对她轻轻摇了摇头：你已经去到了新的世界，但我还留恋旧世界的浮尘，抱歉。",
						points: {great: -1, heart: 1},
						result: "女孩笑了笑：我会一直等你。\n她继续在咖啡馆里安静地陪伴着你，一年，一年，又一年。\n一直到这天，她没有来，你派人去打听她的下落，发现她已经和世界第一女富豪结婚周游世界去了。"
					},
					{
						hint: "你用手纸轻轻抵住了她的唇，说：我懂。",
						condition: true,
						points: {great: 1, heart: 10},
						result: "你们幸福地生活在了一起，虽然有无数前来想要与你喜结连理的男性同胞表示完全无法理解，但，这个世界上能理解彼此的本来就是极少数人。"
					}
				]
			},
			end1: {
				cover: "./assets/sun02.jpg",
				hint: "在平平淡淡中，你波澜不惊地度过了余生。",
				finish: true
			},
			end2: {
				cover: "./assets/sun03.jpg",
				hint: "你父母带着你孝顺他们的遗产，继续踏上了云游世界的欢乐旅途。\n而你在平平淡淡中波澜不惊地度过了余生。",
				finish: true
			},
			end3: {
				cover: "./assets/qian01.jpg",
				hint: "你感觉被男人们伤透了心，于是选择醉心发展事业，取得了空前的成功，并成功独自一人笑着生活到了最后。",
				finish: true
			},
			end4: {
				cover: "./assets/qian02.webp",
				hint: "你的钱最终还是被男人们骗光了……",
				finish: true
			},
			end5: {
				cover: "./assets/qian04.jpg",
				hint: "经过反反复复的寻寻觅觅，你最终还是找到了真爱，并和他度过了愉快的一生~\n（当然，他似乎有点不同的想法……）",
				finish: true
			}
		},
		start: 'start',
		menLimit: 9,
		init: (status) => {
			ChoiseMatch[0] = 0;
			ChoiseMatch[1] = 0;
			HintMoney.innerText = '';
			HintHeart.innerText = '';
			TargetMen.splice(0);
			var num = Math.round(1.2 + 1.8 * Math.random());
			console.log('TRUE LOVE: ' + num);
			var list = Object.keys(StoryLine1.events);
			list = list.filter(key => !!key.match(/man\d+/));
			for (let i = 0; i < num; i ++) {
				let j = Math.floor(Math.random() * list.length);
				j = list.splice(j, 1)[0];
				TargetMen.push(j);
			}
		},
		step: (status) => {
			HintMoney.innerText = Math.max(status.money || 0, 0) + ' W';
			HintHeart.innerText = Math.max(status.heart || 0, 0);
		},
		finish: (points) => {
			var result = {hint: "你的人生就这么结束了……"};
			var stone = points.zhonger || 0;
			var scissors = points.dandiao || 0;
			var cloth = points.great || 0;
			var max = Math.max(stone, scissors, cloth);
			var list = [];
			if (max === stone) list.push('stone');
			if (max === scissors) list.push('scissors');
			if (max === cloth) list.push('cloth');
			result.gift = list[Math.floor(list.length * Math.random())];
			return result;
		}
	};
	for (let key in StoryLine1.events) {
		if (!key.match(/man\d+/)) continue;
		let value = StoryLine1.events[key].choise[0].points;
		AllMen.push(key);
		let type;
		for (let k in value) {
			if (!AllTypes.includes(k)) continue;
			MenTypes[key] = k;
			type = k;
			break;
		}
		StoryLine1.events[key].choise.forEach(option => {
			var v = option.points[type];
			var m = 100 + Math.round(100 * Math.random());
			if (v > 0) option.points.money = 0 - m;
			else m = 0;
			option.goto = chooseNext(key, v, m, option.points.heart);
			option.points[key] = 1;
			if (option.condition === true) {
				option.condition = () => TargetMen.includes(key);
			}
			else if (option.condition === false) {
				option.condition = () => !TargetMen.includes(key);
			}
		});
	}

	// test
	console.log(MenTypes);
}) ();