
Template.post.helpers({
	jenisPost: function (value, param) {
		if (value == param) {
			return true;
		};
	},

	postBaru: function(date) {
		var postDate = date.getTime();
		var latest = Session.get('latest').getTime();
		if (postDate > latest) {
			return true;
		};
	}
});


// -----------------------------------------------------------------------------------------------------------------------------------------------------

Template.poll.helpers({
	persen: function(id){
		return Session.get(id);
	}
});


Template.poll.onRendered(function(){
	this.autorun(function () {
		$('.progress').each(function(index) {
			var id = $(this).attr('id');
			$('#'+id).progress({
				percent: Session.get(id)
			});
		});
	});

	$('.tooltip').popup({
		inline: true,
		position: 'bottom center'
	});
	
	$('.umum-dropdown').dropdown({
		position: 'bottom-center'
	});
});

// -----------------------------------------------------------------------------------------------------------------------------------------------------

Template.komentar.events({
	'submit form': function (event, template) {
		event.preventDefault();
		var form = $(event.currentTarget);
		var postId = this._id;
		var komentar = {
			_id : Meteor.userId(),
			body: form.find('input[name="isi-komentar"]').val()
		}

		Meteor.call('komentarInsert', komentar, postId, function (error, result) {
			console.log(result);
			if (error) {
				return throwError(error.reason);
			}else{
				form.find('input[name="isi-komentar"]').val('');
			}
		});
	}
});


Template.komentar.helpers({
	profile: function(id, field){
		var user = Meteor.users.findOne({_id: id});
		if (field == 'nama') {
			return user.profile.nama;
		}else if(field == 'foto'){
			return user.profile.foto;
		}

	}

});

// -----------------------------------------------------------------------------------------------------------------------------------------------------