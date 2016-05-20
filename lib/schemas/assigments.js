
var dataSubmit = new SimpleSchema({
	judul:{
		type: String,
		label: 'Judul submit'
	},

	link:{
		type: [linkSchema],
		defaultValue: [],
		label: 'Links submit'
	},

	attach: {
		type: [attachSchema],
		defaultValue: [],
		label: 'Attachs submit'
	},

	submited: {
		type: Date,
		autoValue: function() {
	      if (this.isInsert) {
	        return new Date();
	      } else if (this.isUpsert) {
	        return {$setOnInsert: new Date()};
	      } else {
	        this.unset();
	      }
	    },
	    label: 'Tanggal submit'
	}

});

var submit = new SimpleSchema({
	_id:{
		type: String
	},

	username: {
		type: String,
		label: 'username submit'
	},

	nama:{
		type: String,
		label: 'Nama user submit'
	},

	foto: {
		type: String,
		label: 'Foto user submit'
	},

	data: {
		type: [dataSubmit],
		label: 'Data submit'
	},

	nilai: {
		type: [Number],
		defaultValue: [0,0],
		label: 'Nilai submit assigment'
	}

});


coll_assigments.attachSchema(new SimpleSchema({
	_id: {
		type: String
	},

	title: {
		type: String,
		label: 'Title assigment'
	},

	deskripsi: {
		type: String,
		label: 'deskripsi assigment'
	},

	lock: {
		type: Number,
		defaultValue: 0,
		label: 'kunci assigment setelah batas due date'
	},

	links: {
		type: [linkSchema],
		defaultValue: [],
		label: 'Links assigment'
	},

	attachs: {
		type: [attachSchema],
		defaultValue: [],
		label: 'Attachs assigment'
	},
	
	dueDate:{
		type: Date,
		label: 'Batas pengumpulan'
	},

	submit: {
		type: [submit],
		defaultValue: [],
		label: 'Daftar submit assigment'
	}

}));

