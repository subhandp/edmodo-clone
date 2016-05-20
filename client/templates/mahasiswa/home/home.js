Template.home_konten_mhs.onRendered(function(){
	$('.ui.dropdown').dropdown({
		position: 'bottom-center'
	});

	$('.tooltip').popup({
		inline: true,
		position: 'bottom center'
	});

	$('.notif').popup({
	  	on: 'click',
	    inline   : true,
	    position : 'bottom center'
	});

	$('.menu .item').tab();

	$('.progress').progress();

	this.$('.datepicker').datetimepicker({
		format: 'DD/MM/YYYY',
		minDate: new Date()
	});

	$('.buat-group').on('click', function() {
		$('.modal-group').modal('show');
	});

	$('.share-link').on('click', function() {
		$('.post-link').modal('show');
	});
	
	$('.gabung-group').on('click', function() {
		$('.join-group').modal('show');
	});

});



