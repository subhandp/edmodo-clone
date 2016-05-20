coll_notes = new Mongo.Collection('c_notes');

Meteor.methods({
	noteInsert: function(postAttributes, sendTo){
		check(this.userId, String);
		check(postAttributes, {
			isiNote: String
		});

		check(sendTo, {
			to: [Object]
		});

		var user = Meteor.user();

		var noteId = coll_notes.insert(postAttributes);
		console.log(postAttributes);

		var post = _.extend(sendTo, {
				post: {
					_id: noteId,
					type: 'note'
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