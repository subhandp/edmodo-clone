  
  Meteor.publish("p_attachCollection", function () {
    console.log("publishing attachUploads");
    return AttachPostCollection.find();
  });



Meteor.publishComposite('p_notifications', function(jenisUser){

	return {

		find: function(){
			return coll_groups.find({$or: [ {"owner._id": this.userId},
											  {"anggota._id": this.userId} 
											]});
		},

		children: [
					{
						find: function(groups){
							return coll_notifications.find({ "pengirim._id": {$ne: this.userId}, $or: [ {"idPenerima._id": this.userId}, {"idPenerima._id": groups._id} ] });
						}

					},

					{
						//load semua user dan group terkait pengguna
						find: function(groups){
							if (jenisUser == 'dosen') {
								var listAnggota = _.map(groups.anggota, function(list){ return list._id });
								listAnggota.push(groups.owner._id);

								return Meteor.users.find({_id: {$in: listAnggota} });

							}else if (jenisUser == 'mahasiswa'){
								return Meteor.users.find({_id: groups.owner._id });
							}

						}

					}
		]

	}

});



Meteor.publishComposite('p_posts', function(filter, options, latest, listGroup){

	return [
				{
					find: function(groups){

						if (filter == 'poll' || filter == 'note' || filter == 'assigment'){
							return coll_posts.find({"post.type": filter, $or: [ {"owner._id": this.userId},
														  {"to._id": this.userId}, { "to._id": {$in: listGroup} }  
												]}, options);
						}else if (filter == 'byme'){
							return coll_posts.find( {"owner._id": this.userId}, options);
						}else if (filter == 'bystudent'){
							return coll_posts.find( {"owner.users": 'mahasiswa', "to._id": this.userId}, options);		
						}else{
							// cari post milik sendiri dan yang waktu creatednya kurang dari waktu latest 
							return coll_posts.find({ createAt: {$lte: latest}, $or:[ {"owner._id": this.userId}, {"to._id": this.userId}, { "to._id": {$in: listGroup} }   ] }, options);		
						}

					},

					children: [
								{

									find: function(posts){
											if (posts.post.type == 'note') {
												return coll_notes.find({_id: posts.post._id})
											}
											else if (posts.post.type == 'poll') {
												return coll_polls.find({_id: posts.post._id})
											}
											else if (posts.post.type == 'assigment') {
												return coll_assigments.find({_id: posts.post._id})
											}
									}	

								}	
					]	
				},

				{
					find: function(){
						//cari post baru yang bukan milik sendiri dan waktu creatednya lebih dari latest
						return coll_posts.find({ createAt: {$gt: latest}, $or:[ {"owner._id": this.userId}, {"to._id": this.userId}, { "to._id": {$in: listGroup} }  ] });
					},
					children: [
						{

							find: function(posts){
									if (posts.post.type == 'note') {
										return coll_notes.find({_id: posts.post._id})
									}
									else if (posts.post.type == 'poll') {
										return coll_polls.find({_id: posts.post._id})
									}
									else if (posts.post.type == 'assigment') {
										return coll_assigments.find({_id: posts.post._id})
									}
							}	

						}	
					]
				}
			]		



});



// Meteor.publishComposite('p_sendTo', function(jenisUser){

// 	return {

// 		find: function(){
// 			return coll_groups.find({$or: [ {"owner._id": this.userId},
// 											  {"anggota._id": this.userId} 
// 											]});
// 		},

// 		children: [
// 					{
// 						find: function(groups){
// 							if (jenisUser == 'dosen') {
// 								var listAnggota = _.map(groups.anggota, function(list){
// 									return list._id
// 								});
// 								listAnggota.push(groups.owner._id);

// 								return Meteor.users.find({_id: {$in: listAnggota} });

// 							}else if (jenisUser == 'mahasiswa'){
// 								return Meteor.users.find({_id: groups.owner._id });
// 							}

// 						}

// 					}
// 		]

// 	}

// });


// Meteor.publishComposite('p_sendToMhs',{
// 	find: function(){
// 		return coll_groups.find({"anggota._id": this.userId} );
// 	},

// 	children: [
// 				{
// 					find: function(groups){
// 						return Meteor.users.find({_id: groups.owner._id });
// 					}

// 				}
// 	]
// });
