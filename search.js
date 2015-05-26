//File that will Search the Web(Github) and return the correct results
var cheerio = require('cheerio');
var request = require('request');

module.exports = Search;

function Search(requirements, response,codelang) {
	this.requirements = requirements;
	this.response = response;
	this.codelang = codelang;
};
var output={};
Search.prototype.run = function() {
	if (this.response=="N") 
	{
		var num = this.requirements.length-1;
		var track = 0;
		for(var k = 0;k<=num;k++)
		{
			//console.log("Value hagi hai "+this.requirements[k]);
			var fire = "https://api.github.com/search/repositories?q="+this.requirements[k]+"+language:"+this.codelang;
			//console.log("URL AAPNE "+fire);
			var options = {
         	url: fire,
         	method: 'GET',
         	json: true,
         	headers: {
    			'User-Agent': 'chrome'
  			}
         	};
			request(options, function(err, resp, body) {
        	if (err)
        	{
           		throw err;
       		}
       		else
       		{
       			var result = body;
       			//console.log(result.items[0].full_name);
       			setTimeout(function(){
       			output[track++]=result.items[0].full_name;
       			output[track++]=result.items[1].full_name;
       		},5000);
       		}
   			});
		}
		setTimeout(function(){
			if(track==0)
			{
				console.log("Sorry Dev...I couldn't find anything satisfying you..:p\n");

			}
			else
			{
				console.log("Hooray!! I have your results ready!!\n");
				setTimeout(function(){
				for(var it = 0;it<track;it++)
				{
					console.log("["+(it+1)+"]"+" "+ output[it]+"\n");
				}

			},3000);
			}
		},10000);
	} 
	else 	
	{
		var count = this.response;
		var num = this.requirements.length-1;
		var track = 0;
		for(var k = 0;k<=num;k++)
		{
			//console.log("Value hagi hai "+this.requirements[k]);
			var fire = "https://api.github.com/search/repositories?q="+this.requirements[k]+"+language:"+this.codelang;
			console.log("URL AAPNE "+fire);
			var options = {
         	url: fire,
         	method: 'GET',
         	json: true,
         	headers: {
    			'User-Agent': 'akashdeepgoel'
  			}
         	};
			request(options, function(err, resp, body) {
        	if (err)
        	{
           		throw err;
       		}
       		else
       		{
       			var result = body;
       			//console.log(result.items[0].full_name);
       			setTimeout(function(){
       				var done=0;
       				var upto = result.items.length-1;
       				var it=0;
       				while(done<3&&it<=upto)
       				{
       					if(result.items[it].stargazers_count>=count)
       					{
       						done++;
       						output[track++]=result.items[it].full_name;
       					}
       					it++;
       				}

       		},5000);
       		}
   			});
		}
		setTimeout(function(){
			if(track==0)
			{
				console.log("Sorry Dev...I couldn't find anything satisfying you..:p\n");

			}
			else
			{
				console.log("Hooray!! I have your results ready!!\n");
				setTimeout(function(){
				for(var it = 0;it<track;it++)
				{
					console.log("["+(it+1)+"]"+" "+ output[it]+"\n");
				}

			},3000);
			}
		},10000);
	}
};