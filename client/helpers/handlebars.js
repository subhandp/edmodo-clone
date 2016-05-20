Template.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});


// Template.registerHelper('postBaru',function(query){
//   var options =  {reactive: false, sort: {createAt: -1, _id: -1} };
//   if ($.isEmptyObject(query)) query = {};
//   return  coll_posts.find(query, options).fetch();
// });