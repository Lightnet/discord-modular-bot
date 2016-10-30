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
	id:'',
	name:'',
	health:10,
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

module.exports.commandline = "battle";

module.exports.scriptparams = "battle";

function OpponentAttackDefense(currentattack,currentdefense){
	var attack = 0;
	console.log(typeof currentdefense.get('defense'));
	if(currentdefense.get('defense') == 0){
		attack = currentattack.get('attack')
	}else if(currentdefense.get('defense') < currentattack.get('attack')){
		attack = currentattack.get('attack') - currentdefense.get('defense');
	}else if(currentdefense.get('defense') >= currentattack.get('attack')){
		attack = 1;
	}
	console.log("attack:" + attack);
	return attack;
}

module.exports.executescript = function(message,args){
	//message.channel.sendMessage("stats found!");
	//console.log(message);
	console.log("battle?");
	run(function*() {
		console.log('query?');
		let players = yield Player.where('id', message.author.id).find();
		console.log("players:"+players.length);
		if(players.length == 1){
			console.log('found battle!');
			var battleid = players[0].get('battleid');
			let characters = yield Character.where('id', message.author.id).find();
			//console.log(battleid.length);
			console.log("battleid:"+battleid);
			if(battleid.length == 0){
				console.log("no battleid");
				console.log("creating battle");

				if(characters[0].get('health') != 0){
					//generate battle id
					var rbattleid = Math.random()*100000000000000;
					//create battle id
					characters[0].set('battleid',rbattleid);
					yield characters[0].save();
					players[0].set('battleid',rbattleid);
					yield players[0].save();
					//create creature
					_cc = JSON.parse(JSON.stringify(_character));
					_cc.battleid = rbattleid;
					_cc.name = "monster";
					_cc.defense = 5;
					let _cd = new Character(_cc);
					yield _cd.save();
					message.channel.sendMessage("Encoutner Found!");
				}else{
					message.channel.sendMessage("Current Death!");
				}
			}else{
				console.log("battle!");
				//message.channel.sendMessage("battling!");
				let characters = yield Character.where('battleid', battleid).find();
				//console.log(characters);
				var currentplayer;
				var currentenemy;
				var currentenemy_name;
				console.log(characters.length);
				//there are two currently in battle id
				characters.forEach(function(character){
					if(character.get('id') == players[0].get('id')){
						currentplayer = character;
					}else{
						currentenemy = character;
					}
				});
				console.log(currentplayer);
				console.log(currentenemy);
				var attack = 0;
				attack = OpponentAttackDefense(currentplayer,currentenemy);
				//var attack = currentenemy.get('defence') - currentplayer.get('attack');
				//console.log(attack);
				var enemy_healthremain = currentenemy.get('health') - attack;

				//check enemy health
				if(enemy_healthremain <= 0){
					currentenemy_name = currentenemy.get('name');
					console.log(currentenemy);
					yield currentenemy.remove();
					var player_exp = currentplayer.get('experience') + 1;
					currentplayer.set('experience',player_exp);
					currentplayer.set('battleid',"");
					yield currentplayer.save();
					players[0].set('battleid',"");
					yield players[0].save();
					currentenemy = null;
					enemy_healthremain = 0;
				}else{
					currentenemy.set('health',enemy_healthremain);
					yield currentenemy.save();
				}
				var player_healthremain = currentplayer.get('health');
				//check if enemny health is above 0 health
				if(enemy_healthremain > 0){
					player_healthremain -= attack;
					if(currentenemy !=null){
						attack = OpponentAttackDefense(currentenemy,currentplayer);
						if(player_healthremain <= 0){
							//set health to zero
							player_healthremain = 0;
							//delete character from database
							yield currentenemy.remove();
							//set battle field to none
							currentplayer.set('battleid',"");
							players[0].set('battleid',"");
						}
						currentplayer.set('health',player_healthremain);
					}
					yield players[0].save();
					yield currentplayer.save();
				}
				var _textmessage = "";

				_textmessage += "[Battle result]\n";
				if(player_healthremain == 0){
					_textmessage += "Player:[Defeated]\n";
				}else{
					_textmessage += "Player:["+player_healthremain+"/"+ currentplayer.get('maxhealth')+"]\n";
				}
				if(currentenemy !=null){
					_textmessage +=  currentenemy.get('name') + ":["+enemy_healthremain+"/"+ currentenemy.get('maxhealth')+"]\n";
				}else{
					_textmessage +=  currentenemy_name + "[Defeated]";
				}

				message.channel.sendMessage(_textmessage);
				currentenemy = null;
				enemy_healthremain = null;
				currentenemy_name = null;
				currentplayer = null;
				player_healthremain = null;
				attack = null;
			}
		}

	});
};
