// coll_polls.helpers({
// 	polling: function () {

// 		var poll = []; 
// 		var jmlhVote = Session.get("totalVote");

// 		_.each(this.pilihan, function(pilihan){
// 			poll.push(
// 						  {
// 							jawaban: pilihan.jawaban,
// 							vote: pilihan.vote,
// 							persen: Math.round(pilihan.vote / jmlhVote * 100)
							
// 						  }
// 			);
// 		});


// 		return poll;
// 	},

// 	setTotalVote: function(){
// 		Session.set("totalVote", this.semuaVote.length);
// 	}

// });