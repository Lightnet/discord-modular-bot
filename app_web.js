/*
    Project Name: Discordapp Tool Bot
    Link:https://bitbucket.org/Lightnet/discordapptoolbot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
var MemberDataModel = function (_id, _name, _data) {
    this.name = ko.observable(_name);
    this.id = ko.observable(_id);
    this.data = _data;
};
//server model
var ServerDataModel = function (_id, _name) {
    this.name = ko.observable(_name);
    this.id = ko.observable(_id);
    this.channels = ko.observableArray();
    this.members = ko.observableArray();
};
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
var ServerListModel = function () {
    this.items = ko.observableArray([]);
    this.members = ko.observableArray([]);
    this.channels = ko.observableArray([]);
    this.serverid = ko.observable();
    this.servername = ko.observable();
    var self = this;
    this.additem = function (_object) {
        this.items.push(_object);
    };
    this.serverid.subscribe(function (newValue) {
        // Handle a change here, e.g. update something on the server with Ajax.
        //alert('myfield changed to ' + newValue);
        //console.log(newValue);
        //console.log(self.items());
        for (i in self.items()) {
            //console.log(server);
            //console.log(self.items()[i]);
            if (self.items()[i].id() == newValue) {
                //console.log(self.items()[i]);
                //console.log("found!");
                //console.log(self.items()[i].members());
                self.members(self.items()[i].members());
                self.channels(self.items()[i].channels());
            }
        }
    });
    this.selectserverid = function (_id) {
        for (i in self.items()) {
            //console.log(server);
            //console.log(self.items()[i]);
            if (self.items()[i].id() == _id) {
                //console.log(self.items()[i]);
                //console.log(self.items()[i].name());
                //this.servername(self.items()[i].name());
                //console.log("found!");
                //console.log(self.items()[i].members());
                this.servername(self.items()[i].name());
                this.serverid(self.items()[i].id());
                self.members(self.items()[i].members());
                self.channels(self.items()[i].channels());
            }
        }
    };
    this.clearitem = function () {
        this.items = ko.observableArray([]);
    };
};
//===============================================
// @functions
//===============================================
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
    bot.sendMessage({
        to: config.current.channelid,
        message: _text
    });
}
//create variable div to add to chat message
var serverlist = new ServerListModel();
//Event
function addEvent(element, eventName, fn) {
    if (element.addEventListener)
        element.addEventListener(eventName, fn, false);
    else if (element.attachEvent)
        element.attachEvent('on' + eventName, fn);
}
//key bind to models on on load event
addEvent(window, 'load', function () {
    ko.applyBindings(serverlist, document.getElementById("serverlist"));
    ko.applyBindings(serverlist, document.getElementById("memberslist"));
});
