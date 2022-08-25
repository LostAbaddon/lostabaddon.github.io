/**
 * id
 * timestamp
 * from
 * title
 * content
 * readed
 */

window.CyberAvatorArena = window.CyberAvatorArena || {};
CyberAvatorArena.MailBox = {};

(() => {
	const MailContainer = ScnMailBox.querySelector('.container');

	const getMailList = async () => {
		var list = await CyberAvatorArena.DB.all('mailbox');
		list = Object.keys(list).map(id => list[id]);
		list.sort((mail1, mail2) => mail2.timestamp - mail1.timestamp);
		return list;
	};
	const listMails = list => {
		MailContainer.innerHTML = '';
		list.forEach(mail => {
			var ui = newEle('div', 'mail');
			if (!mail.readed) ui.classList.add('unread');
			ui.setAttribute('mail', mail.id);
			ui.innerText = mail.title;
			MailContainer.appendChild(ui);
		});
	};

	CyberAvatorArena.MailBox.unread = 0;

	CyberAvatorArena.MailBox.init = async () => {
		CyberAvatorArena.MailBox.unread = 0;
		var list = await getMailList();
		if (list.length === 0) {
			let mails = [{
				id: "defaultmail",
				timestamp: 1660538096000,
				from: 'CyberAvatorArena',
				title: '欢迎来到赛博命斗场',
				content: '欢迎来到赛博命斗场。\n\n命斗场基本玩法：\n1，每个角色都有不同的技能与拓展能力，结合手牌进行布局以触发这些能力，目标是抢夺生存空间与消灭对方。\n2，每一轮玩家都会根据一定的顺序轮流落子、触发技能、安置升级技能与接口技能、弃牌，此后下一轮以场上棋子数由少到多开始。\n3，场上棋子数等于每回合玩家可用的能量数，不同技能会消耗不同的能量哦，当能量不足以发动技能、或者玩家自动放弃技能触发时，进入下一阶段。\n\n祝你在这里玩得愉快！',
				readed: false
			}];
			let heros = await CyberAvatorArena.Duel.getMyHeros();
			if (Object.keys(heros).length === 0) {
				await CyberAvatorArena.Duel.initCards();
				mails.push({
					id: 'initheromail',
					timestamp: 1660538096000,
					from: 'CyberAvatorArena',
					title: '获得初始卡组',
					content: '恭喜！你已经获得初始卡组！',
					readed: false
				});
			}
			await Promise.all(mails.map(async mail => await CyberAvatorArena.DB.set('mailbox', mail.id, mail)));
			CyberAvatorArena.MailBox.unread = mails.length;
		}
		else {
			CyberAvatorArena.MailBox.unread = list.filter(m => !m.readed).length;
		}
	};
	CyberAvatorArena.MailBox.enter = async () => {
		var list = await getMailList();
		listMails(list);
		await wait(0);
		ScnMailBox.classList.remove('hide');
	};
	CyberAvatorArena.MailBox.leave = async () => {
		CyberAvatorArena.Welcome.addNewCmdLine('mailbox closed', true);
		ScnMailBox.classList.add('hide');
		await wait(500);

		await CyberAvatorArena.Welcome.show();
	};
	CyberAvatorArena.MailBox.openMail = id => new Promise(async res => {
		CyberAvatorArena.Tool.showLoading();
		var mail = await CyberAvatorArena.DB.get('mailbox', id);
		CyberAvatorArena.Tool.hideLoading();

		CyberAvatorArena.Welcome.addNewCmdLine('mail ' + id + ' loaded', true);
		if (!mail) {
			CyberAvatorArena.Welcome.addNewCmdLine('mail ' + id + ' does not exist.', true);
			await CyberAvatorArena.Tool.showAlarm('信息队列警报', '指定ID的信息在队列中不存在。\n请联系管理进程进行内存清理，谢谢。');
			res();
			return;
		}
		if (!mail.readed) {
			CyberAvatorArena.Welcome.addNewCmdLine('mail ' + id + ' loaded...', true);
			CyberAvatorArena.MailBox.unread --;
			mail.readed = true;
			await await CyberAvatorArena.DB.set('mailbox', id, mail);
		}

		var last = CyberAvatorArena.MailBox.openMail._res;
		if (!!last) {
			last();
		}
		CyberAvatorArena.MailBox.openMail._res = res;

		MailViewer.querySelector('div.title').innerText = mail.title;
		MailViewer.querySelector('span.sender').innerText = mail.from;
		MailViewer.querySelector('span.timestamp').innerText = getFullTimeString(mail.timestamp);
		MailViewer.querySelector('div.content').innerText = mail.content;

		MailViewer.classList.add('show');
		await wait(300);
	});
	CyberAvatorArena.MailBox.close = async () => {
		MailViewer.classList.remove('show');
		await wait(300);

		var res = CyberAvatorArena.MailBox.openMail._res;
		if (!!res) {
			delete CyberAvatorArena.MailBox.openMail._res;
			res();
		}
	};

	MailContainer.addEventListener('click', async ({target}) => {
		if (!target.classList.contains('mail')) return;
		var id = target.getAttribute('mail');
		if (!id) return;

		CyberAvatorArena.Welcome.addNewCmdLine('echo ' + id);
		await CyberAvatorArena.MailBox.openMail(id);
		target.classList.remove('unread');
	});
}) ();