Template.load_more.events({
	'click div.load-more': function(event){
		var moreVal = $(event.currentTarget).attr('value');
		Session.set('incrementMore', moreVal);
	}
});


		// var loader = '<div class="ui active loader"></div>';
		// var load = '<center><a href="#" increment="">Load More</a></center>';
		// Tracker.autorun(function () {

		// 	if (Session.get('readyLoad')) {
		// 		setTimeout(function(){
		// 			$(event.currentTarget).empty();
		// 			$(event.currentTarget).append(load);					
		// 		},50000000);


		// 	}else{
		// 		$(event.currentTarget).empty();
		// 		$(event.currentTarget).append(loader);				
		// 	}
		// });