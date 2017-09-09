var filters = document.querySelector(".filters"); // the SVG that contains the filters
var defs = filters.querySelector("defs"); // the  element inside the SVG
var blur = defs.querySelector("#blur"); // the blur filter
var blurFilter = blur.firstElementChild; // the feGaussianBlur primitive

// go through all the objects that need a blur filter
$(".js-blur").each(function(i) {
	// clone the filter
	var blurClone = blur.cloneNode(true);

	// create and set a new ID so we can use the filter through CSS
	var blurId = "blur" + i;
	blurClone.setAttribute("id",blurId);

	defs.appendChild(blurClone);

	// set the CSS
	var filter="url(#"+blurId+")";
	$(this).css({webkitFilter:filter, filter:filter}).data("blur",blurClone);
});

$.each($('.js-blur'), (i, e) => {
  $(e).data('offset', $(e).offset());
});

// a multiplier, to be able to control the intensity of the effect
var multiplier = 0.3;

// a helper to simplify setting the blur.
function setBlur(filter, x, y) {
	filter.firstElementChild.setAttribute("stdDeviation", `${x}, ${y}`);
}

(function updateMotionBlur() {
  $.each($('.js-blur'), (i, e) => {
    // get the current position of the element
	  var currentPos = $(e).offset();

    // console.log($(e).data('blur'));

	  // calculate the changes from the last frame and apply the multiplier
	  var xDiff = Math.abs(currentPos.left - $(e).data('offset').left) * multiplier;
    var yDiff = Math.abs(currentPos.top - $(e).data('offset').top) * multiplier;

	  // set the blur
	  setBlur($(e).data('blur'), xDiff, yDiff);

	  // store current position for the next frame
	  $(e).data('offset', currentPos);
  });

	// call to update in the next frame
	requestAnimationFrame(updateMotionBlur);
})();
