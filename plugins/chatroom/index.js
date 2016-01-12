/*
    Project Name: Discordapp Tool Bot
    Link:https://bitbucket.org/Lightnet/discordapptoolbot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
//console.log("chat script");

var init = function(){
  //console.log("chat bot init...");
}
module.exports.init = init;

var plugin = require("../../app/libs/plugin.js");
//console.log(plugin);

var message = function(_bot,_user,_userID, _channelID, _message, _rawEvent, _callback){
    //console.log("chat room");
    //console.log("getChanelID"+plugin.getChanelID() + ":" + _channelID);
    if(plugin.getChanelID() == _channelID){
        //console.log("current channel..");
        //console.log("_rawEvent:"+_rawEvent);
        //console.log(_rawEvent);
        var _text = _user + ": " + _message;
        _callback(_text);
    }
    //console.log("message...");
}
module.exports.message = message;
