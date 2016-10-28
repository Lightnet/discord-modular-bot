var DataID = function () {
    this.name = ko.observable();
    this.id = ko.observable();
};
//guilds model
var GuildDataModel = function (_id, _name, _obj) {
    this.name = ko.observable(_name);
    this.id = ko.observable(_id);
    this.channels = ko.observableArray();
    this.members = ko.observableArray();
    this.data = _obj;
};
//guild view
var guildview = new DataID();
//member model
var MemberDataModel = function (_id, _name, _data) {
    if (_data.bot == true) {
        this.name = ko.observable(_name + " [Bot]");
    }
    else {
        this.name = ko.observable(_name);
    }
    this.id = ko.observable(_id);
    this.data = _data;
};
//member view
var MembersViewModel = function () {
    this.members = ko.observableArray([]);
};
// member view model
var membersviewmodel = new MembersViewModel();
//Channel model
var ChannelDataModel = function (_id, _name, _obj) {
    this.name = ko.observable(_name);
    this.id = ko.observable(_id);
    this.type = ko.observable(_obj.type);
    if (_obj.type == 'text') {
        this.icon = 'glyphicon glyphicon-comment';
    }
    else {
        //<span class="glyphicon glyphicon-headphones"></span>
        //icon-headset
        this.icon = 'glyphicon glyphicon-headphones';
    }
    this.data = _obj;
};
//channel view
var channelview = new DataID();
//channel list
var ChannelsViewModel = function () {
    this.channels = ko.observableArray([]);
};
//channel view model
var channelsviewmodel = new ChannelsViewModel();
// guild view model
var GuildsViewModel = function () {
    this.guildid = ko.observable();
    this.guildname = ko.observable();
    this.guilds = ko.observableArray([]); //set server list to display
    var self = this;
    this.additem = function (_object) {
        this.guilds.push(_object);
    };
    this.guildid.subscribe(function (newValue) {
        //console.log("subscribe server id");
        for (i in self.guilds()) {
            if (self.guilds()[i].id() == newValue) {
                if (membersviewmodel != null) {
                    membersviewmodel.members(self.guilds()[i].members());
                }
                self.guilds()[i].channels().sort(function (a, b) { return a.type() > b.type(); });
                if (channelsviewmodel != null) {
                    channelsviewmodel.channels(self.guilds()[i].channels());
                }
            }
        }
    });
    this.clearserver = function () {
        this.guilds([]);
        if (membersviewmodel != null) {
            membersviewmodel.members([]);
        }
        if (channelsviewmodel != null) {
            channelsviewmodel.channels([]);
        }
    };
};
//===============================================
// #socket.io
//===============================================
var socket = io();
//console.log("SOCKET");
socket.on('connect', function () {
    console.log('server connected');
    socket.emit('getguildlist');
});
/*
socket.on('event', function(data){
    console.log('event');
    console.log(data);
});
*/
socket.on('disconnect', function () {
    console.log('server disconnected');
});
socket.on('message', function (data) {
    //$('#messages').append($('<li>').text(msg));
    if (data.msg != null) {
        AddChatMessage(data.msg);
    }
    console.log('message');
});
/*
socket.on('discordready', function (data) {
    //$('#messages').append($('<li>').text(msg));
    //console.log(data);
    //if(data.msg !=null){
        //AddChatMessage(data.msg);
    //}
    //console.log('discordready');
    socket.emit('getguildlist');
});
*/
socket.on('server', function (data) {
    //$('#messages').append($('<li>').text(msg));
    //console.log("server");
    //console.log(data);
    if (data != null) {
        if (data['action'] == "cleanguilds") {
            //console.log("server clean guilds");
            guildsviewmodel.clearserver();
        }
        if (data['action'] == "addguild") {
            //console.log("server addguild");
            var guilddata = data['data'];
            var _guilddata = new GuildDataModel(data['data'].id, data['data'].name, data['data']);
            //console.log(__server.name());
            for (var i = 0; i < guilddata.members.length; i++) {
                //console.log(guilddata.members[i].name);
                var member = new MemberDataModel(guilddata.members[i].id, guilddata.members[i].name, guilddata.members[i]);
                _guilddata.members.push(member);
            }
            for (var i = 0; i < guilddata.channels.length; i++) {
                //console.log(guilddata.channels[i].name);
                var channel = new ChannelDataModel(guilddata.channels[i].id, guilddata.channels[i].name, guilddata.channels[i]);
                _guilddata.channels.push(channel);
            }
            guildsviewmodel.additem(_guilddata);
        }
        if (data['action'] == "setguildchannel") {
            guildsviewmodel.guildid(data['guildid']);
            guildview.id(data['guildid']);
            guildview.name(data['guildname']);
            channelview.id(data['channelid']);
            channelview.name(data['channelname']);
        }
    }
});
//===============================================
// @functions
//===============================================
function getguildlist() {
    if (socket != null) {
        //console.log("refresh?");
        socket.emit('getguildlist');
    }
}
//Input key press
function ChatInputHandle(event) {
    if (event.which == 13 || event.keyCode == 13) {
        //code to execute here
        var tb = document.getElementById("chatinputtext");
        InputChatText(tb.value);
        return false;
    }
    return true;
}
;
//button press
function ButtonChatMessage() {
    var tb = document.getElementById("chatinputtext");
    InputChatText(tb.value);
}
//add text to the message div id
function AddChatMessage(_text) {
    var cbm = document.getElementById("chatboxmessage");
    var elemDiv = document.createElement('div');
    elemDiv.innerHTML = _text;
    cbm.appendChild(elemDiv);
    cbm.scrollTop = cbm.scrollHeight;
}
//send message to server
function InputChatText(_text) {
    //send to server with channel id
    if (socket != null) {
        console.log("text:" + _text);
        socket.emit('message', { msg: _text });
    }
}
//create variable div to add to chat message
var guildsviewmodel = new GuildsViewModel();
//Event
function addEvent(element, eventName, fn) {
    if (element.addEventListener)
        element.addEventListener(eventName, fn, false);
    else if (element.attachEvent)
        element.attachEvent('on' + eventName, fn);
}
//key bind to models on on load event
addEvent(window, 'load', function () {
    //console.log("BIND KO");
    ko.applyBindings(guildview, document.getElementById("guildview"));
    ko.applyBindings(channelview, document.getElementById("channelview"));
    ko.applyBindings(guildsviewmodel, document.getElementById("guildsviewmodel"));
    ko.applyBindings(membersviewmodel, document.getElementById("membersviewmodel"));
    ko.applyBindings(channelsviewmodel, document.getElementById("channelsviewmodel"));
});
//===============================================
//
//===============================================
