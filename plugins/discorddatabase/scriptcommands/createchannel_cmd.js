/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

var config = require('../config.json');
var plugin = require("../../../app/libs/plugin.js");

module.exports.commandline = "createchannel";

module.exports.scriptparams = "createchannel <name>";

module.exports.executescript = function(message,args){
	//console.log("data?");
	var discordbot = plugin.getdiscordclient();
	//console.log(discordbot);
	if(discordbot !=null){
		//if id key is not assign serach for guild and channel text name
		if(config.databaseguildid != ""){

			discordbot.guilds.forEach(function (guild) {
		    	//console.log("id:"+guild.id);
				//console.log("name:"+guild.name);
				//console.log(guild.id + ":" + config.databaseguildid);
				if(guild.id == config.databaseguildid){
					//console.log(guild);
					var bfound = false;
					guild.channels.forEach(function (channel) {
						if(channel.name == args[2]){
							bfound = true;
						}
						//console.log("id:"+channel.id);
						//console.log("username:"+channel.name);
						//console.log("status:"+channel.type);
					});
					if(!bfound){
						guild.createChannel(args[2],'text');
						console.log('created!');
						message.channel.sendMessage("Channel created!");
					}else{
						console.log('exist!');
						message.channel.sendMessage("Channel exist!");
					}
					bfound = null;
				}
			});

		}
	}
};
