// Template.home_konten_dosen.onRendered(function(){
// 	$('.ui.dropdown').dropdown({
// 		position: 'bottom-center'
// 	});

// 	$('.tooltip').popup({
// 		inline: true,
// 		position: 'bottom center'
// 	});

// 	$('.notif').popup({
// 	  	on: 'click',
// 	    inline   : true,
// 	    position : 'bottom center'
// 	});

// 	$('.menu .item').tab();

// 	this.$('.datepicker').datetimepicker({
// 		format: 'DD/MM/YYYY',
// 		minDate: new Date()
// 	});

// 	$('.buat-group').on('click', function() {
// 		$('.modal-group').modal('show');
// 	});

// 	$('.share-link').on('click', function() {
// 		$('.post-link').modal('show');
// 	});
	
// 	$('.gabung-group').on('click', function() {
// 		$('.join-group').modal('show');
// 	});

//     $("#service-dropdown").dropdown({
//         allowLabels: true
//      });

// });



// Template.home_konten_dosen.events({
// 	'keypress .searching': function (event) {
// 		console.log($(event.currentTarget).children('.search').val());
// 	}
// });

// Template.home_konten_dosen.helpers({
//   settings: function() {
//     return {
//       position: 'bottom',
//       limit: 30,  // more than 20, to emphasize matches outside strings *starting* with the filter
//       rules: [
//         {
//           token: '#',
//           // string means a server-side collection; otherwise, assume a client-side collection
//           collection: coll_groups,
//           field: "nama",
//           options: '', // Use case-sensitive match to take advantage of server index.
//           matchAll: true,
//           template: Template.groupscoll,
//           noMatchTemplate: Template.serverNoMatch
//         },
//         {
//           token: '@',
//           collection: Meteor.users,  // Mongo.Collection object means client-side collection
//           field: "profile.nama",
//           // set to true to search anywhere in the field, which cannot use an index.
//           matchAll: true,  // 'ba' will match 'bar' and 'baz' first, then 'abacus'
//           template: Template.userscoll,
//           noMatchTemplate: Template.serverNoMatch
//         }
//       ]
//     }
//   },

//   getUsers: function() {
//   	return Meteor.users.find();
//   },

//   getGroups: function() {
//   	return coll_groups.find();
//   },

//   labelExist: function(id){
//   	$('.labelSend').each(function(index) {
//   		if ( $( this ).attr('data-value') == id) {
//   			return false;
//   		};
//   	});
//   	return true;
//   }
// });

// Template.home_konten_dosen.events({
//   "autocompleteselect input": function(e, t, doc) {
//   	$(e.currentTarget).val('');
//   	if (typeof doc.username != 'undefined') {
//   		var typeDoc = 'user';
//   		var nama = doc.profile.nama;
//   	}else{
//   		var typeDoc = 'group';
//   		var nama = doc.nama;
//   	}
//   	var label = "<a class='ui label transition visible labelSend' data-value="+doc.id+" style='display: inline-block !important;' >"+nama+"<i class='delete icon'></i></a>";
//   	$('.label-select').append(label);
//   }
// });

// Template.searchBox.onRendered(function(){
// 	$('select.dropdown').dropdown();
// })

// Template.searchBox.helpers({
//   searchIndexes: () => [usersIndex,groupsIndex],
//   usersIndex: () => usersIndex,
//   groupsIndex: () => groupsIndex
// });

