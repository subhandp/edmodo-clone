var usersSchema = new SimpleSchema({
	_id:{
		type: String
	},

	nama:{
		type: String,
		label: "Nama users",
		max: 30
	},

	status:{
		type: String,
		label: "Status users",
		allowedValues: ['mahasiswa', 'dosen'],
		max: 10
	},

	foto:{
		type: String,
		label: "lokasi foto users"
	},

	username:{
		type: String,
		label: "username untuk login users"
	}
});


var ownerSchema = new SimpleSchema({
	_id:{
		type: String
	},

	nama:{
		type: String,
		label: 'nama pemilik group'
	},

	foto: {
		type: String,
		label: 'foto pemilik group'
	}
});


coll_groups.attachSchema(new SimpleSchema({

	_id:{
		type: String
	},

	kode_group:{
		type: String,
		autoValue: function(){
			if(this.isInsert){
				return Random.id([7]);
			}
		},
		unique: true,
		index: true, //mempercepat pencarian
		label: 'kode group'
	},
	nama: {
		type: String,
		label: 'nama group'
	},

	warna:{
		type: String,
		label: 'kode warna group'
	},

	kategoriGroup:{
		type: String,
		label: 'kategori group'
	},

	deskripsiGroup:{
		type: String,
		label: 'Deskripsi singkat group'
	},

	smallGroup:{
		type: [Object],
		label: 'properti untuk sub group',
		defaultValue: []
	},

	"smallGroup.$._id":{
		type: String,
		autoValue: function(){
			if(this.isInsert){
				return Random.id();
			}
		}
	},

	"smallGroup.$.nama":{
		type: String
	},

	"smallGroup.$.deskripsi":{	
		type: String
	},

	"smallGroup.$.anggota":{
		type: [String],
		defaultValue: [],
		label: "daftar id small group"
	},

	anggota:{
		type: [usersSchema],
		label: 'anggota group',
		defaultValue: []
	},

	owner:{
		type: ownerSchema,
		label: 'Pemilik group'

	}

}));