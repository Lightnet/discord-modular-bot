/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
//console.log("chat script");

var init = function(){
  //console.log("chat room init...");
}
module.exports.init = init;

var plugin = require("../../app/libs/plugin.js");
//console.log(plugin);

var message = function(_message, _callback){
    //console.log("discord message");
    //console.log("getChanelID"+plugin.getChanelID() + ":" + _channelID);
	//console.log(plugin.getChanelID());
	//console.log(_message.channel.id);
	//console.log(_message);
	//check if chanel match with chat message current set
	if(plugin.getChanelID() == _message.channel.id){
		//console.log("found!");
		var ioserver = plugin.getSocketIO();
		ioserver.emit('message',{msg: _message.author.username + ": " + _message.content});
	}
};
module.exports.message = message;

//===============================================
// Socket.io
//===============================================
var Server = {
    id:"",
    name:"",
    members:[],
    channels:[],
}

//create guild(server) list with members and channels
function GetGuildList(discordbot, client){
	discordbot.guilds.forEach(function (guild) {
    	//console.log("id:"+guild.id);
		//console.log("name:"+guild.name);
		Server.id = guild.id;
        Server.name = guild.name;
		Server.members = [];//clear members
		guild.members.forEach(function (member) {
			//console.log("id:"+member.user.id);
			//console.log("username:"+member.user.username);
			//console.log("status:"+member.user.status);
			//console.log("bot:"+member.user.bot);
			Server.members.push({
                id:member.user.id,
                name:member.user.username,
                avatar:member.user.avatar,
                status:member.user.status || "offline",
				bot:member.user.bot
            });
		});
		Server.channels = [];//clear members
		guild.channels.forEach(function (channel) {
			//console.log("id:"+channel.id);
			//console.log("username:"+channel.name);
			//console.log("status:"+channel.type);
			//console.log("bot:"+channel.user.bot);
			Server.channels.push({
				id:channel.id,
				name:channel.name,
				type:channel.type,
			});
		});
		client.emit("server",{action:"addguild",data:Server});
	});
}

module.exports.socket_connect = function(_io, _socket,_db){
    //console.log("socket message...");
	_socket.on('message', function (data) {
	    //console.log('data');
	    //console.log(data);
	    if(data.msg !=null){
			//console.log("message:"+data.msg);
            var discordbot = plugin.getdiscordclient();
            var configbot = plugin.getConfig();
			//console.log(discordbot);
            if(discordbot !=null){
				//console.log(discordbot);
				discordbot.guilds.forEach(function (guild) {
					if(guild.name == configbot.current.servername){
						guild.channels.forEach(function (channel) {
							//console.log("channel message?");
							//need to rework this
							if(channel.name == configbot.current.channelname){
								channel.sendMessage(data.msg);
							}
						});
					}
				});
            }
    	}
	});

  	_socket.on('getguildlist', function (data) {
    	//console.log("getguildlist");
    	var disordclient  = plugin.getdiscordclient();
    	//console.log(disordclient);
    	if(disordclient !=null){
			//clear list
		    _socket.emit("server",{action:"cleanguilds"});
			//get list
        	GetGuildList(disordclient, _socket);
    	}
    	//console.log('data');
    	//console.log(data);
  	});
};

//===============================================
//
//===============================================
