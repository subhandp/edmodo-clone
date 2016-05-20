// var isDirect = function(tujuanNotif){

// 	var idTujuan = _.map(tujuanNotif, function(value, key, list){
// 		return value._id;
// 	});
// 	// +1 karna jika di temukan pada elemen pertama maka 0 jika tidak -1
// 	return idTujuan.indexOf( Meteor.userId() ) + 1;
// }


Template.header.helpers({
	searchIndexes: () => [usersIndex, groupsIndex, assigmentsIndex, notesIndex, pollsIndex],
	usersIndex: () => usersIndex,
	groupsIndex: () => groupsIndex,
	assigmentsIndex: () => assigmentsIndex,
	notesIndex: () => notesIndex,
	pollsIndex: () => pollsIndex,
	inputAttributes: function () {
	  return { 'class': 'pencarian-input', 'placeholder': 'Cari posts, users, groups dll' };
	},

	notifCount: function(){
		return coll_notifications.find({ readList: {$ne: Meteor.userId()} }).count();
	},

	notif: function(){
		return coll_notifications.find({},{sort: {createdAt: -1}});
	},

	jenisNotif: function (value, param) {
		if (value == param) {
			return true;
		};
	},


	getTujuanNotif: function (){
		var tujuan = '';
		var idTujuan = _.map(this.idPenerima, function(value, key, list){ return value._id; });
		var idGroups = coll_groups.find().map(function (Obj) { return Obj._id; });
		var isDirect = _.findWhere(this.idPenerima, {_id: Meteor.userId(), jenis: 'user'});
		
		if (isDirect) {
			tujuan = 'Anda';
		}else{
			console.log('penerima');
			var Obj = _.findWhere(this.idPenerima, {_id: _.last( _.intersection(idTujuan, idGroups) ), jenis: 'group'});
			tujuan = '<a href="#">'+Obj.nama+'</a>';
		}

		if (this.idPenerima.length > 1) {
			tujuan += ' dan '+(this.idPenerima.length - 1)+' lainya'; 
		};

		return tujuan;
	}

});



Template.header.onRendered(function(){
	$('.pencarian-input').popup({
	  on: 'manual',
	  inline   : true,
	  closable: true,
	  position: 'bottom center',
	  variation: 'basic',
	  hideOnScroll: false
	});

	$('a.notif').popup({
	  	on: 'click',
	    inline   : true,
	    position : 'bottom center'
	});
});

Template.header.events({
	'click .pencarian-input': function(event){
		if ( $.trim($(event.currentTarget).val()).length != 0) {
			$('.dimmer-all').dimmer('show');
			$('.header-menu').css({'z-index': '999999'});
			$('.pencarian-input').popup('show');
		}
	},

	'keyup .pencarian-input': function (event) {
		if ( $.trim($(event.currentTarget).val()).length === 0 ) {
		  $('.pencarian-input').popup('hide');
		  $('.dimmer-all').dimmer('hide');
		}else{
		  $('.dimmer-all')
		      	.dimmer({
		      		onShow: function(){
		      			$('.header-menu').css({'z-index': '99999'});
						$('.pencarian-input').popup('show');
		      		},

		      		onHide: function(){
		      			$('.header-menu').css({'z-index': '101'});
		      			$('.pencarian-input').popup('hide');
		      		}
		      	})
		  		.dimmer('show');

		}
	},

	'click a.notif': function (event) {

		// Tracker.autorun(function () {
		// 	var notifSubscribe = Meteor.subscribe('p_notifications');
		// 	if (notifSubscribe.ready()) {
		// 		console.log('subscribe ready');
		// 	}else{
		// 		console.log('subscribe not ready');
		// 	}
		// });

	}

});
