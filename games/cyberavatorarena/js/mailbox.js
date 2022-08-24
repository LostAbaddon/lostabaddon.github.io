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
			let mail = {
				id: "defaultmail",
				timestamp: 1660538096000,
				from: 'CyberAvatorArena',
				title: '欢迎来到赛博命斗场',
				content: '欢迎欢迎，热烈欢迎！',
				readed: false
			};
			await CyberAvatorArena.DB.set('mailbox', mail.id, mail);
			CyberAvatorArena.MailBox.unread = 1;
		}
		else {
			CyberAvatorArena.MailBox.unread = list.filter(m => !m.readed).length;
		}
	};
	CyberAvatorArena.MailBox.enter = async () => {
		var list = await getMailList();
		CyberAvatorArena.MailBox.onResize();
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
	CyberAvatorArena.MailBox.onResize = () => {};
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
		MailViewer.querySelector('span.timestamp').innerText = mail.timestamp;
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