/*
 *
*/
declare var ko: any;
var pluginlist;

var PluginDataModel:any = function (_id, _name, _data) {
	this.id = ko.observable(_id);
    this.name = ko.observable(_name);
	//console.log(_data.view);
	this.panelurl = ko.observable(_data.view);
	//console.log(_name);
    this.data = _data;
	//console.log(_data);
	if(_data.enable){
		this.btn_name = ko.observable('true');
		//console.log("true");
	}else{
		this.btn_name = ko.observable('false');
		//console.log("false");
	}
	this.btn_toggle = function(){
		console.log("button click?");
		if(_data.enable){
			this.btn_name('false');
			_data.enable = false;
		}else{
			this.btn_name('true');
			_data.enable = true;
		}
		//console.log(this);
		SetPluginState(this.id(),_data.enable);
	}

	//this.btn_name = ko.observable('false');
}

var PluginListModel:any = function () {
    this.items = ko.observableArray([]); //server list data
	this.pluginvalue = ko.observable();
	this.pluginname = ko.observable();

    var self = this;

	this.pluginvalue.subscribe(function(newValue) {
		console.log("subscribe server id");
        for (i in self.items()){
          //console.log(server);
          //console.log(self.items()[i]);
          if(self.items()[i].id() == newValue){
            console.log(self.items()[i]);
            console.log("found!");
          }
        }
    });

    this.additem = function(_object){
        this.items.push(_object);
    }

	this.clearpluginlist = function(){
		this.items([]);
	}
}

//===============================================
// #socket.io
//===============================================
var socket = io();
//console.log("SOCKET");
socket.on('connect', function () {
    console.log('server connected');
    //socket.emit('getguildlist');
	socket.emit('plugins',{action:'getlist'});
});
socket.on('event', function(data){
    console.log('event');
    console.log(data);
});
socket.on('disconnect', function () {
    console.log('server disconnected');
});

function SetPluginState(_id,_state){
	console.log("set plugin state:"+_id + ":" + _state);
	socket.emit('plugins',{action:'pluginstate',id:_id,pluginstate:_state});
}

socket.on('plugins', function(data){
    console.log('event');
	if(data['action'] !=null){
		if(data['action'] == 'clearlist'){
			pluginlist.clearpluginlist();
		}
		if(data['action'] == 'addlist'){
			console.log('config');
			console.log(data['config']);
			var pluginmodule = new PluginDataModel(data['index'],data['config'].name, data['config']);
			pluginlist.additem(pluginmodule);
		}
	}
    console.log(data);
});

//===============================================
// @functions
//===============================================

//Event
function addEvent(element, eventName, fn) {
    if (element.addEventListener)
        element.addEventListener(eventName, fn, false);
    else if (element.attachEvent)
        element.attachEvent('on' + eventName, fn);
}

pluginlist = new PluginListModel();
//key bind to models on on load event
addEvent(window, 'load', function(){
	//console.log("BIND KO");
	ko.applyBindings(pluginlist,document.getElementById("pluginlist"));
	//ko.applyBindings(serverlist,document.getElementById("memberslist"));
});
//===============================================
//
//===============================================
