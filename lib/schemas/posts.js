
var tujuan = new SimpleSchema({
	_id:{
		type: String
	},

	nama:{
		type: String,
		label: 'nama tujuan post'
	},

	gambar: {
		type: String,
		optional: true,
		label: 'gambar tujuan post'
	},

	users:{
		type: String,
		label: "jenis users post"
	}

});

var toSchema = new SimpleSchema({
	_id:{
		type: String
	},

	jenis:{
		type: String,
		allowedValues: ['user', 'group'],
		label: "jenis tujuan post"
	}

});

var commentSchema = new SimpleSchema({

	_id:{
		type: String
	},

	submit: {
		type: Date,
		autoValue: function(){
			if(this.isInsert || this.isUpdate){
				return new Date();
			}
		}
	},

	body: {
		type: String
	}

});


coll_posts.attachSchema(new SimpleSchema({
	_id: {
		type: String
	},

	post: {
		type: Object,
		label: 'isi posts'
	},

	"post._id": {
		type: String
	},

	"post.type": {
		type: String,
		allowedValues: ['note', 'assigment', 'poll']
	},

	owner: {
		type: tujuan,
		label: 'pemilik post'
	},

	to: {
		type: [toSchema],
		label: 'tujuan post'
	},

	comments: {
		type: [commentSchema],
		defaultValue: [],
		label: 'daftar komentar post'
	},

	commentsCount:{
		type: Number,
		defaultValue: 0,
		label: 'jumlah komentar post'
	},

	likers: {
		type: [String],
		defaultValue: [],
		label: 'daftar user yang menyukai post'
	},

	likersCount: {
		type: Number,
		defaultValue: 0,
		label: 'jumlah like pada post'
	},

	kirimNanti: {
		type: Date,
		optional: true,
		label: "schedule post"
	},

	createAt: {
		type: Date,
		autoValue: function(){
			if(this.isInsert){
				return new Date();
			}
		},
		label: 'waktu posting'
	}

}));