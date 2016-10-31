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
				console.log(guild.id + ":" + config.databaseguildid);
				if(guild.id == config.databaseguildid){
					console.log(guild);
					var bfound = false;
					//var channeltext = "Channels:\n";
					guild.channels.forEach(function (channel) {
						console.log(channel.name + ":" + args[2]);
						var _string = args[2];
						//console.log(typeof args[2]);
						//console.log(typeof channel.name);
						console.log(channel.name.match(args[2]));
						if(channel.name.valueOf() ==  args[2].valueOf()){
							bfound = true;
						}
						//console.log("id:"+channel.id);
						//console.log("username:"+channel.name);
						//console.log("status:"+channel.type);
						//channeltext += channel.name + "\n";
					});
					if(!bfound){
						guild.createChannel(args[2],'text');
						console.log('created!');
					}else{
						console.log('exist!');
					}
					//message.channel.sendMessage(channeltext);
					//channeltext =null;
				}
			});
		}

	}
};
