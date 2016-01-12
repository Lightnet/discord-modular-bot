/*
    Project Name: Discordapp Tool Bot
    Link:https://bitbucket.org/Lightnet/discordapptoolbot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var init = function () {
    //console.log("chat bot init...");
};
module.exports.init = init;
var chatpattern = [
    { q: "test", a: "tested" },
    { q: "test", a: "tested" }
];
function ProcessText(_message, callback) {
    var bfound = false;
    console.log("process text...");
    for (var i = 0; i < chatpattern.length; i++) {
        if (chatpattern[i].q == _message) {
            console.log("found");
            console.log(chatpattern[i].a);
            bfound = true;
            callback(chatpattern[i].a);
            break;
        }
    }
    if (!bfound) {
        console.log("not found!");
        callback(null);
    }
}
var plugin = require("../../app/libs/plugin.js");
var message = function (_bot, _user, _userID, _channelID, _message, _rawEvent, _callback) {
    //console.log("message...");
    if (plugin.getChanelID() == _channelID) {
        //console.log("current channel..");
        //console.log("_rawEvent:"+_rawEvent);
        //console.log(_rawEvent);
        //var _text = _user + ": " + _message;
        console.log(_message);
        ProcessText(_message, function (_text) {
            if(_text !=null){
                console.log(_text);
                _callback(_text);
            }else{
                _callback(null);
            }
        });

    }
};
module.exports.message = message;
