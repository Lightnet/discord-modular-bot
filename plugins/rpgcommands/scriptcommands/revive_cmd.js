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

module.exports.commandline = "revive";

module.exports.scriptparams = "revive";

module.exports.executescript = function(message,args){
	//console.log(message);
	run(function*() {
		let players = yield Player.where('id', message.author.id).find();
		//console.log(players.length);
		if(players.length == 1){
			var done = false;
			let characters = yield Character.where('id', message.author.id).find();
			//console.log(characters.length);
			if(characters[0].get('health') <= 0){
				characters.forEach(function(character){
					//console.log("character????");
					var health = character.get('maxhealth');
					//console.log(health);
					character.set('health', health);
					character.save();
				});
				message.channel.sendMessage("You been revive!");
			}else{
				message.channel.sendMessage("You are alive!");
			}
		}
		players = null;
	});

};
