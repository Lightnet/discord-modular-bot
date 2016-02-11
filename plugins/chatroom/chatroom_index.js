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


//===============================================
// Socket.io
//===============================================

var Server = {
    id:"",
    name:"",
    members:[],
    channels:[],
}


function GetClientSendData(discordbot, client){
    client.emit("server",{action:"clearserver"});
    for(server in discordbot.servers){//list the server
        console.log(discordbot.servers[server]);
        Server.id = discordbot.servers[server].id;
        Server.name = discordbot.servers[server].name;

        console.log(Server);
        Server.members = [];//clear members

      var members = discordbot.servers[server].members; //get memebers
      for(member in members){//id objec
          Server.members.push({
              id:discordbot.servers[server].members[member].user.id,
              name:discordbot.servers[server].members[member].user.username,
              avatar:discordbot.servers[server].members[member].user.avatar,
              status:discordbot.servers[server].members[member].status || "offline"
          });
        //var _memberobj = new MemberDataModel(member, members[member].user.username, members[member]);
        //_serverobj.members.push(_memberobj); //add memeber to the server
      }

      Server.channels = [];//clear channels
      var channels = discordbot.servers[server].channels;//get channels
      for(channel in channels){//id objec
          Server.channels.push({
              id:discordbot.servers[server].channels[channel].id,
              name:discordbot.servers[server].channels[channel].name,
              type:discordbot.servers[server].channels[channel].type,
          });
        //check if channel to match with current room
        //if((discordbot.servers[server].name == config.current.servername) && (channels[channel].name == config.current.channelname)){
          //config.current.serverid = discordbot.servers[server].id; //assign current account id
          //config.current.channelid = channels[channel].id; //assign current account id
        //}
      }

      client.emit("server",{action:"add",data:Server});
    }

}

module.exports.socket_connect = function(_io, _socket,_db){
    console.log("socket...");

  _socket.on('getdiscordclient', function (data) {
    console.log("client data");
    var disordclient  = plugin.getdiscordclient();
    console.log(disordclient);
    if(disordclient !=null){
        GetClientSendData(disordclient, _socket);
    }
    //console.log('data');
    //console.log(data);
  });
};














//===============================================
//
//===============================================
