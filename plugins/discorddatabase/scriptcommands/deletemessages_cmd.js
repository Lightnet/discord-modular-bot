/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var config = require('../config.json');
var plugin = require("../../../app/libs/plugin.js");

module.exports.commandline = "deletemessages";

module.exports.scriptparams = "deletemessages <amount> (limited 100)";

module.exports.executescript = function(message,args){
	var count = 0;
	var options = {};
	count = parseInt(args[2]) || 0;
	if(count < 101){
		if(count != 0){
			options = {limit: count};
		}
		message.channel.fetchMessages(options)
			.then(messages =>{
				console.log(messages);
				messages.deleteAll();
			});
	}
	options =null;
	count = null;
};
