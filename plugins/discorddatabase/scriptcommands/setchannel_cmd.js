/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

var fs = require('fs');
var configpath = __dirname + '/../config.json';
var config = require('../config.json');
var plugin = require("../../../app/libs/plugin.js");

module.exports.commandline = "setchannel";

module.exports.scriptparams = "setchannel <name>";

module.exports.executescript = function(message,args){
	//console.log("data?");
	//db getchannel
	var discordbot = plugin.getdiscordclient();
	//console.log(discordbot);
	if(discordbot !=null){
		//if id key is not assign serach for guild and channel text name
		if(config.databaseguildid != ""){
			//var _name1 = args[2];
			discordbot.guilds.forEach(function (guild) {
		    	//console.log("id:"+guild.id);
				console.log("name:"+guild.name);
				//console.log(guild.id + ":" + config.databaseguildid);
				if(guild.id == config.databaseguildid){
					console.log("found?");
					var bfound = false;
					var name = "";
					guild.channels.forEach(function (channel) {
						//console.log("channel:"+channel.name);
						//console.log(channel.name.search(args[2]));
						//var _name2 = channel.name;
						if(channel.name == args[2]){
							name = channel.name;
							bfound = true;
							config.databasechannelid = channel.id;
							config.databasechannelname = channel.name;
							//console.log("found!!");
							fs.writeFile(configpath, JSON.stringify(config, null, 4), function(err) {
								if(err) {
								  console.log(err);
								} else {
								  console.log("JSON saved to " + configpath);
								}
							});
						}
					});

					if(bfound){
						message.channel.sendMessage(name);
					}else {
						message.channel.sendMessage("Does not exist or error?");
					}
					bfound = null;
					name= null;
				}
			});
		}
	}
};
