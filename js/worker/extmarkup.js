// CC 版权信息，LikeCoin 设置
MarkUp.addExtension({
	name: 'CC&Like',
	parse: (line, doc, caches) => {
		var match = line.match(/^ *copyright: *(.*?) *$/i);
		if (!!match) {
			doc.metas.others = doc.metas.others || {};
			doc.metas.others.CopyRight = match[1];
			return ["", true];
		}
		match = line.match(/^ *likecoin: *(.*?) *$/i);
		if (!!match) {
			doc.metas.others = doc.metas.others || {};
			doc.metas.others.LikeCoin = match[1];
			return ["", true];
		}
		return [line, false];
	},
}, 0, -1);