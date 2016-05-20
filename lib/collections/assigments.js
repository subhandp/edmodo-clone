coll_assigments = new Mongo.Collection('c_assigments');

coll_assigments.helpers({
	totalSubmit: function () {
		return this.submit.length;
	}
});

Meteor.methods({
	'assigmentInsert': function(postAttributes, sendTo){
		check(this.userId, String);

		check(sendTo, {
			to: [Object]
		});

		check(postAttributes, {
			title: String,
			deskripsi: String,
			lock: Number,
			dueDate: Date
		});

		var user = Meteor.user();

		var assigmentId = coll_assigments.insert(postAttributes);
		console.log(postAttributes);

		var post = _.extend(sendTo, {
				post: {
					_id: assigmentId,
					type: 'assigment'
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