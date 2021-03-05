self.global = self;

importScripts('../../Asimov/markup.js');
importScripts('../../Asimov/extensions.js');
importScripts('./extmarkup.js');

const isSharedWorker = !self.Worker;

if (isSharedWorker) {
	self.onconnect = ({ports}) => {
		var port = ports[0];
		console.log('Shared-Worker Connected!');
		port.onmessage = ({data}) => {
			if (data === 'suicide') {
				port.close();
				return;
			}

			var markup = MarkUp.fullParse(data.content, data.config);
			console.log('Asimov Done: ' + data.content.length + ' / ' + markup.content.length);
			port.postMessage({id: data.id, markup});
		};
	};
	console.log('Shared-Worker Asimov is READY!');
}
else {
	self.onmessage = ({data}) => {
		if (data === 'suicide') {
			port.close();
			return;
		}

		var markup = MarkUp.fullParse(data.content, data.config);
		console.log('Asimov Done: ' + data.content.length + ' / ' + markup.content.length);
		self.postMessage({id: data.id, markup});
	};
	console.log('Dedicated-Worker Asimov is READY!');
}