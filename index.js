//Starting point of App
//Takes User Input as Requirements and sends it to Search.js
var prompt = require('prompt');
var prompt1 = require('prompt');
var search = require('./search.js');
var prompt2 = require('prompt');
var prompt3 = require('prompt');
prompt.start();
console.log("****App Started****\n");
console.log("Please Give Valid Inputs as This will help in getting Better Results\n");
console.log("Please enter Your requirements Separated by Comma(,)\n");
prompt.get(['requirements'], function (err, result) {
	if (err) { return onErr(err); }
 	else
 	{	
 		var req = result.requirements;
 		req = req.split(",");
 		console.log("Received Inputs..Would you like to have some Github stars Preference ?..(Y/n)\n");
 		prompt1.start();
 		prompt1.get(['response'], function (err, resp) {
 			if(err) { return onErr(err);}
 				else
 				{
 					var ans = resp.response;
 					if(ans=="n")
 					{
 						var language;
 						console.log("Specify the name of Language\n");
 						prompt3.start();
 						prompt3.get(['lan'],function (err,langu) {
 							if(err) { return onErr(err);}
 							else
 							{
 								language = langu.lan;
 								var sent = "N";
 								var app = new search(req,sent,language);
 								app.run();
 							}
 						});

 					}
 					else
 					{
 						console.log("Enter the Minimum Number of Stars you prefer.\n");
 						prompt2.start();
 						prompt2.get(['stars'],function (err, star) {
 							if(err) { return onErr(err);}
 							else
 							{
 								var langreq;
 								console.log("Specify the name of Language\n");
 								prompt3.start();
 								prompt3.get(['lan'],function (err,langu) {
 									if(err) { return onErr(err); }
 									else
 									{
 										langreq = langu.lan;
 										var starcount = star.stars;
 										var app = new search(req,starcount,langreq);
 										app.run();
 									}
 								});

 							}
 						});
 					}
 				}
 			});
 	}
 		
});
  function onErr(err) {
    console.log(err);
    return 1;
}