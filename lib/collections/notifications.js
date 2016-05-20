coll_notifications = new Mongo.Collection('c_notifications');

Meteor.methods({
  notifInsert: function (doc, sendTo) {
    check(doc, Object);    
    check(sendTo, {
      to: [Object]
    });

    var notif  = _.extend(doc, {
      idPenerima: sendTo.to,
    });

    coll_notifications.insert(notif);
  }
});