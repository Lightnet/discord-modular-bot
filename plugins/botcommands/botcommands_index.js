var express = require('express');
var path = require("path");
var fs = require('fs');
var plugin = require("../../app/libs/plugin.js");
var commands = [];
//var botcommand = function(_line,_callback){
//this.commandline = _line;
//this.executescript = _callback;
//}
var model_files = fs.readdirSync(__dirname + "/scriptcommands");
console.log("loading scriptcommands");
model_files.forEach(function (modelFile) {
    if (path.extname(modelFile) == '.js') {
        console.log('File model: ' + modelFile);
        var _commandscript = require(__dirname + "/scriptcommands/" + modelFile);
        console.log(_commandscript);
        //console.log(command);
        //console.log(typeof commandscript.commandline);
        if ((typeof _commandscript.executescript === 'function') && (typeof _commandscript.commandline === 'string')) {
            console.log('adding command list array');
            commands.push(_commandscript);
        }
    }
});
var init = function () {
    //console.log(global.run);
    //console.log(global.mongorito);
    //console.log("chat bot init...");
    //var helpcommand = new botcommand("help",function(message,args){
    //message.channel.sendMessage("help found!");
    //});
    //commands.push(helpcommand);
    //var statscommand = new botcommand("stats",function(message,args){
    //message.channel.sendMessage("stats found!");
    //});
    //commands.push(statscommand);
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
            //console.log(commands[i].commandline);
            if (commands[i].commandline == args[1]) {
                commands[i].executescript(_message, args);
            }
        }
        args = null;
    }
    callback(null);
}
//===============================================
// route
//===============================================
module.exports.setroute = function (routes, app) {
    //console.log('route module');
    //add current dir plugin public folder
    app.use(express.static(__dirname + '/public'));
    //console.log(__dirname);
    //app.set('views', path.join(__dirname,'/views'));//do not used it will override views
    if (plugin != null) {
        //add current dir plugin views folder
        plugin.addAppView(app, path.join(__dirname, '/views'));
    }
    routes.get('/botcommands', function (req, res) {
        res.render('botcommands', {}); //render file .ejs
        //res.contentType('text/html');
        //res.send('Hello World!');
        //res.render('test',{});
    });
};
//plugin for discord message callback
//need to work on the filter messages channels
var message = function (_message, _callback) {
    //console.log("discord message...");
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
module.exports.socket_connect = function (_io, _socket) {
    //console.log("socket message...");
};
