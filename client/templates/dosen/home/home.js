Template.home_konten_dosen.onCreated(function () {
	Session.set('latest', new Date());
});


Template.home_konten_dosen.helpers({
	newPost: function(){
			return coll_posts.find({ createAt: {$gt: Session.get('latest')} }, { sort: {createAt: -1, _id: -1} });
	},

	postExist: function(old, latest){
		if (old.fetch().length || latest.fetch().length) {
			return true;
		};
	}
});


Template.home_konten_dosen.events({
	'click .ui.menu div.item': function (event) {
		//ambil nilai dropdown dengan semantic api
		var filter = $('.ui.dropdown.umum-dropdown' ).dropdown('get value')[0];
		$('.ui.menu').find('.item').tab('change tab', filter);
		Session.set('filterPosts', filter);
		Session.set('incrementMore', null);
	}
});

