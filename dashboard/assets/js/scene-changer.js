const obs = new OBSWebSocket();
const scenes = [];
let target = '';

obs.connect({ address: 'localhost:4444', password: '20fDKpgWQoEn' }).then(() => {
	return obs.getSceneList({});
}).then(data => {
	data.scenes.forEach(element => {
		$('.js-scenes').append(`<paper-button class="scenes__button js-change-scene">${element.name}</paper-button>`);
	}, this);
});

$('.js-scenes').on('click', '.js-change-scene', e => {
	e.preventDefault();
	e.stopPropagation();

	nodecg.sendMessage('start-transition-out');
	target = $(e.target).text();
});

nodecg.listenFor('transition-hide-complete', 'nospoone-layout', () => {
	obs.setCurrentScene({'scene-name': target});
})

obs.on('SwitchScenes', data => {
	nodecg.sendMessage('start-transition-in');
})
