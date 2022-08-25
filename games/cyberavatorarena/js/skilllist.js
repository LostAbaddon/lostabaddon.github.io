const SkillList = [];

// 复制
SkillList.push(new Skill('前进',
	[[0, 1]],
	[[0, 2]],
	1, 0
));
SkillList.push(new Skill('跳进',
	[[0, 1]],
	[[0, 3]],
	1, 0
));
SkillList.push(new Skill('斜跨',
	[[0, 1]],
	[[1, 2]],
	1, 0
));
SkillList.push(new Skill('横跨',
	[[0, 1]],
	[[1, 1]],
	1, 0
));
SkillList.push(new Skill('横扑',
	[[0, 1]],
	[[2, 1]],
	1, 0
));
SkillList.push(new Skill('飞跃',
	[[0, 2]],
	[[0, 1]],
	1, 0
));
SkillList.push(new Skill('斜进',
	[[1, 1]],
	[[2, 2]],
	1, 0
));
SkillList.push(new Skill('跨弯',
	[[1, 1]],
	[[0, 1]],
	1, 0
));
SkillList.push(new Skill('斜顶',
	[[1, 1]],
	[[1, 2]],
	1, 0
));
SkillList.push(new Skill('冲跃',
	[[0, 2]],
	[[1, 1]],
	1, 0
));
SkillList.push(new Skill('大冲',
	[[0, 2]],
	[[2, 1]],
	1, 0
));
SkillList.push(new Skill('直冲',
	[[0, 1], [0, 2]],
	[[2, 1], [1, 2], [0, 3]],
	2, 0
));
SkillList.push(new Skill('斜冲',
	[[1, 1], [2, 2]],
	[[3, 0], [3, 2], [3, 1]],
	2, 0
));

// 摧毁
SkillList.push(new Skill('直流电击',
	[[0, 1]],
	[[0, 2]],
	1, 1
));
SkillList.push(new Skill('交流电击',
	[[1, 1]],
	[[2, 2]],
	1, 1
));
SkillList.push(new Skill('感应电击',
	[[1, 1], [1, 2]],
	[[1, 3], [2, 2]],
	1, 1
));
SkillList.push(new Skill('电扫',
	[[0, 1], [0, 2]],
	[[0, 4], [1, 4], [-1, 4]],
	2, 1
));
SkillList.push(new Skill('迷你放电',
	[[0, 2], [2, 0], [2, 2]],
	[[1, 0], [1, 1], [1, 2]],
	1, 1
));
SkillList.push(new Skill('电爆',
	[[0, 1], [1, 0], [-1, 0], [0, -1]],
	[[0, 2], [2, 0], [-2, 0], [0, -2], [1, 1], [-1, 1], [1, -1], [-1, -1]],
	4, 1
));
SkillList.push(new Skill('游离放电',
	[[0, 1], [0, 2]],
	[[0, 4], [2, 1], [-2, 1]],
	1, 1
));
SkillList.push(new Skill('小型放电',
	[[0, 1], [0, 2], [2, 1]],
	[[1, 0], [1, 1], [1, 2]],
	2, 1
));
SkillList.push(new Skill('放电一段',
	[[0, 1], [3, 0], [3, 1]],
	[[1, 0], [1, 1], [2, 0], [2, 1]],
	2, 1
));
SkillList.push(new Skill('放电二段',
	[[0, 1], [0, 2], [3, 0], [3, 1], [3, 2]],
	[[1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
	3, 1
));
SkillList.push(new Skill('放电三段',
	[[0, 1], [0, 2], [4, 0], [4, 1], [4, 2]],
	[[1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2], [3, 0], [3, 1], [3, 2]],
	5, 1
));
SkillList.push(new Skill('电泳一段',
	[[1, -1], [2, 0]],
	[[1, 0], [1, 1], [1, 2]],
	2, 1
));
SkillList.push(new Skill('电泳二段',
	[[1, -1], [2, 0]],
	[[1, 0], [1, 1], [1, 2], [1, 3]],
	3, 1
));
SkillList.push(new Skill('电泳三段',
	[[1, -1], [2, 0]],
	[[1, 0], [1, 1], [1, 2], [1, 3]],
	4, 1
));

// 顶级守护
SkillList.push(new Skill('防火墙2',
	[[0, 1], [1, 0], [1, 1]],
	[],
	0, 2, 3
));
SkillList.push(new Skill('堡垒机2',
	[[0, 1], [0, 2], [1, 0], [1, 1], [1, 2]],
	[],
	0, 2, 4
));
SkillList.push(new Skill('蜜罐2',
	[[1, 1], [1, -1], [-1, 1], [-1, -1]],
	[],
	0, 2, 4
));

// 白客守护
SkillList.push(new Skill('防火墙',
	[[0, 1], [1, 2], [1, -1]],
	[],
	0, 3, 2
));
SkillList.push(new Skill('堡垒机',
	[[1, 1], [2, 1], [0, -1]],
	[],
	0, 3, 2
));
SkillList.push(new Skill('蜜罐',
	[[0, 2], [-1, 1], [2, 0], [2, 2], [3, 1]],
	[],
	0, 3, 4
));

// 杀毒扫描
SkillList.push(new Skill('端口扫描',
	[[0, 1], [1, 0], [-1, 0]],
	[],
	0, 4, 2
));
SkillList.push(new Skill('接口扫描',
	[[0, 1], [2, 0], [2, -1]],
	[],
	0, 4, 2
));
SkillList.push(new Skill('定向杀毒',
	[[2, 1], [-1, 1], [3, 0]],
	[],
	0, 4, 3
));

// 格式化
SkillList.push(new Skill('清理磁盘',
	[[0, 2], [2, 1], [3, 1]],
	[],
	1, 5
));
SkillList.push(new Skill('清理内存',
	[[0, 2], [2, 1], [4, 3], [4, -1]],
	[],
	2, 5, 3
));
SkillList.push(new Skill('完全格式化',
	[[0, -1], [0, 2], [0, 3], [2, -1], [2, 0], [2, 2], [2, 3]],
	[],
	3, 5, 5
));

// 病毒
SkillList.push(new Skill('木马入侵',
	[[2, 0], [4, 3]],
	[[4, 0], [4, 1], [4, 2]],
	1, 6, 3
));
SkillList.push(new Skill('蠕虫病毒',
	[[1, 1], [3, 1], [3, 2]],
	[[2, 2], [1, 2], [2, 1]],
	1, 6, 3
));
SkillList.push(new Skill('文件缝隙',
	[[1, 1], [3, 3], [4, 4]],
	[[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [2, 0], [2, 1], [2, 3], [2, 4]],
	2, 6, 4
));
SkillList.push(new Skill('黑客联盟1',
	[[4, 4]],
	[[1, 1], [2, 2], [3, 3]],
	2, 6, 4
));
SkillList.push(new Skill('黑客联盟2',
	[[4, 4]],
	[[1, 1], [2, 2], [3, 3], [3, 1], [1, 3]],
	3, 6, 5
));

// 物理隔绝
SkillList.push(new Skill('断网',
	[[0, 1], [0, 3], [0, 4]],
	[[-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]],
	1, 7, 3
));
SkillList.push(new Skill('拔电源',
	[[0, 4], [4, 0], [4, 4]],
	[[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]],
	3, 7, 4
));
SkillList.push(new Skill('打人',
	[[1, 1], [0, 4], [1, 3]],
	[[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [2, 3], [3, 3], [4, 3], [0, 1], [2, 1], [3, 1], [4, 1]],
	10, 7, 5
));

// 黑客攻击
SkillList.push(new Skill('文件植入',
	[[0, 4], [4, 2]],
	[[0, 2], [1, 2], [2, 2], [3, 2]],
	1, 8, 3
));
SkillList.push(new Skill('破解密码',
	[[0, 1], [1, 3], [1, 4]],
	[[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
	2, 8, 4
));
SkillList.push(new Skill('拖库攻击',
	[[1, 1], [4, 3], [3, 4]],
	[[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [2, 0], [2, 1], [2, 3], [2, 4], [3, 3], [4, 4], [0, 4], [1, 3], [3, 1], [4, 0]],
	5, 8, 5
));

// 系统回溯
SkillList.push(new Skill('激活',
	[[0, 1], [0, 2], [0, 3], [0, 4]],
	[],
	0, 9, 4
));
SkillList.push(new Skill('快速激活',
	[[0, 1], [0, 3], [0, 4]],
	[],
	0, 9, 5
));

const SkillMap = {};
SkillList.forEach(skill => {SkillMap[skill.name] = skill});