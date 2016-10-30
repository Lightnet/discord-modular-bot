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

var _player = {
	id:'',
	username:'',
	bot:'',
	status:'',
	inbattle:false,
	battleid:'',
	location:'',
	x:0,
	y:0,
	z:0,
	ispvp:false,
	access:'base',
	ban:false
}

var Character = Model.extend({
    collection: 'character'
});

var _character = {
	battleid:'',
	chartype:'npc',//player,npc,creature,monster
	charalignment:'neutral',
	isdead:false,
	id:'',
	name:'',
	location:'',
	x:0,
	y:0,
	z:0,
	health:100,
	maxhealth:100,
	magic:100,
	maxmagic:100,
	level:0,
	experience:0,
	maxexperience:10,
	str:1,
	vit:1,
	dex:1,
	spd:1,
	int:1,
	luck:0,
	attack:5,
	defense:0,
	magicattack:0,
	magicdefence:0,
}


module.exports.commandline = "stats";

module.exports.scriptparams = "stats";

module.exports.executescript = function(message,args){
	//message.channel.sendMessage("stats found!");
	console.log(message);
	run(function*() {
		//console.log('query?');
		let players = yield Player.where('id', message.author.id).find();
		//console.log(players);
		//console.log(players.length);
		if(players.length == 0){
			console.log(_player);
			//var _p = _player.slice(0);
			var _p = JSON.parse(JSON.stringify(_player));
			_p.id=message.author.id,
			_p.username=message.author.username,
			_p.bot=message.author.bot,
			_p.status=message.author.status
			let player = new Player(_p);
			yield player.save();
			_p = null;

			var _c = JSON.parse(JSON.stringify(_character));
			_c.id = message.author.id;
			_c.name = message.author.username;
			_c.chartype = 'player';

			let character = new Character(_c);
			yield character.save();

			//console.log("created!");
			message.channel.sendMessage("created stats");
		}else{
			console.log(players[0].attributes);
			message.channel.sendMessage("stats found!");
		}
		players = null;
	});
};
