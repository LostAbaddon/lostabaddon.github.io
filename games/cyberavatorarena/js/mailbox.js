window.CyberAvatorArena = window.CyberAvatorArena || {};
CyberAvatorArena.MailBox = {};

(() => {
	CyberAvatorArena.MailBox.enter = async () => {
		CyberAvatorArena.MailBox.onResize();
		await wait(0);
		ScnMailBox.classList.remove('hide');
	};
	CyberAvatorArena.MailBox.leave = async () => {
		CyberAvatorArena.Welcome.addNewCmdLine('mailbox closed', true);
		ScnMailBox.classList.add('hide');
		await wait(500);

		await CyberAvatorArena.Welcome.show();
	};
	CyberAvatorArena.MailBox.onResize = () => {
		console.log(CyberAvatorArena.Screen);
	};
}) ();