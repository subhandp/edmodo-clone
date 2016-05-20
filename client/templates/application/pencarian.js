Template.pencarian.helpers({
  searchIndexes: () => [usersIndex, groupsIndex, assigmentsIndex, notesIndex, pollsIndex],
  usersIndex: () => usersIndex,
  groupsIndex: () => groupsIndex,
  assigmentsIndex: () => assigmentsIndex,
  notesIndex: () => notesIndex,
  pollsIndex: () => pollsIndex,
  inputAttributes: function () {
      return { 'class': 'easy-search-input pencarian-input', 'placeholder': 'Start searching...' };
  }
});

Template.pencarian.onRendered(function(){
  $('.pencarian-input').popup({
      on: 'manual',
      inline   : true,
      closable: true,
      hideOnScroll: true
  });

});

Template.pencarian.events({

  'keyup .pencarian-input': function (event) {
    var val = $.trim($(event.currentTarget).val());
    if (val.length === 0 ) {
      $('.pencarian-input').popup('hide');
    }else{
      $('.pencarian-input').popup('show');
    }
  }
});
