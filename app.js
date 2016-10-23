/*
    Project Name: Discordapp Tool Bot
    Link:https://bitbucket.org/Lightnet/discordapptoolbot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
/// <reference path="./DefinitelyTyped/node/node.d.ts" />
/// <reference path="./app/libs/plugin.ts" />
console.log("app bot");
if (typeof __dirname == 'undefined') {
    __dirname = ".";
}
var path = require('path');
var fs = require('fs');
var config = require('./app/config.json');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var favicon = require('serve-favicon');
var io = require('socket.io')(http);
var methodOverride = require('method-override');
var compression = require('compression');
var session = require('express-session');
var flash = require('connect-flash');
var connect = require('connect');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var discordio = require('discord.io'); //discordapp client
var discordbot; //
//===============================================
// Plugin setup
//===============================================
var plugin = require('./app/libs/plugin.js');
plugin.setConfig(config);
//===============================================
// Models
//===============================================
var model_files = fs.readdirSync(__dirname + "/app/models");
model_files.forEach(function (modelFile) {
    if (path.extname(modelFile) == '.js') {
        console.log('loading model: ' + modelFile);
        require(__dirname + "/app/models/" + modelFile);
    }
});
//===============================================
// Plugin load models
//===============================================
//console.log("sync plugins");
var plugin_files = fs.readdirSync(__dirname + "/plugins");
plugin_files.forEach(function (modelFile) {
    //console.log("plugin:"+modelFile);
    var package_filepath = __dirname + "/plugins/" + modelFile + "/"; //file path
    var package_filename = package_filepath + "package.json"; //pacakge congfig
    try {
        //fs.accessSync(package_filename, fs.F_OK);
        fs.accessSync(package_filename, fs.F_OK);
        var package_config = require(package_filename); //config script
        var package_main = package_filepath + package_config.main; //main script
        try {
            fs.accessSync(package_main, fs.F_OK);
            var packagescript = require(package_main);
            //add plugin list
            plugin.addModule(packagescript);
        }
        catch (e) {
            // It isn't accessible
            console.log(package_main);
            console.log("Plugin no main file js!" + modelFile);
            console.log(e);
        }
    }
    catch (e) {
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
// Discorad bot setup
//===============================================
var keyid = {};
if (config.btoken) {
    keyid = {
        autorun: config.autorun,
        token: config.token
    };
    console.log("Access Type: Token key Set");
}
else {
    keyid = {
        autorun: config.autorun,
        email: config.email,
        password: config.password
    };
    console.log("Access Type: Login Set");
}
//init setup connection
discordbot = new discordio.Client(keyid);
//set up ready variable
discordbot.on('ready', function () {
    plugin.AssignInit(); //init plugin module function.
    plugin.setdiscordclient(discordbot); //set discord app bot
    console.log(discordbot);
    io.emit('discordready');
    for (server in discordbot.servers) {
        var members = discordbot.servers[server].members; //get memebers
        //for(member in members){//id objec
        //var _memberobj = new MemberDataModel(member, members[member].user.username, members[member]);
        //_serverobj.members.push(_memberobj); //add memeber to the server
        //}
        var channels = discordbot.servers[server].channels; //get channels
        for (channel in channels) {
            //check if channel to match with current room
            if ((discordbot.servers[server].name == config.current.servername) && (channels[channel].name == config.current.channelname)) {
                config.current.serverid = discordbot.servers[server].id; //assign current account id
                config.current.channelid = channels[channel].id; //assign current account id
            }
        }
    }
    /*
    //console.log("ID:");
    //console.log(bot.username + " - (" + bot.id + ")");
    //console.log(bot.servers);
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
    */
    console.log("ready.");
});
//listen to the message from all channels that is link to the account
discordbot.on('message', function (user, userID, channelID, message, rawEvent) {
    //console.log("channelID:"+channelID + " userID:" + userID + " user:" + user);
    //console.log("message:"+message);
    plugin.AssignMessage(discordbot, user, userID, channelID, message, rawEvent, function (text) {
        if (text != null) {
        }
    });
});
var routes = express.Router(); //Router is for page access
var configweb = true; //place holder
if (configweb) {
    app.set('view engine', 'ejs'); // set up ejs for templating
    app.set('views', [__dirname + '/app/views']);
    app.use("/", express.static('./public')); //redirect folder path
    app.use(favicon(__dirname + '/public/favicon.ico', { maxAge: 1000 }));
    //app.use(favicon('./public/favicon.ico',{ maxAge: 1000 }));
    app.use(compression());
    // parse application/json
    app.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    // required for passport
    app.use(cookieParser()); // required before session.
    //app.use(session({secret: SECRET,key: KEY,proxy: true // if you do SSL outside of node.}));
    plugin.AssignBeforeSession(app, session, config);
    plugin.AssignSession(app, session, config);
    app.use(methodOverride());
    plugin.AssignAfterSession(app, session, config);
    //app.use(passport.initialize());//working with the express 4
    //app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(routes);
    routes.get('/', function (req, res) {
        res.render('index', { user: req.user });
    });
    /*
    routes.get('/', function (req, res) {
       res.contentType('text/html');
       res.send('Hello World!');
       //res.send('<iframe src="https://discordapp.com/widget?id=&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>');
   });
   */
    // ==============================================
    // Route Pages/URL
    // ==============================================
    plugin.AssignRoute(routes, app);
    app.use('/', routes);
    // ==============================================
    // socket.io
    // ==============================================
    plugin.setSocketIO(io); //assign socket.io global access
    require('./app/libs/socketio_module.js')(io); //setup io list of modules
    var HOSTIP = process.env.IP || "0.0.0.0";
    var HOSTPORT = process.env.PORT || 3000;
    //start listen server for web host
    http.listen(HOSTPORT, HOSTIP, function () {
        console.log('http://' + HOSTIP + ':' + HOSTPORT + '/');
        //console.log('listening on:' + HOSTIP + ':' + HOSTPORT);
        console.log(new Date());
    });
}
function timeConverter() {
    var a = new Date();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
//set up time stamp to make sure it corrrect time for debug
console.log(timeConverter());
/*
 * END Script
 */
