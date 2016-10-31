/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var config = require('../config.json');
var plugin = require("../../../app/libs/plugin.js");

module.exports.commandline = "listchannel";

module.exports.scriptparams = "listchannel";

module.exports.executescript = function(message,args){
	//console.log("data?");
	//db listchannel
	var discordbot = plugin.getdiscordclient();
	//console.log(discordbot);
	if(discordbot !=null){
		//if id key is not assign serach for guild and channel text name
		if(config.databaseguildid != ""){
			discordbot.guilds.forEach(function (guild) {
		    	//console.log("id:"+guild.id);
				//console.log("name:"+guild.name);
				console.log(guild.id + ":" + config.databaseguildid);
				if(guild.id == config.databaseguildid){
					var channeltext = "Channels:\n";
					guild.channels.forEach(function (channel) {
						//console.log("id:"+channel.id);
						//console.log("username:"+channel.name);
						//console.log("status:"+channel.type);
						channeltext += channel.name + "\n";
					});
					message.channel.sendMessage(channeltext);
					channeltext =null;
				}
			});
		}

	}
};
