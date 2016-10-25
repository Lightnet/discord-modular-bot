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
var init = function () {
    //console.log("chat bot init...");
};
module.exports.init = init;
//process.chdir("./");
//console.log(process.cwd());
//console.log(process.execPath);
//console.log(process.chdir());
//console.log(__dirname);
var chatpatterns = require("./pattern.json");
//console.log(chatpatterns);
//var p;
//for (p in chatpatterns){
//console.log(p);
//}
//var data = JSON.stringify(chatpatterns,null,4);
/*
fs.writeFile(__dirname + '/test.json', data, function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
    }
    console.log('Configuration saved successfully.')
 });
*/
/*
var chatpatterns = [
  {q:"test",a:"tested"},
  {q:"test",a:"tested"},
  {q:"Test",a:"testme"}
];
*/
function ProcessText(_message, callback) {
    var bfound = false;
    //console.log("process text...");
    for (var i = 0; i < chatpatterns.length; i++) {
        if (chatpatterns[i].q == _message) {
            //console.log("found");
            //console.log(chatpattern[i].a);
            bfound = true;
            callback(chatpatterns[i].a);
            break;
        }
    }
    if (!bfound) {
        //console.log("not found!");
        callback(null);
    }
}
var message = function (_message, _callback) {
    console.log("discord message...");
    /*
    if(plugin.getChanelID() == _channelID){
        ProcessText(_message,function(textstring){
            //console.log("finish process...");
            console.log(textstring);
            var ioserver = plugin.getSocketIO();
            if(ioserver !=null){
                console.log(_bot);
                console.log("============");
                //console.log("send all message!");
                ioserver.emit('chat message',{msg: _user + ":" + textstring});
            }
        });
        _callback(null);
    }
    */
};
module.exports.message = message;
//===============================================
// Socket.io
//===============================================
module.exports.socket_connect = function (_io, _socket, _db) {
    console.log("socket message...");
    //_socket.on('message', function (data) {
    //});
};
