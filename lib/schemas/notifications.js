var penerimaSchema = new SimpleSchema({

	_id:{
		type: String
	},

	nama: {
		type: String,
		label: 'nama penerima notif'
	},

	jenis: {
		type: String,
		allowedValues: ['group', 'user'],
		label: 'daftar dan jenis penerima'
	}

});

var pengirimSchema = new SimpleSchema({
	_id: {
		type: String
	},

	nama: {
		type: String,
		label: 'nama pengirim notif'
	},

	foto: {
		type: String,
		label: 'foto pengirim notif'
	}
});

coll_notifications.attachSchema(new SimpleSchema({

	_id: {
		type: String
	},

	idPenerima: {
		type: [penerimaSchema],
		label: 'Daftar penerima notifikasi'
	},

	jenis: {
		type: String,
		allowedValues: ['newPost', 'likePost', 'repliedPost', 'joinGroup',  'gradedAssigment', 'commentedAssigment', 'turnAssigment'],
		label: 'Jenis post notifikasi'
	},

	body: {
		type: String,
		optional: true,
		label: 'isi notifikasi'
	},

	pengirim: {
		type: [pengirimSchema],
		optional: true,
		label: 'user id pemicu notifikasi'
	},

	idSumber: {
		type: String,
		optional: true,
		label: 'id group atau post terkait notifikasi'
	},

	readList: {
		type: [String],
		defaultValue: [],
		label: 'daftar status read notif'
	},

	createdAt: {
		type: Date,
		autoValue: function(){
			if(this.isInsert){
				return new Date();
			}
		}
	}

}));

