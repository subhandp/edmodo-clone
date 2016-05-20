Template.group_konten_mhs.onRendered(function(){
	$('.ui.dropdown').dropdown({
		position: 'bottom-center'
	});

	$('.tooltip').popup({
		position: 'bottom left'
	});

	$('.menu .item').tab();

	$('.progress').progress();

	this.$('.datepicker').datetimepicker({
		format: 'DD/MM/YYYY',
		minDate: new Date()
	});


});

