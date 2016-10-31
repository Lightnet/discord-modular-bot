/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var config = require('../config.json');
var plugin = require("../../../app/libs/plugin.js");

module.exports.commandline = "deletechannel";

module.exports.scriptparams = "deletechannel <name>";

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
					//var channeltext = "Channels:\n";
					guild.channels.forEach(function (channel) {
						if(channel.name.valueOf() ==  args[2].valueOf()){
							bfound = true;
							//console.log(channel);
							channel.delete();
						}
					});
					if(!bfound){
						console.log('Does not exist!');
					}else{
						console.log('Delete!');
					}
					bfound =null;
					//message.channel.sendMessage(channeltext);
					//channeltext =null;
				}
			});
		}
	}
};
