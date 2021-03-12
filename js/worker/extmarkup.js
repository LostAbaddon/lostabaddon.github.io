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

// 将原始ASCII字符都分离出来
MarkUp.addExtension({
	name: 'ASCII-Chars',
	parse: (line, doc, caches) => {
		var changed = false;
		if (!doc.mainParser) return [line, changed];

		var last = 0;
		var contents = [];
		line.replace(/(<.*?>|%.*?%|\[.*?\]|\{.*?\})/gi, (match, nouse, pos) => {
			if (pos > last) {
				contents.push([false, line.substring(last, pos)]);
			}
			contents.push([true, match]);
			last = pos + match.length;
		});
		if (last < line.length) {
			contents.push([false, line.substring(last, line.length)]);
		}

		line = [];
		contents.forEach(part => {
			if (part[0]) return;
			var ctx = part[1].replace(/[\w \-\+\.,:;\?!\*`@#$%^&\(\)\[\]\{\}=_'"\\\/<>\|]+/g, (match) => {
				if (!match.match(/[a-zA-Z]/)) return match;
				return '</span><span class="english">' + match.trim() + '</span><span class="normal">'
			});
			ctx = '<span class="normal">' + ctx + '</span>';
			part[1] = ctx.replace(/<span class="normal"> *<\/span>/g, '');
		});
		contents.forEach(part => {
			line.push(part[1]);
		});
		line = line.join('');
		return [line, changed];
	},
}, 0, 999);