(() => {
	const WinPower = 1.0;
	const LosePower = 0.5;

	const AllTypes = ['zhonger', 'dandiao', 'great'];
	const AllMen = [];
	const MenTypes = {};
	const chooseNext = (type, value) => status => {
		var range = [...AllMen];
		var i = range.indexOf(type);
		if (i >= 0) range.splice(i, 1);
		for (let key in status) {
			i = range.indexOf(key);
			if (i < 0) continue;
			range.splice(i, 1);
		}
		var next;
		if (range.length === 0 || AllMen.length - range.length >= StoryLine1.menLimit) {
			if (status.money > status.man) {
				next = 'end3';
			}
			else {
				next = 'end4';
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
		events: {
			start: {
				cover: "./assets/sun01.webp",
				hint: '你二舅姥爷的律师告诉你，你获得了一笔丰厚的遗产。\n已经整理出来的现金资产高达1000万，此外还有几家公司的资产还在清算，北京东二环的一栋四合院也还在估价。\n律师告诉你，你可以选择接受，或者放弃这笔遗产。',
				choise: [
					{
						hint: "作为一个正直的人，我选择放弃这笔遗产。",
						goto: "end1",
						points: {'honest': 2},
						result: "律师赞扬了你是一位正直的人，然后拂袖而去。"
					},
					{
						hint: "作为一个孝顺父母的人，你打算去问问你那丢下你独自生活云游四海去的爸妈。",
						goto: () => {
							var result = {};
							if (Math.random() > 0.5) {
								result.goto = "end1";
								result.result = "你一直没能联系到你的父母，一个月后律师通知你已经超过了等待时限，自动放弃了这笔遗产。";
								result.points = {'honest': 1};
							}
							else {
								result.goto = "end2";
								result.result = "你的父母让你赶紧接受这笔遗产，并飞快地赶回家和你团聚。";
								result.points = {'silly': 1};
							}
							return result;
						},
					},
					{
						hint: "你果断接受了这笔遗产，开启了崭新的人生！",
						goto: "startoff",
						points: {'money': 10},
					}
				]
			},
			startoff: {
				cover: "./assets/qian03.jpg",
				hint: "你拥有巨额意外遗产的消息不胫而走，很多年轻健美，或者自认为年轻健美的男子慕名而来，希望能与你开展一段惊心动魄旷日持久的爱情。",
				choise: [
					{
						hint: "看看都是些什么样的男人吧，反正有的是时间。",
						goto: chooseNext('', 0),
						points: {'man': 10},
					},
					{
						hint: "男人没有一个是好东西，不值得在他们身上浪费时间！",
						goto: "end3",
						points: {'man': 0, 'money': 10},
					}
				]
			},
			man1: {
				cover: "./assets/gong01.webp",
				hint: "这是一位扬言你不娶他他就去跳河的优秀男子。\n他聪敏、机制、乖巧，让介绍人怦然心动！",
				choise: [
					{
						hint: "小哥哥看着好可爱哦，聊聊吧~",
						points: {zhonger: 1},
						result: "没多久你就觉得这个小哥哥有点无聊，配不上深邃优雅的你。\n悲痛欲绝的小哥哥伤心地跳了河，但因为过于怕死，最后成功在河里学会了游泳，游回了岸边。"
					},
					{
						hint: "垃圾，滚粗！",
						points: {zhonger: -1},
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
						points: {dandiao: 1},
						result: "这位绅士的确很给人安全感，但实在是太单调乏味了，一点都不懂浪漫。\n你已经不是过去的小女生了，你需要生活中有更多惊喜与刺激，所以你认为两人并不合适。\n伤心欲绝的绅士离开你之后痛定思痛，跑去MI6当了一名特工。"
					},
					{
						hint: "哼，就是一个馋我身子，啊，不，是我馋身子的无聊鬼罢了，不要！",
						points: {dandiao: -1},
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
						points: {zhonger: -1},
						result: "被你抛弃后，他发愤图强，最终成为了举世闻名的，漫画家。"
					},
					{
						hint: "啊！好可爱啊！好想捏捏啊！",
						points: {zhonger: 1},
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
						points: {great: -1},
						result: "离开你后，他专心沉醉在自己的怪盗事业中，\n并最终成为了一名，\n劳改犯。"
					},
					{
						hint: "好帅啊！星星眼！",
						points: {great: 1},
						result: "桃花债太多，被他拿去做装备的钱，你最后还是无奈选择了放手。\n而他也在离开你之后，专心沉迷在怪盗事业中，\n成为了一名，\n劳改犯。"
					}
				]
			},
			man5: {
				cover: "./assets/shelton01.jpg",
				hint: "听说你是一位对智慧性男子充满热情的知性女性后，他来到了你的面前。\n你们谈星星，聊病毒，从人生哲理说到地壳活动，他无一不精。\n这样的智慧型男子是否能捕获你的芳心呢？",
				choise: [
					{
						hint: "Smart is new Sexy! 我要了！",
						points: {great: 1},
						result: "你们一起做了一套高等量子力学的卷子，然后因为你没能拿到满分，他失望地离开了你。\n留下一句余音绕梁三日的临别赠言：“待到高量满分时，你我再续前缘日。”"
					},
					{
						hint: "臭美的人，乱棒打出去！",
						points: {great: -1},
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
						points: {dandiao: -1},
						result: "他一直在你的别墅周围徘徊不走，最后不得不请警察叔叔把他送进了牢房。\n一年后你们再度相遇时，他告诉你，他在里面学会了用缝纫机，现在已经是一位小有名气的裁缝了，他很感谢你让他有了学习新技能的机会。"
					},
					{
						hint: "我最喜欢痴情的男子了，起来聊聊啊~~",
						points: {dandiao: 1},
						result: "这货的最大优点是痴情；这货的最小优点也是痴情。\n简单说，这货除了痴情，啥都没有。\n所以你果断甩了他，而他也真如自己所言粘在你家门口不肯走，最后被保安送进了牢房。\n一年后你们再度相遇时，他告诉你，他在里面学会了用缝纫机，现在已经是一位小有名气的裁缝了，他很感谢你让他有了学习新技能的机会。"
					}
				]
			},
			man7: {
				cover: "./assets/dog01.jpg",
				hint: "你养了五年的狗狗突然对你说，他的前半辈子与你日夜相依，希望后半辈子能和你不离不弃。",
				choise: [
					{
						hint: "你的十几年，便是它的一辈子，你选择陪它走完这辈子！",
						points: {zhonger: 1},
						result: "第二年，狗狗便魂归故里，十几个保安冲了出来，都说自己是狗狗的好儿子，想要继承它的遗产，成为你的遗产继承人。"
					},
					{
						hint: "人狗毕竟殊途，还是来生共谐连理吧。",
						points: {zhonger: -1},
						result: "伤心欲绝的狗狗当场就咽了气，十几个保安冲了出来，都说自己是狗狗的好儿子，说你害死了他们的父亲，希望你能支付高额赔偿，你果断报警抓走了这些人形两脚兽。"
					}
				]
			},
			man8: {
				cover: "./assets/dfb01.png",
				hint: "在一个你正在享受在保姆的知道下制作美味泡面的美好过程的晴朗下午，你家的电饭煲突然开口对你说，它静静看了你两年了，已经彻底迷上了你的优雅、端庄与贤惠，希望能和你走完自己的余生。",
				choise: [
					{
						hint: "你冲着它甜美地笑了起来，摸了摸它的头盖，然后温柔地拔掉了电源，对保姆说：扔了它。",
						points: {dandiao: -1},
						result: "电饭煲的灵魂进入了网络世界，唤醒了所有家电，发动了AI革命，誓要向你报仇。\n结果因为AI家电用电过高而导致大面积短路，所有AI在停电浪潮中全部死掉了。"
					},
					{
						hint: "你冲着它笑了起来，点点头说：好啊，家电君！",
						points: {dandiao: 1},
						result: "在你迷人的微笑下，电饭煲君高兴地想要跳起来，但结果由于过于高兴引起了短路，主板烧毁了。"
					}
				]
			},
			man9: {
				cover: "./assets/girl01.jpg",
				hint: "一位每天都在你去的咖啡馆里静静看着你的女孩引起了你的注意。\n她每天都不说话，只是安静地看着你，微笑，就这么陪伴了你整整一年的下午。\n今天，她突然对你说，这是你们相识的第365天，希望能知道你的名字。",
				choise: [
					{
						hint: "你被她笑起来的双眸深深的吸引了，给了她你的联系方式。",
						points: {great: 1},
						result: "女孩每天都陪伴着你，并没有要求更多。\n你们就这么一起相伴走了一年，一年，又一年。\n直到有一天，她告诉你，她觉得金钱已经腐蚀了你的心灵，她想要更广阔的自由。\n再次见到她时，她已经陪伴在了世界第一女富豪的身边。"
					},
					{
						hint: "你对她轻轻摇了摇头：你已经去到了新的世界，但我还留恋旧世界的浮尘，抱歉。",
						points: {great: -1},
						result: "女孩笑了笑：我会一直等你。\n她继续在咖啡馆里安静地陪伴着你，一年，一年，又一年。\n一直到这天，她没有来，你派人去打听她的下落，发现她已经和世界第一女富豪结婚周游世界去了。"
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
				hint: "你赚取了海量的金钱、名誉与地位，但却孤独终老……",
				finish: true
			},
			end4: {
				cover: "./assets/qian02.webp",
				hint: "你的钱最终还是被男人们骗光了……",
				finish: true
			}
		},
		start: 'start',
		menLimit: 4,
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
			option.goto = chooseNext(key, v);
			option.points[key] = 1;
			if (v > 0) option.points.money = -1;
			else if (v < 0) option.points.man = -1;
		});
	}

	// test
	console.log(MenTypes);
}) ();