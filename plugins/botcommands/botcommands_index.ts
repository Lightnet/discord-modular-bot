/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

var path = require("path");
var fs = require('fs');
var plugin = require("../../app/libs/plugin.js");
//http://voidcanvas.com/get-working-directory-name-and-file-name-in-node/
//console.log("./ = %s", path.resolve("./"));
var init = function(){
  //console.log("chat bot init...");
}
module.exports.init = init;

function StringCommandProcessCheck(_message,callback){
	console.log(_message.content.search('#!'));
	console.log(_message);
	if(_message.content.search('#!') == 0){
		console.log("found #!");
		//get message then used channel function to send message
		_message.channel.sendMessage("echo found!");
	}
	callback(null);
}

//plugin for discord message callback
var message = function(_message, _callback){
    console.log("discord message...");
	if(plugin.getChanelID() == _message.channel.id){
		StringCommandProcessCheck(_message, function(textstring){
            //console.log("finish process...");
            //console.log(textstring);
        });
        _callback(null);
	}
}
module.exports.message = message;

//===============================================
// Socket.io
//===============================================
module.exports.socket_connect = function(_io, _socket,_db){
	//console.log("socket message...");
};
