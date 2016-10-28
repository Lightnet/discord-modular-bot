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

module.exports.commandline = "stats";

module.exports.executescript = function(message,args){
	//message.channel.sendMessage("stats found!");
	console.log(message);
	run(function*() {
		//console.log('query?');
		let players = yield Player.where('id', message.author.id).find();
		//console.log(players);
		//console.log(players.length);
		if(players.length == 0){
			let player = new Player({
				id:message.author.id,
				username:message.author.username,
				bot:message.author.bot,
				status:message.author.status
			});

			yield player.save();
			//console.log("created!");
			message.channel.sendMessage("created stats");
		}else{
			message.channel.sendMessage("stats found!");
		}
		players = null;
	});
};
