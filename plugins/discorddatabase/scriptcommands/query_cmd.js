/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var fs = require('fs');
var configpath = __dirname + '/../config.json';
//console.log(configpath);
var config = require('../config.json');

//client, message from listen, channel seearch from client
function findall(discordbot, message, channel, args){
	channel.fetchMessages().then(messages =>{
		//console.log(messages.size);
		//console.log(messages);
		//need to convert to json some how?
		messages.forEach(function(mg){
			console.log(mg);
		});
	});
};
//delete is part of the nodejs so it name is used
function remove(discordbot, message, channel, args){
	channel.fetchMessages().then(messages =>{
		//console.log(messages.size);
		//console.log(messages);
		//db query delete {"test":"testme"}
		var index = message.content.search('delete');
		var _message = message.content.substr(index+7,message.content.length);
		var _objm = JSON.parse(_message);
		//console.log(_message);
		console.log(_objm);
		var objvalue;
		var objvar;
		for(value in _objm){
			console.log("value:"+value + ":" + _objm[value]);
			objvalue = value;
			objvar = _objm[value];
		}
		//console.log(Object);

		//need to convert to json some how?
		messages.forEach(function(mg){
			//console.log(mg.content);
			console.log(mg);
			var _obj = JSON.parse(mg.content);
			//console.log(_obj);
			try{
				if(_obj[objvalue] !=null){
					if(_obj[objvalue] == objvar){
						console.log("found!");
						mg.delete();
					}
				}
			}catch(e){
				console.log('ERROR object Value');
			}
		});
		objvalue = null;
		objvar = null;
		index = null;
		_message = null;
		_objm = null;
		_obj = null;
	});
};

//need to fixed filter and args
function insert(discordbot, message, channel, args){
	//db query insert {"test": "testme"}
	console.log(message);
	console.log(channel);
	var index = message.content.search('insert');
	console.log(index);
	var _string = message.content.substr(index+7,message.content.length);
	console.log("|"+_string);

	channel.sendMessage(_string);
};


module.exports.commandline = "query";

module.exports.scriptparams = "query <collection name> {}";

module.exports.executescript = function(message,args){
	//console.log("data?");
	//console.log(message);
	var discordbot = plugin.getdiscordclient();
	//console.log(discordbot);
	if(discordbot !=null){
		//if id key is not assign serach for guild and channel text name
		if((config.databaseguildid == "")|| (config.databasechannelid == "")){
			discordbot.guilds.forEach(function (guild) {
		    	//console.log("id:"+guild.id);
				//console.log("name:"+guild.name);
				guild.channels.forEach(function (channel) {
					//console.log("id:"+channel.id);
					//console.log("username:"+channel.name);
					//console.log("status:"+channel.type);
					if((config.databaseguildname == guild.name)&&(config.databasechannelname == channel.name)){
						config.databaseguildid = guild.id;
						config.databasechannelid = channel.id;
						fs.writeFile(configpath, JSON.stringify(config, null, 4), function(err) {
							if(err) {
							  console.log(err);
							} else {
							  console.log("JSON saved to " + configpath);
							}
						});
					}
				});
			});
		}else{//console.log('other?');
			//channel check
			console.log(args);
			if(config.databasechannelid != ""){
				var channel = discordbot.channels.get(config.databasechannelid);
				if(channel !=null){
					//console.log("found!");
					//console.log(channel);
					if(args[2] != null){
						if(args[2] == "findall"){
							findall(discordbot,message,channel,args);
						}
						if(args[2] == "insert"){
							insert(discordbot,message,channel,args);
						}
						if(args[2] == "delete"){
							remove(discordbot,message,channel,args);
						}
					}
				}
			}
		}
	}
	discordbot = null;
};
