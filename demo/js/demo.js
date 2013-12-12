$(function() {

	var requests = 0;

	var rsp = new Respeto({
		imagePath: 'img/'
	});

	$(window).on('resize', function() {

		var width = $(this).width();

		if(width > 0 && width < 480) {

			$('#state').text('small');
			
			rsp.load('small');

		} else if(width > 480) {

			$('#state').text('large');

			rsp.load('large');

		}
	});

	$(window).trigger('resize');

});