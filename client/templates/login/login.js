Template.login.onRendered(function(){
  $('.ui.form').form({
        email: {
          identifier  : 'username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your username'
            }
          ]
        },
        password: {
          identifier  : 'password',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your password'
            },
            {
              type   : 'length[6]',
              prompt : 'Your password must be at least 6 characters'
            }
          ]
        }
  });
});

Template.login.events({
  'submit #login-form': function (event) {
        event.preventDefault();
        var username = event.target.username.value;
        var password = event.target.password.value;
        Meteor.loginWithPassword(username, password);
  }
});