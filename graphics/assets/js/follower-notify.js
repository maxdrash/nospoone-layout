var queue = [];
var processing = false;

TweenMax.set('.container', {x: -($('.container').outerWidth(true, true) + 10 + 8)});

nodecg.listenFor('follow', user => {
	queue.push(user);
	if (!processing) {
		processing = true;
		show();
	}
});

for (var i = 100; i >= 0; i--) {
	queue.push('Debugging');
	if (!processing) {
		processing = true;
		show();
	}
}

function show() {
	$('.container span.content').text(queue.shift());
	const width = $('.container').outerWidth(true, true) + 10 + 8;
	TweenMax.set('.container', {x: -width});
	TweenMax.to('.container', 0.5, {x: 0, delay: 1, ease: Elastic.easeOut.config(0.3, 0.4), onStart: () => {
		nodecg.playSound('follow');
	}});
	TweenMax.to('.container', 0.5, {x: -width, delay: 5, ease: Elastic.easeIn.config(0.3, 0.4), onStart: () => {
		setTimeout(() => {
			nodecg.playSound('leave');
		}, 150);
	}, onComplete: () => {
		if (queue.length > 0) {
			setTimeout(show, Math.floor(Math.random() * (5000 - 500 + 1) + 500));
		} else {
			processing = false;
		}
	}});
}
