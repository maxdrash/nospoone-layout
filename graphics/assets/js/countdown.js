function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

var interval;

function initializeClock(id, endtime) {
	var clock = document.querySelector(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.js-minutes');
	var secondsSpan = clock.querySelector('.js-seconds');
	
	function updateClock() {
		var t = getTimeRemaining(endtime);
		
		//daysSpan.innerHTML = t.days;
		//hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		
		if (t.total <= 0) {
			clearInterval(interval);
		}
	}
	
	updateClock();

	if (interval !== undefined) {
		clearInterval(interval);
	}

	interval = setInterval(updateClock, 1000);
}

let deadline = new Date(Date.parse(new Date()) + 15 * 60 * 1000);
initializeClock('.js-countdown', deadline);

nodecg.listenFor('start-countdown', data => {
	let deadline = new Date(Date.parse(new Date()) + data.minutes * 60 * 1000);
	initializeClock('.js-countdown', deadline);
});
