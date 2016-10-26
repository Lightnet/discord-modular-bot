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
var commands = [];
var botcommand = function (_line, _callback) {
    this.commandline = _line;
    this.callback = _callback;
};
var init = function () {
    //console.log("chat bot init...");
    var helpcommand = new botcommand("help", function (message, args) {
        message.channel.sendMessage("help found!");
    });
    commands.push(helpcommand);
    var statscommand = new botcommand("stats", function (message, args) {
        message.channel.sendMessage("stats found!");
    });
    commands.push(statscommand);
};
module.exports.init = init;
function StringCommandProcessCheck(_message, callback) {
    //console.log(_message.content.search('/!'));
    //console.log(_message);
    if (_message.content.search('/!') == 0) {
        //console.log("found #!");
        //get message then used channel function to send message
        //_message.channel.sendMessage("echo found!");
        var args = _message.content.split(" ");
        for (var i = 0; i < commands.length; i++) {
            console.log(commands[i].commandline);
            if (commands[i].commandline == args[1]) {
                commands[i].callback(_message, args);
            }
        }
        args = null;
    }
    callback(null);
}
//plugin for discord message callback
//need to work on the filter messages channels
var message = function (_message, _callback) {
    console.log("discord message...");
    if (plugin.getChanelID() == _message.channel.id) {
        StringCommandProcessCheck(_message, function (textstring) {
            //console.log("finish process...");
            //console.log(textstring);
        });
        _callback(null);
    }
};
module.exports.message = message;
//===============================================
// Socket.io
//===============================================
module.exports.socket_connect = function (_io, _socket, _db) {
    //console.log("socket message...");
};
