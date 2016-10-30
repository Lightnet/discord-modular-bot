/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

module.exports.commandline = "delmsgs";

module.exports.scriptparams = "delmsgs <amount> (limited 100)";

module.exports.executescript = function(message,args){
	var count = 0;
	var pcount;
	if(args[2] !=null){
		var pcount = parseInt(args[2]) || 0;
		//console.log(typeof pcount);
		//console.log(pcount);
		if(pcount != null){
			//console.log("pass?");
			count = pcount;
		}
	}
	if(count > 0){
		message.channel.fetchMessages({limit: count})
			.then(messages =>{
				//console.log(messages);
				messages.deleteAll(10);
			});
	}
	pcount =null;
	count = null;
};
