/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var config = require('../config.json');
var plugin = require("../../../app/libs/plugin.js");

module.exports.commandline = "gms";

module.exports.scriptparams = "gms <amount>";

module.exports.executescript = function(message,args){
	//console.log("data?");
	message.channel.fetchMessages()
		.then(messages =>{
			console.log(messages);
		});
};
