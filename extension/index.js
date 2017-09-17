'use strict';

module.exports = function (nodecg) {
	const twitchApi = nodecg.extensions['lfg-twitchapi'];
	nodecg.listenFor('change-title', 'nospoone-layout', data => {
		const title = `🎮 ${data} | #gamedev #unity3d 🎮`
		twitchApi.put('/channels/{{username}}', {channel: {status: title}}).then(data => {
			nodecg.log.info(`Changed stream title to: ${title}`)
		}).catch(err => {
			console.log(`Error while trying to change stream title: ${err}`);
		});
	})
};
