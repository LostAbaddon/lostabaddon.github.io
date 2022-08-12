const WorldLine = {
	events: {
		start: {
			cover: "./assets/cover.png",
			hint: '你二舅姥爷的律师告诉你，你获得了一笔丰厚的遗产。\n已经整理出来的现金资产高达1000万，此外还有几家公司的资产还在清算，北京东二环的一栋四合院也还在估价。\n律师告诉你，你可以选择接受，或者放弃这笔遗产。',
			choise: [
				{
					hint: "作为一个正直的人，我选择放弃这笔遗产。",
					goto: "end1",
					points: ['honest', 2],
					result: "律师赞扬了你是一位正直的人，然后拂袖而去。"
				},
				{
					hint: "作为一个孝顺父母的人，你打算去问问你那丢下你独自生活云游四海去的爸妈。",
					goto: () => {
						var result = {};
						if (Math.random() > 0.5) {
							result.goto = "end1";
							result.result = "你一直没能联系到你的父母，一个月后律师通知你已经超过了等待时限，自动放弃了这笔遗产。";
							result.points = ['honest', 1];
						}
						else {
							result.goto = "end2";
							result.result = "你的父母让你赶紧接受这笔遗产，并飞快地赶回家和你团聚。";
							result.points = ['silly', 1];
						}
						return result;
					},
				},
				{
					hint: "你果断接受了这笔遗产，开启了崭新的人生！",
					goto: "startoff",
					points: ['money', 10],
				}
			]
		},
		startoff: {
			cover: "./assets/cover.png",
			hint: "你拥有巨额意外遗产的消息不胫而走，很多年轻健美，或者自认为年轻健美的男子慕名而来，希望能与你开展一段惊心动魄旷日持久的爱情。",
			choise: [
				{
					hint: "看看都是些什么样的男人吧，反正有的是时间。",
					goto: "man1",
					points: ['man', 10],
				},
				{
					hint: "男人没有一个是好东西，不值得在他们身上浪费时间！",
					goto: "end3",
					points: ['man', 0],
				}
			]
		},
		man1: {
			cover: "./assets/1.jpg",
			hint: "这是一位扬言你不娶他他就去跳河的优秀男子。\n他聪敏、机制、乖巧，让介绍人怦然心动！",
			choise: [
				{
					hint: "小哥哥看着好可爱哦，聊聊吧~",
					goto: "man2",
					points: ['money', -1],
					result: "没多久你就觉得这个小哥哥有点无聊，配不上深邃优雅的你。\n悲痛欲绝的小哥哥伤心地跳了河，但因为过于怕死，最后成功在河里学会了游泳，游回了岸边。"
				},
				{
					hint: "垃圾，滚粗！",
					goto: "man2",
					points: ['man', -1],
					result: "伤心欲绝又不会游泳的他真的跳河了，但因为过于怕死，他最后在河里学会了游泳，游回了岸边。"
				}
			]
		},
		man2: {
			cover: "./assets/2.jpg",
			hint: "",
		},
		end1: {
			cover: "",
			hint: "在平平淡淡中，你波澜不惊地度过了余生。",
			finish: true
		},
		end2: {
			cover: "",
			hint: "你父母带着你孝顺他们的遗产，继续踏上了云游世界的欢乐旅途。\n而你在平平淡淡中波澜不惊地度过了余生。",
			finish: true
		},
		end3: {
			cover: "",
			hint: "你赚取了海量的金钱、名誉与地位，但却孤独终老……",
			finish: true
		},
		end4: {
			cover: "./assets/1.jpg",
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