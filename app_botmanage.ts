/*
    Project Name: Discordapp Tool Bot
    Link:https://bitbucket.org/Lightnet/discordapptoolbot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

/// <reference path="./DefinitelyTyped/node/node.d.ts" />
/// <reference path="./app/libs/plugin.ts" />

declare var config: any;
declare var i: any;
declare var server: any;
declare var ServerDataModel: any;
declare var MemberDataModel: any;
declare var member: any;
declare var ChannelDataModel: any;
declare var channel: any;
declare var serverlist: any;
//declare var AddChatMessage: any;

var fs = require('fs');
var path = require('path');
config = require('./app/config.json');
var plugin = require('./app/libs/plugin.js');
//console.log(config.current);
plugin.setConfig(config);
var scdata = [{servername:"Light",serverid:"",channelname:"bot",channelid:""}];
var DiscordClient = require('discord.io'); //discordapp client
var bot; //


if(typeof __dirname == 'undefined'){
  __dirname = ".";
}
//load models
console.log("sync models");
var model_files = fs.readdirSync(__dirname + "/app/models");
model_files.forEach(function (modelFile) {
    if (path.extname(modelFile) == '.js') {
        console.log('loading model: ' + modelFile);
        require(__dirname + "/app/models/" + modelFile);
    }
});
console.log("sync plugins");
//var plugins = [];
var plugin_files = fs.readdirSync(__dirname + "/plugins");
plugin_files.forEach(function (modelFile) {
    //console.log("plugin:"+modelFile);
    var package_filepath = __dirname + "/plugins/" + modelFile + "/"; //file path
    var package_filename = package_filepath + "package.json"; //pacakge congfig
    try {
      //fs.accessSync(package_filename, fs.F_OK);
      fs.accessSync(package_filename, fs.F_OK);
      var package_config = require(package_filename);//config script
      var package_main = package_filepath + package_config.main;//main script
      try {
        fs.accessSync(package_main, fs.F_OK);
        var packagescript  = require(package_main);
        //add plugin list
        plugin.addModule(packagescript);
      } catch (e) {
        // It isn't accessible
        console.log(package_main);
        console.log("Plugin no main file js!" + modelFile);
        console.log(e);
      }
    } catch (e) {
      // It isn't accessible
      console.log(package_filename);
      console.log("Plugin no file package!" + modelFile);
      console.log(e);
    }

    //plugins.push(packagescript);
    //console.log(plugins.length);
    //console.log(package_config);
});

//===============================================
// Bot Start
//===============================================

bot = new DiscordClient({
    autorun: true,
    email: config.email,
	  password: config.password
});

//init setup
bot.on('ready', function() {
    plugin.AssignInit(); //init plugin module function.

    console.log(bot);
    console.log("ID:");
    console.log(bot.username + " - (" + bot.id + ")");
    console.log(bot.servers);
    for(server in bot.servers){
      var _serverobj = new ServerDataModel(server,bot.servers[server].name);
      var members = bot.servers[server].members; //get memebers
      for(member in members){//id objec
        var _memberobj = new MemberDataModel(member, members[member].user.username, members[member]);
        _serverobj.members.push(_memberobj); //add memeber to the server
      }

      var channels = bot.servers[server].channels;//get channels
      for(channel in channels){//id objec
        var _channelobj = new ChannelDataModel(channel, channels[channel].name, channels[channel]);
        _serverobj.channels.push(_channelobj);//add channel
        //check if channel to match with current room
        if((bot.servers[server].name == scdata[0].servername) &&(channels[channel].name == scdata[0].channelname)){
          config.current.serverid = bot.servers[server].id; //assign current account id
          config.current.channelid = channels[channel].id; //assign current account id
        }
      }
      //add server to the list
      serverlist.additem(_serverobj);// add server
    }

    serverlist.selectserverid(config.current.serverid);
    //serverlist.selectserverdefault(scdata[0].serverid);
});

bot.on('message', function(user, userID, channelID, message, rawEvent) {
  //console.log("channelID:"+channelID + " userID:" + userID + " user:" + user);
  //console.log("message:"+message);
  plugin.AssignMessage(bot,user, userID, channelID, message, rawEvent,function(text){
        if(text !=null){ //make sure the string text
          AddChatMessage(text);
        }
  });
});

//===============================================
// End
//===============================================

/*
 * END Script
 */
