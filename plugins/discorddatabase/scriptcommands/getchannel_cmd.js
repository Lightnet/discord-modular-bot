/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var config = require('../config.json');
var plugin = require("../../../app/libs/plugin.js");

module.exports.commandline = "getchannel";

module.exports.scriptparams = "getchannel";

module.exports.executescript = function(message,args){
	//console.log("data?");
	//db getchannel
	var discordbot = plugin.getdiscordclient();
	//console.log(discordbot);
	if(discordbot !=null){
		//if id key is not assign serach for guild and channel text name
		if(config.databaseguildid != ""){
			var bfound = false;
			var name = "";
			discordbot.guilds.forEach(function (guild) {
		    	//console.log("id:"+guild.id);
				//console.log("name:"+guild.name);
				//console.log(guild.id + ":" + config.databaseguildid);
				if(guild.id == config.databaseguildid){
					if(config.databaseguildname == guild.name){
						guild.channels.forEach(function (channel) {
							//console.log("id:"+channel.id);
							//console.log("username:"+channel.name);
							//console.log("status:"+channel.type);
							if(config.databasechannelname == channel.name){
								name = channel.name;
								bfound = true;
							}
						});
					}
				}
			});
			if(bfound){
				message.channel.sendMessage(name);
			}else {
				message.channel.sendMessage("Does not exist or error?");
			}
			discordbot =null;
			bfound = null;
			name= null;
		}
	}
};
