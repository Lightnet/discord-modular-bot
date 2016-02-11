/*
    Project Name: Discordapp Tool Bot
    Link:https://bitbucket.org/Lightnet/discordapptoolbot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/


// <reference path="../../DefinitelyTyped/cryptojs/cryptojs.d.ts" />

//var cookie = require("cookie");
//var connect = require("connect");
//declare var crypto:any;

var plugin = require('./plugin.js');
var fs = require('fs');
var path = require('path');
var cryptojs = require('crypto-js');

//console.log(cryptojs);
//console.log(cryptojs.HmacMD5("Test",'secret').toString());

module.exports = function(_io){
	//console.log("[ = socket.io = ]");
    io = _io;
	var db;
    // ==========================================
    // Configure
    // ==========================================
    //io.set('log level', 1);
    //io.configure(function (){
	//console.log("config authorization");
    io.set('authorization', function (data, accept) {
        // check if there's a cookie header
        //console.log(data.headers.cookie);
        /*
        if (!data.headers.cookie) {
            console.log('Session cookie required.');
            //return accept('Session cookie required.', false);//nodewebkit kit will not work.
            accept(null, true);
        }
        if (data.headers.cookie) {
            data.cookie = require('cookie').parse(data.headers.cookie);
            data.cookie = require("connect").utils.parseSignedCookies(data.cookie, SECRET);
            data.sessionID = data.cookie[KEY];
            console.log(data.sessionID);
            if(data.sessionID == data.cookie[KEY]){

            }else{
                console.log('Cookie is invalid.');
                return callback('Cookie is invalid.', false);
            }
        } else {
           // if there isn't, turn down the connection with a message
           // and leave the function.
           console.log('No cookie transmitted.');
           return accept('No cookie transmitted.', false);
        }
        */
        // accept the incoming connection
        accept(null, true);
    });

	//console.log(three_manage);
	//var name = 'braitsch';
	//var hash = crypto.createHash('md5').update(name).digest('hex');
	//console.log(hash); // 9b74c9897bac770ffc029102a200c5de
	//console.log(module_data);

    io.on('connection', function(socket){// client listen when connect with the user client web browser
        console.log('a user connected');
		//console.log(socket);
		//add on socket.io
		plugin.AssignConnect(io, socket, db);
		//socket.on('ping', function(){socket.emit('pong');});

		//var hash = crypto.createHash('md5').update(socket.id).digest('hex');//md5 hash
        var hash = cryptojs.HmacMD5(socket.id, 'secret').toString();
		//var hash = socket.id;//md5 hash
		//console.log("MDR5:"+hash);
		socket.emit('iduser',hash);//send out userid
		socket.userid = "player_" + hash;
		hash = null;//make null since

		socket.on('disconnect', function(data){
			//console.log('disconnect message: ' + data);
			//console.log(socket);
			plugin.AssignDisconect(io, socket,db);
		})
    });

	//console.log("[ = socket.io config... = ]");
};
