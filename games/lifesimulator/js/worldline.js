const WorldLine = {
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
					goto: "man1",
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
					goto: "man2",
					points: {'money': -1, man1: 1, zhonger: 1},
					result: "没多久你就觉得这个小哥哥有点无聊，配不上深邃优雅的你。\n悲痛欲绝的小哥哥伤心地跳了河，但因为过于怕死，最后成功在河里学会了游泳，游回了岸边。"
				},
				{
					hint: "垃圾，滚粗！",
					goto: "man2",
					points: {'man': -1, man1: 1, zhonger: -1},
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
					goto: "end3",
					points: {money: -1, man2: 1, dandiao: 1},
					result: "这位绅士的确很给人安全感，但实在是太单调乏味了，一点都不懂浪漫。\n你已经不是过去的小女生了，你需要生活中有更多惊喜与刺激，所以你认为两人并不合适。\n伤心欲绝的绅士离开你之后痛定思痛，跑去MI6当了一名特工。"
				},
				{
					hint: "哼，就是一个馋我身子，啊，不，是我馋身子的无聊鬼罢了，不要！",
					goto: "end4",
					points: {man: -1, man2: 1, dandiao: -1},
					result: "被你无情拒绝后，伤心欲绝的健壮绅士痛定思痛，跑去MI6当了一名特工。"
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
	finish: (points) => {
		console.log(points);
		return "你的人生就这么结束了……";
	}
};