nodecg.listenFor('start-transition-out', 'nospoone-layout', () => {
	$('.js-separator-first, .js-separator-second, .js-separator-third, .js-separator-fourth').css('transform-origin', 'top left');
	TweenMax.to('.js-separator-first', 0.75, {scaleX: 1, ease: Power2.easeOut});
	TweenMax.to('.js-separator-second', 0.75, {scaleX: 1, delay: 0.1, ease: Power2.easeOut});
	TweenMax.to('.js-separator-third', 0.75, {scaleX: 1, delay: 0.2, ease: Power2.easeOut});
	TweenMax.to('.js-separator-fourth', 0.75, {scaleX: 1, delay: 0.3, ease: Power2.easeOut, onComplete: () => {
		nodecg.sendMessage('transition-hide-complete');
	}});	
});

nodecg.listenFor('start-transition-in', 'nospoone-layout', () => {
	$('.js-separator-first, .js-separator-second, .js-separator-third, .js-separator-fourth').css('transform-origin', 'top right');
	TweenMax.to('.js-separator-first', 0.75, {scaleX: 0, ease: Power2.easeOut});
	TweenMax.to('.js-separator-second', 0.75, {scaleX: 0, delay: 0.1, ease: Power2.easeOut});
	TweenMax.to('.js-separator-third', 0.75, {scaleX: 0, delay: 0.2, ease: Power2.easeOut});
	TweenMax.to('.js-separator-fourth', 0.75, {scaleX: 0, delay: 0.3, ease: Power2.easeOut, onComplete: () => {
		nodecg.sendMessage('transition-show-complete');
	}});	
});
