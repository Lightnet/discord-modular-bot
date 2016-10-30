/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

declare var global:any;

var express = require('express');
var path = require("path");
var fs = require('fs');
var plugin = require("../../app/libs/plugin.js");
var config = require('./config.json');
var commands = [];
var commandlist = [];

var model_files = fs.readdirSync(__dirname + "/scriptcommands");
//console.log("loading scriptcommands");
model_files.forEach(function (modelFile) {
    if (path.extname(modelFile) == '.js') {
        //console.log('File model: ' + modelFile);
        var _commandscript = require(__dirname + "/scriptcommands/" + modelFile);
		//console.log(_commandscript);
		//console.log(typeof commandscript.commandline);
		if((typeof _commandscript.executescript === 'function')&&(typeof _commandscript.commandline === 'string')){
			//console.log('adding command list array');
			commands.push(_commandscript);
			if(typeof _commandscript.commandline === 'string'){
				commandlist.push(_commandscript.scriptparams);
			}
		}
    }
});

var helpcommand = {
	commandline:'help',
	scriptparams:'help',
	executescript:function(message,args){
		console.log(message);
		console.log(commandlist);
		var _textmessage = '';
		_textmessage += 'RPG Text Basics:\n`help commands:\n';
		for(var i = 0; i < commandlist.length;i++){
			_textmessage += config.promptcommand + ' ' + commandlist[i] + '\n';
		}
		_textmessage += '`';
		//_textmessage += 'End commands`';
		message.channel.sendMessage(_textmessage);
	}
}
commands.push(helpcommand);

var init = function(){};
module.exports.init = init;

function StringCommandProcessCheck(_message,callback){
	//console.log(_message.content.search('/!'));
	//console.log(_message);
	if(_message.content.search(config.promptcommand) == 0){//first index only in text line lenght
		console.log(config.promptcommand);
		//get message then used channel function to send message
		//_message.channel.sendMessage("echo found!");
		var args = _message.content.split(" ");
		for(var i = 0; i < commands.length;i++){
			//console.log(commands[i].commandline);
			if(commands[i].commandline == args[1]){
				commands[i].executescript(_message,args);
			}
		}
		args = null;
	}
	callback(null);
}
//===============================================
// route
//===============================================
module.exports.setroute = function(routes, app){
	//add current dir plugin public folder
	app.use(express.static(__dirname + '/public'));
	//console.log(__dirname);
	if(plugin !=null){
		//add current dir plugin views folder
		plugin.addAppView(app, path.join(__dirname,'/views'));
	}
	routes.get('/discorddatabase', function (req, res) {
		res.render('discorddatabase',{}); //render file .ejs
	});
};

//plugin for discord message callback
//need to work on the filter messages channels
var message = function(_message, _callback){
    //console.log("discord message...");
	//if(plugin.getChanelID() == _message.channel.id){//only channel id or name to filter just for the reponse
		StringCommandProcessCheck(_message, function(textstring){
            //console.log("finish process...");
            //console.log(textstring);
        });
        _callback(null);
	//}
}
module.exports.message = message;

//===============================================
// Socket.io
//===============================================
//module.exports.socket_connect = function(_io, _socket){
	//console.log("socket message...");
//};
