/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var config = require('../config.json');
var plugin = require("../../../app/libs/plugin.js");

module.exports.commandline = "getmessages";

module.exports.scriptparams = "getmessages <amount>";

module.exports.executescript = function(message,args){
	//console.log("data?");
	//message.channel.fetchMessages()
		//.then(messages =>{
			//console.log(messages);
		//});
	var discordbot = plugin.getdiscordclient();
	//console.log(discordbot);
	if(discordbot !=null){
		//if id key is not assign serach for guild and channel text name
		if(config.databaseguildid != ""){
			var bfound = false;
			discordbot.guilds.forEach(function (guild) {
		    	//console.log("id:"+guild.id);
				//console.log("name:"+guild.name);
				if(guild.id == config.databaseguildid){
					if(config.databaseguildname == guild.name){
						guild.channels.forEach(function (channel) {
							//console.log("id:"+channel.id);
							//console.log("username:"+channel.name);
							//console.log("status:"+channel.type);
							if(config.databasechannelname == channel.name){
								var _msgcount = parseInt(args[2]) || 0;
								var options = {};
								if((_msgcount > 0)&&(_msgcount < 101)){
									options = {limit:_msgcount};
								}else{
									console.log("Messages Range Limtied: 1-100");
								}
								//get the message from this channel from guilds
								//if the array is empty it get all of it?
								//need to work on it later
								channel.fetchMessages(options)
									.then(messages =>{
										console.log(messages);
									});
							}
						});
					}
				}
			});
			discordbot =null;
			bfound = null;
			name= null;
		}
	}


};
