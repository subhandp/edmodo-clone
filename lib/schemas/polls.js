var options = new SimpleSchema({
	_id: {
		type: String,
		autoValue: function(){
			if(this.isInsert){
				return Random.id();
			}
		}
	},

	jawaban: {
		type: String,
		label: 'jawaban polling'
	},

	vote: {
		type: Number,
		defaultValue: 0,
		label: 'jumlah vote per jawaban'
	}

});



coll_polls.attachSchema(new SimpleSchema({
	_id: {
		type: String
	},

	pertanyaan: {
		type: String,
		label: 'Pertanyaan polling'
	},

	pilihan: {
		type: [options],
		label: 'pilihan jawaban polling'
	},

	semuaVote: {
		type: [String],
		defaultValue: [],
		label: 'user yang telah melakukan vote'
	},

	likers: {
		type: [String],
		defaultValue: [],
		label: 'user yang menyukai polling'
	},

	likes: {
		type: Number,
		defaultValue: 0,
		label: 'jumlah user yang menyukai polling'
	}

}));