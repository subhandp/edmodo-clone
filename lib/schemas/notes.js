coll_notes.attachSchema(new SimpleSchema({

	_id: {
		type: String
	},

	isiNote: {
		type: String,
		label: 'isi text note'
	},

	links: {
		type: [linkSchema],
		defaultValue: [],
		label: 'daftar share links note'
	},

	attachs: {
		type: [attachSchema],
		defaultValue: [],
		label: 'daftar attach note'
	},

	likers: {
		type: [String],
		defaultValue: [],
		label: 'user yang menyukai note'
	},

	likes: {
		type: Number,
		defaultValue: 0,
		label: 'jumlah user yang menyukai note'
	}

}));