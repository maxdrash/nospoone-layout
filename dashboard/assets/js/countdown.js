$('.js-reset').on('click', e => {
	if (document.querySelector('.js-input').value !== undefined) {
		nodecg.sendMessage('start-countdown', {
			minutes: parseInt(document.querySelector('.js-input').value, 10)
		});
	}
});
