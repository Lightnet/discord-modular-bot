/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/




//var init = function(){
//}
//module.exports.init = init;

var plugin = require("../../app/libs/plugin.js");

//var message = function(_message, _callback){
//};
//module.exports.message = message;

//===============================================
// route
//===============================================
module.exports.setroute = function(routes, app){
	//console.log('route module');
	//add current dir plugin public folder
	app.use(express.static(__dirname + '/public'));
	//console.log(__dirname);
	//app.set('views', path.join(__dirname,'/views'));//do not used it will override views
};

//===============================================
// Socket.io
//===============================================
//module.exports.socket_connect = function(_io, _socket){
    //console.log("socket message...");
//};
//===============================================
//
//===============================================
