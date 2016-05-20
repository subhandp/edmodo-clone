  groupsIndex = new EasySearch.Index({
    collection: coll_groups,
    fields: ['nama'],
    engine: new EasySearch.MongoDB(),
    defaultSearchOptions: {
      limit: 3
    }
  });

  usersIndex = new EasySearch.Index({
    collection: Meteor.users,
    fields: ['profile.nama'],
    engine: new EasySearch.MongoDB(),
    defaultSearchOptions: {
      limit: 3
    }
  });

  assigmentsIndex = new EasySearch.Index({
    collection: coll_assigments,
    fields: ['title'],
    engine: new EasySearch.MongoDB(),
    defaultSearchOptions: {
      limit: 3
    }
  });

  notesIndex = new EasySearch.Index({
    collection: coll_notes,
    fields: ['isiNote'],
    engine: new EasySearch.MongoDB(),
    defaultSearchOptions: {
      limit: 3
    }
  });

  pollsIndex = new EasySearch.Index({
    collection: coll_polls,
    fields: ['pertanyaan'],
    engine: new EasySearch.MongoDB(),
    defaultSearchOptions: {
      limit: 3
    }
  });



