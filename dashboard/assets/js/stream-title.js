$('.js-change').on('click', e => {
	if (document.querySelector('.js-input').value !== undefined) {
		nodecg.sendMessage('change-title', document.querySelector('.js-input').value);
	}
});
