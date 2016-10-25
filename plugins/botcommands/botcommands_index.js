/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var path = require("path");
var fs = require('fs');
//http://voidcanvas.com/get-working-directory-name-and-file-name-in-node/
//console.log("./ = %s", path.resolve("./"));
var init = function () {
    //console.log("chat bot init...");
};
module.exports.init = init;
function StringCommandProcessCheck(_message, callback) {
    console.log(_message.search('#!'));
    if (_message.search('#!') == 0) {
        console.log("found #!");
        var discordbot = plugin.getdiscordclient();
        var configbot = plugin.getConfig();
        if (discordbot != null) {
            discordbot.sendMessage({
                to: configbot.current.channelid,
                message: "echo found!"
            });
        }
    }
    callback(null);
}
var plugin = require("../../app/libs/plugin.js");
var message = function (_bot, _user, _userID, _channelID, _message, _rawEvent, _callback) {
    console.log("discord message...");
    if (plugin.getChanelID() == _channelID) {
        StringCommandProcessCheck(_message, function (textstring) {
            //console.log("finish process...");
            //console.log(textstring);
            var ioserver = plugin.getSocketIO();
            if (ioserver != null && textstring != null) {
                console.log(_bot);
                console.log("============");
                //console.log("send all message!");
                ioserver.emit('chat message', { msg: _user + ":" + textstring });
            }
        });
        _callback(null);
    }
};
module.exports.message = message;
//===============================================
// Socket.io
//===============================================
module.exports.socket_connect = function (_io, _socket, _db) {
    console.log("socket message...");
    //_socket.on('chat message', function (data) {
    //console.log('data');
    //console.log(data);
    /*
    if(data.msg !=null){
            //console.log(data.msg);
            var discordbot = plugin.getdiscordclient();
            var configbot = plugin.getConfig();
            if(discordbot !=null){
                discordbot.sendMessage({
                    to: configbot.current.channelid,
                    message: data.msg
                });
            }
    }
    */
    //});
};
