let active = false;

nodecg.listenFor('gpmdp', 'nospoone-gpmdp-fetcher', data => {
	if (!active) {
		active = true;
		TweenMax.to('.container', 0.25, {alpha: 0, ease: Power0.easeNone, onComplete: () => {
			$('.js-title').text(data.title);
			$('.js-artist').text(data.artist);
			$('.js-album').text(data.album);
			$('.js-coverart').prop('src', data.albumArt);
			TweenMax.to('.container', 0.25, {alpha: 1, delay: 0.5, ease: Power0.easeNone, onComplete: () => {
				active = false;
			}});
		}});
	}
});
