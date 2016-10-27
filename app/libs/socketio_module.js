/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
// <reference path="../../DefinitelyTyped/cryptojs/cryptojs.d.ts" />
var plugin = require('./plugin.js');
var fs = require('fs');
var path = require('path');
var cryptojs = require('crypto-js');
module.exports = function (_io) {
    //console.log("[ = socket.io = ]");
    io = _io;
    var db;
    io.on('connection', function (socket) {
        //console.log('a user connected');
        //console.log(socket);
        //add on socket.io
        plugin.AssignConnect(io, socket, db);
        //socket.on('ping', function(){socket.emit('pong');});
        //var hash = crypto.createHash('md5').update(socket.id).digest('hex');//md5 hash
        var hash = cryptojs.HmacMD5(socket.id, 'secret').toString();
        //var hash = socket.id;//md5 hash
        //console.log("MDR5:"+hash);
        socket.emit('iduser', hash); //send out userid
        socket.userid = "player_" + hash;
        hash = null; //make null since
        socket.on('plugins', function (data) {
            if (data != null) {
                if (data['action'] != null) {
                    if (data['action'] == 'getlist') {
                        var pluginlist = plugin.getpluginlist();
                        socket.emit('plugins', { action: 'clearlist' });
                        for (var i = 0; i < pluginlist.length; i++) {
                            //console.log(pluginlist[i]);
                            socket.emit('plugins', { action: 'addlist', index: i, config: pluginlist[i].config });
                        }
                        pluginlist = null;
                    }
                    if (data['action'] == 'pluginstate') {
                        var pluginlist = plugin.getpluginlist();
                        //console.log("pluginstate");
                        if (pluginlist[data['id']] != null) {
                            pluginlist[data['id']].config.enable = data['pluginstate'];
                            //console.log(pluginlist[data['id']]);
                            //need to write file here
                            fs.writeFile(pluginlist[data['id']].path, JSON.stringify(pluginlist[data['id']].config, null, 4), function (err) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log("JSON saved to " + pluginlist[data['id']].path);
                                }
                            });
                        }
                    }
                }
            }
        });
        socket.on('settings', function (data) {
        });
        socket.on('disconnect', function (data) {
            //console.log('disconnect message: ' + data);
            //console.log(socket);
            plugin.AssignDisconect(io, socket, db);
        });
    });
    //console.log("[ = socket.io config... = ]");
};
