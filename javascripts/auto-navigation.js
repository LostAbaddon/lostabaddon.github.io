(function (root) {
	root.AutoNavigation = function (selector) {
		var dom = $(selector), mark = 'lostabaddon.github.io/articles/', index = root.location.pathname.indexOf(mark);
		console.log(root.location.pathname, index);
		if (index < 0) {
			dom.remove();
			return;
		}
		var path = root.location.pathname.substring(index + mark.length, root.location.pathname.length).split('/');
		path.pop();
		path.unshift('home');
		var result = "<span class='title'>当前位置：</span>", level = '';
		path.map(function (nouse) {
			level += '../';
		});
		if (root.location.pathname.indexOf('index.html') < 0) {
			level = level.replace('../', '');
		}
		path = path.map(function (path) {
			var name = root.SiteMap.map[path];
			if (path === 'home') {
				name = "<a href='../" + level + "index.html'>" + name + "</a>";
			}
			else {
				name = "<a href='" + level + "index.html'>" + name + "</a>";
			}
			level = level.replace('../', '');
			return name;
		});
		result += path.join(' / ');
		dom.html(result);
	};
}) (window);