var settingsmodel;
var SettingsViewModel = function () {
    var self = this;
    this.autorun = ko.observable(true);
    this.btn_toggle_autorun = function () {
        //console.log("button click?");
        if (self.autorun() == true) {
            self.autorun(false);
        }
        else {
            self.autorun(true);
        }
    };
    this.username = ko.observable('none');
    this.password = ko.observable('none');
    this.tokenkey = ko.observable('none');
    this.btoken = ko.observable(true);
    this.btn_toggle_token = function () {
        if (self.btoken() == true) {
            self.btoken(false);
        }
        else {
            self.btoken(true);
        }
    };
    this.current_guild_id = ko.observable('none');
    this.current_guild_name = ko.observable('none');
    this.current_channel_id = ko.observable('none');
    this.current_channel_name = ko.observable('none');
    this.savesettings = function () {
        //console.log("save?");
        SaveSettings();
    };
};
//===============================================
// #socket.io
//===============================================
var socket = io();
//console.log("SOCKET");
socket.on('connect', function () {
    console.log('server connected');
    //socket.emit('getguildlist');
    socket.emit('settings', { action: 'getsettings' });
});
socket.on('event', function (data) {
    console.log('event');
    console.log(data);
});
socket.on('disconnect', function () {
    console.log('server disconnected');
});
function SetSettings(_id, _state) {
    console.log("set plugin state:" + _id + ":" + _state);
    socket.emit('settings', { action: 'setconfig', id: _id, pluginstate: _state });
}
function SaveSettings() {
    var config = {
        autorun: settingsmodel.autorun(),
        email: settingsmodel.username(),
        password: settingsmodel.password(),
        btoken: settingsmodel.btoken(),
        token: settingsmodel.tokenkey(),
        current: {
            guildid: settingsmodel.current_guild_id(),
            guildname: settingsmodel.current_guild_name(),
            channelid: settingsmodel.current_channel_id(),
            channelname: settingsmodel.current_channel_name()
        }
    };
    socket.emit('settings', { action: 'setconfig', config: config });
    config = null;
    //console.log(config);
}
socket.on('settings', function (data) {
    console.log('event');
    if (data['action'] != null) {
        if (data['action'] == 'config') {
            //console.log('config');
            //console.log(data['config']);
            settingsmodel.autorun(data['config'].autorun);
            settingsmodel.username(data['config'].email);
            settingsmodel.password(data['config'].password);
            settingsmodel.tokenkey(data['config'].token);
            settingsmodel.btoken(data['config'].btoken);
            settingsmodel.current_guild_id(data['config'].current.guildid);
            settingsmodel.current_guild_name(data['config'].current.guildname);
            settingsmodel.current_channel_id(data['config'].current.channelid);
            settingsmodel.current_channel_name(data['config'].current.channelname);
        }
    }
    //console.log(data);
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
settingsmodel = new SettingsViewModel();
//key bind to models on on load event
addEvent(window, 'load', function () {
    //console.log("BIND KO");
    ko.applyBindings(settingsmodel, document.getElementById("settings"));
    //ko.applyBindings(serverlist,document.getElementById("memberslist"));
});
//===============================================
//
//===============================================
