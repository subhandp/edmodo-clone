Template.home_left_dosen.onRendered(function(){
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

// Template.home_konten_dosen.helpers({
// 	ready: function () {
// 		Session.set('readyLoad', true);
// 	},
// 	notReady: function(){
// 		Session.set('readyLoad', null);
// 	}
// });