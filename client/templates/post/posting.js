

var aturNomer = function(element){
	$(element).each(function(index, el) {
		$(this).attr('placeholder', 'Answer #'+(index+1)+'');
		$(this).prop('name', 'jawaban-poll'+(index+1)+'');
	});
}

var makeNotif = function(result, sendTo){

	var doc = {
		idSumber: result,
		pengirim: [{
			_id: Meteor.userId(),
			nama: Meteor.user().profile.nama,
			foto: Meteor.user().profile.foto
		}],
		jenis: 'newPost'
	}

	Meteor.call('notifInsert', doc, sendTo, function (error, result) {
		if (error) {
			return throwError(error.reason);
		};
	});
}

Template.posting.events({
	 'click .attach-now-note': function(event, template){
	     $('.attach-hidden-files').click(); 
	     console.log('click attach');
	 },

	'click button.tambah-poll': function(event, template){
		var button = $(event.target);
		var form = template.$('form[name="submit-poll"]');
		var newJawaban = '<div class="ui field "><i class="close link icon close-jawaban"></i><input type="text" class="jawaban-poll" name="" placeholder=""></div>';
		$(newJawaban).insertBefore(button);
		aturNomer(form.find('[class="jawaban-poll"]'));
		poll_validation();
	},

	'click i.close-jawaban': function(event, template){
		var form = template.$('form[name="submit-poll"]');
		$(event.target).closest('div').remove();
		aturNomer(form.find('[name="jawaban-poll"]'));
	},

	'submit form': function(event, template){
		event.preventDefault();
		var form = $(event.currentTarget);
		var send = form.find('.dropdown-sendto').dropdown('get value').split(',');
		var sendTo = { 
			to: []
		};

		_.each(send, function(value, key, list){
			sendTo.to.push({
				_id: value.split('/')[0],
				nama: value.split('/')[1],
				jenis: value.split('/')[2]
			});
		
		});

		// var sendTo = {
		// 	to:  form.find('.dropdown-sendto').dropdown('get value').split(',')
		// }

		var typeSubmit = form.attr('name');

		if (typeSubmit == 'submit-note') {
			var posts = {
				isiNote: form.find('[name="isi-note"]').val(),
			}

			Meteor.call('noteInsert', posts, sendTo, function (error, result) {
				if (error) {
					return throwError(error.reason);
				}else{
					makeNotif(result, sendTo);
				}
			});

		}else if(typeSubmit == 'submit-assigment'){
			var posts = {
				title: form.find('[name="title-assigment"]').val(),
				deskripsi: form.find('[name="deskripsi-assigment"]').val(),
				lock: form.find('[name="lock-assigment"]').is(':checked') ? 1 : 0,
				dueDate: new Date(form.find('[name="date-assigment"]').val())
			}

			Meteor.call('assigmentInsert', posts, sendTo, function (error, result) {
				if (error) {
					return throwError(error.reason);
				}else{
					makeNotif(result, sendTo);
				}
			});

			console.log(posts);

		}else if(typeSubmit == 'submit-poll'){
			poll_validation();
			var daftarJawaban = [];
			$(form.find('.jawaban-poll')).each(function(index, el){
				daftarJawaban[index] = {
					jawaban: $(this).val()
				}
			});

			var posts = {
				pertanyaan: form.find('[name="pertanyaan-poll"]').val(),
				pilihan: daftarJawaban
			}

			console.log(posts);

			Meteor.call('pollInsert', posts, sendTo, function (error, result) {
				if (error) {
					return throwError(error.reason);
				}else{
					makeNotif(result, sendTo);
				}
			});

		}

		$('.ui.dropdown').dropdown({
			position: 'bottom-center'
		});

	}
});



Template.posting.onRendered(function(){
	$('.tabular.menu .item').tab();

	this.$('.datepicker').datetimepicker({
		format: 'YYYY-MM-DD',
		minDate: new Date()
	});

	$('.ui.dropdown').dropdown({
		position: 'bottom-center'
	});

	$('.tooltip').popup({
		inline: true,
		position: 'bottom center'
	});

	$('.ui.form[name="submit-note"]')
	  .form({
	        isiNote: {
	          identifier  : 'isi-note',
	          rules: [
	            {
	              type   : 'empty',
	              prompt : 'Isi note harus di isi'
	            }
	          ]
	        },
	        userForSend: {
	          identifier  : 'userForSend',
	          rules: [
	            {
	              type   : 'empty',
	              prompt : 'Tujuan note harus di isi'
	            }
	          ]
	        }
	  },{
	    inline: true
	  });


		$('.ui.form[name="submit-assigment"]')
		  .form({
		        titleAssigment: {
		          identifier  : 'title-assigment',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Title assigment harus di isi'
		            }
		          ]
		        },
		   		dateAssigment: {
		          identifier  : 'date-assigment',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Due date assigment harus di isi'
		            }
		          ]
		        },
		        deskripsiAssigment: {
		          identifier  : 'deskripsi-assigment',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Deskripsi assigment harus di isi'
		            }
		          ]
		        },
		        userForSend: {
		          identifier  : 'userForSend',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Tujuan assigment harus di isi'
		            }
		          ]
		        }
		  },{
		    inline: true
		  });

	poll_validation();

});


var poll_validation = function(){
	
		var pil = $('.ui.form[name="submit-poll"]').find('.jawaban-poll');
		var jawaban = {};
		var rulesProp = [{
		              type   : 'empty',
		              prompt : 'Jawaban polling harus di isi'
		            }];
		var pollValidation = {
		        pertanyaanPoll: {
		          identifier  : 'pertanyaan-poll',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Pertanyaan polling harus di isi'
		            }
		          ]
		        },
		        userForSend: {
		          identifier  : 'userForSend',
		          rules: [
		            {
		              type   : 'empty',
		              prompt : 'Tujuan polling harus di isi'
		            }
		          ]
		        }
		  };

		pil.each(function(index) {
			jawaban[ $(this).attr('name') ] = {}; 
			jawaban[ $(this).attr('name') ].identifier = $(this).attr('name'); 
			jawaban[ $(this).attr('name') ].rules = rulesProp;
			
		});

		  var finalValidation = $.extend(pollValidation, jawaban);

		$('.ui.form[name="submit-poll"]')
		  .form(
		  	finalValidation,{
		    inline: true
		  });
}