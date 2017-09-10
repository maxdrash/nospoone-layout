var queue = [];
var processing = false;

TweenMax.set('.container', {scaleY: 0});

nodecg.listenFor('tip', 'lfg-streamtip', data => {
	queue.push({
		content: `${data.username} donated ${data.currencySymbol}${data.amount}!`,
		message: data.note
	});

	if (!processing) {
		processing = true;
		show();
	}
});

function show() {
	var contents = queue.shift();
	$('.container span').text(contents.content);

	TweenMax.set('.container span', {y: -144});
	TweenMax.to('.container', 0.5, {scaleY: 1, delay: 1, ease: Power4.easeOut, onStart: () => {
		nodecg.playSound('donation');
	}, onComplete: () => {
		$('.container').addClass('show');
		TweenMax.to('.container span', 0.5, {y: 0, delay: 0.5, ease: Elastic.easeOut.config(0.3, 0.4)});
		TweenMax.to('.container span', 0.5, {y: 144, delay: 5.5, ease: Elastic.easeIn.config(0.3, 0.4), onStart: () => {
			setTimeout(() => {
				nodecg.playSound('leave');
			}, 150);
		}, onComplete: () => {
			$('.container').removeClass('show');
			TweenMax.to('.container', 0.5, {scaleY: 0, delay: 0.25, ease: Power4.easeIn, onComplete: () => {
				if (queue.length > 0) {
					setTimeout(show, Math.floor(Math.random() * (5000 - 500 + 1) + 500));
				} else {
					processing = false;
				}
			}})
		}});
	}});
}
