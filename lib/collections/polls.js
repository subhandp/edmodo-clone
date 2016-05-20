coll_polls = new Mongo.Collection('c_polls');

coll_polls.helpers({
	setPersentase: function () {
		var jmlhVote = this.totalVote();

		_.each(this.pilihan, function(pilihan){
			if (jmlhVote) 
				Session.set(pilihan._id, Math.round(pilihan.vote / jmlhVote * 100));
			else
				Session.set(pilihan._id, 0);
			
		});
	},

	totalVote: function(){
		return this.semuaVote.length;
	}

});


Meteor.methods({
	'pollInsert': function(postAttributes, sendTo){
		check(this.userId, String);
		check(postAttributes, {
			pertanyaan: String,
			pilihan: [Object]
		});
		
		check(sendTo, {
			to: [Object]
		});

		var user = Meteor.user();

		var pollId = coll_polls.insert(postAttributes);

		var post = _.extend(sendTo, {
				post: {
					_id: pollId,
					type: 'poll'
				},
				owner: {
					_id: user._id,
					nama: user.profile.nama,
					gambar: user.profile.foto,
					users: user.profile.status
				}
		});

		var id = coll_posts.insert(post);

		return id;
	}
});
