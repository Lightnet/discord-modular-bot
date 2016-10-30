/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var plugin = require("../../../app/libs/plugin.js");

var database = plugin.getDatabase();

var Model = database.Model;
var Player = Model.extend({
    collection: 'player'
});

var Character = Model.extend({
    collection: 'character'
});

module.exports.commandline = "inventory";

module.exports.scriptparams = "inventory";

module.exports.executescript = function(message,args){
	//console.log(message);
	run(function*() {
		message.channel.sendMessage("inventory!");
		let players = yield Player.where('id', message.author.id).find();
		//console.log(players.length);
		if(players.length == 1){

		}
		players = null;
	});
};
