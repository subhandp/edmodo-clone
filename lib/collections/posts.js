coll_posts = new Mongo.Collection('c_posts');

coll_posts.helpers({
	poll: function () {
		return coll_polls.findOne({_id: this.post._id});
	},

	assigment: function(){
		return coll_assigments.findOne({_id: this.post._id});
	},

	note: function(){
		return coll_notes.findOne({_id: this.post._id});
	}

});


Meteor.methods({
	komentarInsert: function(postAttributes, postId){
		check(this.userId, String);
		check(postId, String);
		check(postAttributes, {
			_id: String,
			body: String
		});

		coll_posts.update({_id: postId}, {$push: {comments: postAttributes}, $inc: {commentsCount: 1}});

	}
});



