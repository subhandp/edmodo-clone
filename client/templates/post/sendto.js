Template.sendto.helpers({
  getUsers: function() {
  	return Meteor.users.find({_id: {$ne: Meteor.userId()}});
  },

  getGroups: function() {
  	return coll_groups.find();
  }
});


Template.sendto.onRendered(function(){
	$('.ui.dropdown.dropdown-sendto').dropdown({
    	position: 'bottom-center',
    	fullTextSearch: true
  	});
});