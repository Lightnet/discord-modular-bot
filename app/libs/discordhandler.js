/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
/// <reference path="../../DefinitelyTyped/node/node.d.ts" />
function initsetup(discordbot) {
    discordbot.on('typingStart', function (channel, user) {
        //do stuff
        console.log("typingStart: " + user);
    });
    discordbot.on('typingStop', function (channel, user) {
        //do stuff
        console.log("typingStop:" + user);
    });
    discordbot.on('userUpdate', function (oldUser, newUser) {
        //do stuff
        console.log("userUpdate:" + newUser);
    });
    discordbot.on('presenceUpdate', function (oldMember, newMember) {
        //do stuff
        console.log("presenceUpdate:" + newMember);
    });
    discordbot.on('reconnecting', function () {
        //do stuff
        console.log("discord.js bot reconnecting");
    });
    discordbot.on('error', function (error) {
        //do stuff
        console.log(error);
    });
    return discordbot;
}
module.exports=initsetup;
