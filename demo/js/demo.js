$(function() {
	/**
		Here's a fresh Respeto object. Since I've decided not
		to include image paths in my HTML, I'm setting a global
		prefix here. I've also turned on retina suffixes.
	*/
	var rsp = new Respeto({
		imagePath: 'img/',
		retina: true
	});

	/**
		This is a simple responsive state manager that checks
		on every resize event.

		There is a single breakpoint at 480. If you're below 480
		then small images are loaded. If you're above it, the large
		images are loaded.

		If you're on a retina-friendly screen, it will load the large 
		image with a retina suffix (_x2), but will not for the small
		image. Note the { retina: false } option in load() below.

		I suggest using _.debounce (http://underscorejs.org/) 
		for a more optimal implementation
	*/
	$(window).on('resize', function() {

		var width = $(this).width();

		if(width > 0 && width < 480) {

			$('#state').text('small', { retina: false });
			
			rsp.load('small');

		} else if(width > 480) {

			$('#state').text('large');

			rsp.load('large');

		}
	});

	/**
		I'm firing resize event when the page loads so Respeto will
		load images for elements that don't have 'src' attributes set
	*/
	$(window).trigger('resize');

});