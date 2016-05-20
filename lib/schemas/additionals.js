attachSchema = new SimpleSchema({
	_id:{
		type: String,
		autoValue: function(){
			if(this.isInsert || this.isUpdate){
				return Random.id();
			}
		}
	},

	namaFile:{
		type: String,
		label: "Nama file"
	},

	tipeFile:{
		type: String,
		label: "Tipe file"
	},

	lokasi:{
		type: String,
		label: "Lokasi file"
	},

	download:{
		type: String,
		label: "link download"
	}
});


linkSchema = new SimpleSchema({
	_id:{
		type: String,
		autoValue: function(){
			if(this.isInsert || this.isUpdate){
				return Random.id();
			}
		}
	},

	gambar:{
		type: String,
		label: "Lokasi gambar link"
	},

	nama:{
		type: String,
		label: "Nama post link"
	},

	url:{
		type: String,
		label: "Url link"
	}
});




// owner_schema = new SimpleSchema({

// 	id:{
// 		type: String
// 	},

// 	nama:{
// 		type: String,
// 		label: "Nama owner" 
// 	},

// 	foto:{
// 		type: String,
// 		label: "lokasi foto owner"
// 	},

// 	type: {
// 		type: ["mahasiswa", "dosen"]
// 	}

// });