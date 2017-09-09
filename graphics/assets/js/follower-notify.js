const width = $('.container').outerWidth(true, true) + 10 + 2;
TweenMax.set('.container', {x: -width});
TweenMax.to('.container', 0.5, {x: 0, delay: 1, ease: Elastic.easeOut.config(0.3, 0.4)});
TweenMax.to('.container', 0.5, {x: -width, delay: 5, ease: Elastic.easeIn.config(0.3, 0.4)});
