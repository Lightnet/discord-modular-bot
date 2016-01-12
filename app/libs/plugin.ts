/*
    Project Name: Discordapp Tool Bot
    Link:https://bitbucket.org/Lightnet/discordapptoolbot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

//console.log(manage);
//var instance_manage = manage();

//declare var modules;
//declare var addModule;
//declare var removeModule;
//declare var getModules;
//declare var addView;

export module Globals
{
   export var m_Name : string = "Game Manage";
   export var m_Instance : any;
}

class managePlugin{
    //public static MyInstance:any;
    self:any = this;
    name:string;
    id:any;
    config:any;
    databasetype:string = "";
    database:any = [];
    io:any;
    app:any;
    modulelist:any = [];
    initlist:any = [];
    messagelist:any = [];
    routeList:any = [];
    socketconnectList:any = [];
    socketdisconnectList:any = [];
    appBeforeSession:any = [];
    appSession:any = [];
    appAfterSession:any = [];
    //console.log("init manage");
    constructor() {
        if(Globals.m_Instance == null){
            Globals.m_Instance = this.self;
            this.id =  Math.random();
        }else if(Globals.m_Instance != this.self ){
            this.self = Globals.m_Instance;
        }
      //console.log("init manage plugin:"+this.id);
      //console.log(module);
      //console.log(Globals);
    }

    setConfig(_config){
        this.config = _config;
    }

    getConfig(){
        return this.config;
    }

    getChanelID(){
        return this.config.current.channelid;
    }

    //type, database class
    addDatabase(_data:any = {}){
        if(_data.type != null ){
            if(_data.database !=null){
                this.databasetype = _data.type;
                this.database[_data.type] = _data.database;
            }
        }
    }

    //get current database type
    getDatabase(_type:string = ""){
        if(_type != null){
            if(this.database[_type] !=null){
                return this.database[_type];
            }else{
                throw new Error('Database type not setup!');
            }
        }
    }

    addModule (_module){
        //console.log("Added Module...");
        this.modulelist.push(_module);

        if(typeof _module.init === 'function'){
            //set route page url
            //scriptmodule.setroute(routes,app);
            //console.log("function found!");
            this.initlist.push(_module);
        }else{
            //console.log("function not found!");
        }

        if(typeof _module.message === 'function'){
            //set route page url
            //scriptmodule.setroute(routes,app);
            //console.log("function found!");
            this.messagelist.push(_module);
        }else{
            //console.log("function not found!");
        }

        //route page url
        if(typeof _module.setroute === 'function'){
            //set route page url
            //scriptmodule.setroute(routes,app);
            //console.log("function found!");
            this.routeList.push(_module);
        }else{
            //console.log("function not found!");
        }

        //socket connection
        if( typeof _module.socket_connect === "function"){
			this.socketconnectList.push(_module);
			//console.log("socket_connect function exist!");
		}else{
			//console.log("socket_connect function doesn't exist!");
		}

		if( typeof _module.socket_disconnect === "function"){
			this.socketdisconnectList.push(_module);
			//console.log("socket_disconnect function exist!");
		}else{
			//console.log("socket_disconnect function doesn't exist!");
		}

		if( typeof _module.setBeforeSession === "function"){
			this.appBeforeSession.push(_module);
		}

		if( typeof _module.setSession === "function"){
			this.appSession.push(_module);
		}

		if( typeof _module.setAfterSession === "function"){
			this.appAfterSession.push(_module);
		}

    }

    AssignBeforeSession(_app,_session,_config){
        for(var i = 0; i < this.appBeforeSession.length;i++){
            this.appBeforeSession[i].setBeforeSession(_app,_session,_config);
        }
    }

    AssignSession(_app,_session,_config){
        for(var i = 0; i < this.appSession.length;i++){
            this.appSession[i].setSession(_app,_session,_config);
        }
    }

    AssignAfterSession(_app,_session,_config){
        for(var i = 0; i < this.appAfterSession.length;i++){
            this.appAfterSession[i].setAfterSession(_app,_session,_config);
        }
    }

    //add plugin
    removeModule(_module){
        for(var i = 0; i < this.modulelist.length;i++){
            if(this.modulelist[i] == _module){

            }
        }
    }

    //get list plugin module
    getModuleList(){
        return this.modulelist;
    }

    //set message
    AssignInit(){
        for (var i = 0; i < this.initlist.length; i++ ){
			this.initlist[i].init();
		}
    }
    //set message
    AssignMessage(bot,user, userID, channelID, message, rawEvent, _callback){
        //console.log("added message?");
        //console.log(this.messagelist.length);
        for (var i = 0; i < this.messagelist.length; i++ ){
            //console.log(this.messagelist[i]);
			this.messagelist[i].message(bot,user, userID, channelID, message, rawEvent, _callback);
		}
    }

    //set route
    AssignRoute(_routes,_app){
        for (var i = 0; i < this.routeList.length; i++ ){
			this.routeList[i].setroute(_routes,_app);
		}
    }

    //set connection
    AssignConnect(_io, _socket, _db){
        for (var i = 0; i < this.socketconnectList.length; i++ ){
			this.socketconnectList[i].socket_connect(_io, _socket,_db);
		}
    }
    //set disconnection
    AssignDisconect(_io, _socket,_db){
        for (var i = 0; i < this.socketdisconnectList.length; i++ ){
			this.socketdisconnectList[i].socket_disconnect(_io, _socket,_db);
        }
    }

    //router url set folder
    addAppView(_app,_view){
        //console.log("Adding app view...");
        var views = _app.get('views');
	    views.push(_view);
	    _app.set('views', views);
    }

    //set socket.io set
    setSocketIO(_io){
        this.io = _io;
    }
    //get socket.io
    getSocketIO(){
        return this.io;
    }
}

exports = (module).exports = new managePlugin();
