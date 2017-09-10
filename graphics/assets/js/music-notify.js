let showing = false;

TweenMax.set('.container', {x: -($('.container').outerWidth(true, true) + 10 + 8)});

nodecg.listenFor('gpmdp', 'nospoone-gpmdp-fetcher', data => {
	if (!showing) {
		showing = true;
		$('.container__title').text(data.title);
		$('.container__artist').text(data.artist);
		$('.container__coverart').css('background-image', `url(${data.albumArt})`);

		const width = $('.container').outerWidth(true, true) + 10 + 8;
		TweenMax.set('.container', {x: -width});

		TweenMax.to('.container', 0.5, {x: 0, delay: 1, ease: Elastic.easeOut.config(0.3, 0.4), onStart: () => {
			$('.container').css('opacity', 1);
		}});

		TweenMax.to('.container', 0.5, {x: -width, delay: 5, ease: Elastic.easeIn.config(0.3, 0.4), onComplete: () => {
			$('.container').css('opacity', 0);
			showing = false;
		}});
	}
});
