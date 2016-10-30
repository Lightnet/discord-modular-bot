/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var fs = require('fs');
var configpath = __dirname + '/../config.json';
console.log(configpath);
var config = require('../config.json');


module.exports.commandline = "query";

module.exports.scriptparams = "query <collection name> {}";

module.exports.executescript = function(message,args){
	//console.log("data?");
	//console.log(message);
	var discordbot = plugin.getdiscordclient();
	console.log(discordbot);
	if(discordbot !=null){
		//if id key is not assign serach for guild and channel text name
		if((config.databaseguildid == "")|| (config.databasechannelid == "")){
			discordbot.guilds.forEach(function (guild) {
		    	//console.log("id:"+guild.id);
				//console.log("name:"+guild.name);
				guild.channels.forEach(function (channel) {
					//console.log("id:"+channel.id);
					//console.log("username:"+channel.name);
					//console.log("status:"+channel.type);
					if((config.databaseguildname == guild.name)&&(config.databasechannelname == channel.name)){
						config.databaseguildid = guild.id;
						config.databasechannelid = channel.id;
						fs.writeFile(configpath, JSON.stringify(config, null, 4), function(err) {
							if(err) {
							  console.log(err);
							} else {
							  console.log("JSON saved to " + configpath);
							}
						});
					}
				});
			});
		}else{//console.log('other?');
			//channel check
			if(config.databasechannelid != ""){
				var channel = discordbot.channels.get(config.databasechannelid);
				if(channel !=null){
					//console.log("found!");
					//console.log(channel);
					channel.fetchMessages().then(messages =>{
						console.log(messages.size);
						console.log(messages);
						//need to conver to json some how?
					});
				}
			}
		}
	}
	discordbot = null;
};
