/*
    Project Name: Discord Modular Bot
    Link:https://github.com/Lightnet/discord-modular-bot
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

module.exports.commandline = "gms";

module.exports.scriptparams = "gms <amount> (limited 100)";

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
		if(count < 101){
		message.channel.fetchMessages({limit: count})
			.then(messages =>{
				//console.log(messages);

			});
		}else{
			message.channel.sendMessage("Over Limited! 100 Max!");
		}
	}
	pcount =null;
	count = null;
};
