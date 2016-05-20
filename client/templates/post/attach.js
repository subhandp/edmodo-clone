// AttachPostCollection = new FS.Collection("attachPostCollection", {
//   stores: [new FS.Store.FileSystem("attachPostCollection", {path: "~/edformatika_attach"})]
// });

// attachPostCollection.allow({
//   insert: function (userId, doc) {
//     return true;
//   },
//   update: function (userId, doc) {
//     return true;
//   },
//   remove: function (userId, doc) {
//     return true;
//   },
//   download: function (userId, doc) {
//     return true;
//   }
// });

Template.attachFiles.onRendered(function(){
  Meteor.subscribe('p_attachCollection');
});

Template.attachFiles.helpers({
    listAttachFiles: function () {
      return AttachPostCollection.find();
    }
});

  Template.attachFiles.events({
      'change .attach-hidden-files': function (event, template) {

      console.log("uploading...")

      FS.Utility.eachFile(event, function (file) {

        console.log("each file...");
        console.log(file);

        var yourFile = new FS.File(file);

        AttachPostCollection.insert(yourFile, function (err, fileObj) {
          console.log("callback for the insert, err: ", err);
          if (!err) {
            console.log("inserted without error");
          }
          else {
            console.log("there was an error", err);
          }
        });
      });
    },

    'click #deleteAttach ': function (event) {
      console.log("deleteFile button ", this);
      AttachPostCollection.remove({_id: this._id});
    },

    'click .attach-hidden-files': function(){
      console.log('click');
    }
  });



