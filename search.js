//File that will Search the Web(Github) and return the correct results
var cheerio = require('cheerio');
var request = require('request-promise');

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
		var flag = 0;
		var k = 0;
		var requestCount = 0;
		for(k = 0;k<=num;k++)
		{
			var fire = "https://api.github.com/search/repositories?q=in:"+this.requirements[k]+"+language:"+this.codelang;
			var options = {
				url: fire,
				method: 'GET',
				json: true,
				headers: {
					'User-Agent': 'chrome'
					}
			};
			request(options).then(function(body) {
				var result = body;
				if(result.items[0])
				{
					output[track++]=result.items[0].full_name;
				}
				if(result.items[1])
				{
					output[track++]=result.items[1].full_name;
				}
				requestCount++;
				complete(requestCount);
				
			})
			.catch(function(err){
				console.log("Error Fetching Results! Please try again");
			});
		}

		function complete(check)
		{
			if(check==num+1)
			{
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
			}

		}
	} 
	else 	
	{
		var count = this.response;
		var num = this.requirements.length-1;
		var track = 0;
		var requestCounter = 0;
		for(var k = 0;k<=num;k++)
		{
			var fire = "https://api.github.com/search/repositories?q=in:"+this.requirements[k]+"+language:"+this.codelang;
			var options = {
				url: fire,
				method: 'GET',
				json: true,
				headers: {
				'User-Agent': 'akashdeepgoel'
				}
         	};
			request(options).then(function(body) {
			var result = body;
			var done=0;
			var upto = result.items.length-1;
			var it=0;
			while(done<3&&it<=upto)
			{
				if(result.items[it].stargazers_count>=count&&result.items[it])
				{
					done++;
					output[track++]=result.items[it].full_name;
				}
				it++;
			}
			requestCounter++;
			completeProcess(requestCounter);
   			})
   			.catch(function(err){
				console.log("Error Fetching Results! Please try again");
			});
		}

		function completeProcess(check)
		{
			if(check==num+1)
			{
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
            }        

		}     
	} 
};
