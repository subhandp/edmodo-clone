// Router.configure({
// 	layoutTemplate: 'layout'
// });

// Router.route('/',function(){
// 	this.render('login');
// });

// Router.route('/home',function(){
// 	this.render('home');
// });

// Router.route('/home/assigment',function(){
// 	this.render('assigment');
// });

// Router.route('/home/group',function(){
// 	this.render('group');
// });


// Router.route('/', function () {
//     this.render('login');
// });


// Router.route('/home', function () {
//     this.render('home');
// });  


// Router.map(function() {
//     this.route('login', {path: '/'});
//     this.route('home');
// });

Router.configure({
  loadingTemplate: 'loading',
  waitOn: function(){
  	if (Meteor.user()) {
  		return [Meteor.subscribe('p_notifications', Meteor.user().profile.status) ]
  	};
  }
});


Router.route('/', {
  	name: 'login',
	action: function(){
		this.render('login');
		console.log('login');
	}

});


PostsListController = RouteController.extend({
	increment: 2,
	sort: {createAt: -1, _id: -1},
	postsLimit: function() {
		return parseInt(Session.get('incrementMore')) || this.increment;
	},
	postsFilter: function(){
		return Session.get('filterPosts') || 'latest';
	},
	findOptions: function() {
	    return {sort: this.sort, limit: this.postsLimit()};
	},
	listGroups: function(){
		return  coll_groups.find().map(function (doc) { return doc._id; });
	},
	subscriptions: function() {
		
    	this.postsSub = Meteor.subscribe('p_posts', this.postsFilter(), this.findOptions(), Session.get('latest'), this.listGroups());
  	},
  	posts: function() {
    	return coll_posts.find({ createAt: {$lte: Session.get('latest')} }, this.findOptions());
  	},

	data: function() {
	    var self = this;
	    return {
	      posts: self.posts(),
	      ready: self.postsSub.ready,
	      nextPath: function() {
	        if (self.posts().count() === self.postsLimit())
	          return self.postsLimit() + self.increment;
	      }
	    };
	  }

});

HomePostsController = PostsListController.extend({
	action: function(){
		if (Meteor.user().profile.status == 'dosen') {

			this.render('home_konten_dosen');

			this.render('home_left_dosen',{
				to: 'leftSide'
			});

			this.render('home_right_dosen',{
				to: 'rightSide'
			});

		}
		else if(Meteor.user().profile.status == 'mahasiswa'){

			this.render('home_konten_mhs');

			this.render('home_left_mhs',{
				to: 'leftSide'
			});

			this.render('home_right_mhs',{
				to: 'rightSide'
			});
		}
	}

	// waitOn: function(){
	// 	if (Meteor.user()) {
	// 		Meteor.subscribe('p_sendTo', Meteor.user().profile.status);		
	// 	};

	// }

});

Router.route('/home', {
	layoutTemplate: 'layout',
	name: 'home',
	controller: HomePostsController
});


Router.route('/home/assigment', {
	name: 'assigment',
	layoutTemplate: 'layout',
	action: function(){
		if (Meteor.user().profile.status == 'dosen') {

			this.render('assig_konten_dosen');

			this.render('assig_left_dosen',{
				to: 'leftSide'
			});

		}
		else if(Meteor.user().profile.status == 'mahasiswa'){

			this.render('assig_konten_mhs');

			this.render('assig_left_mhs',{
				to: 'leftSide'
			});
		}
	}
});

Router.route('/home/group',{
	name: 'group',
	layoutTemplate: 'layout',
	action: function(){
		if (Meteor.user().profile.status == 'dosen') {

			this.render('group_konten_dosen');

			this.render('group_left_dosen',{
				to: 'leftSide'
			});

			this.render('group_right_dosen',{
				to: 'rightSide'
			});
		}
		else if(Meteor.user().profile.status == 'mahasiswa'){

			this.render('group_konten_mhs');

			this.render('group_left_mhs',{
				to: 'leftSide'
			});

			this.render('group_right_mhs',{
				to: 'rightSide'
			});
		}
	}
});

var mustLogin = function() {
    if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('login');
        console.log('if login');
    } else {
        this.next();
        console.log('else login');
    }
};

var goHome = function() {
    if (Meteor.user()) {
        Router.go('home');
        console.log('if home');
    } else {
        this.next();
        console.log('else home');
    }
};

Router.onBeforeAction(mustLogin, {except: ['login']}); //dijalankan ke semua route kecuali route bernama login

Router.onBeforeAction(goHome, {only: ['login']}); //hanya  di jalankan pada route bernama login