let AllGuildData = require("../../guilds/guildData");
let cooldowns = require("../../utility/cooldown");
const cooldownTime = 10;

async function ping(bot, message, args){
    let userToPing = message.mentions.users.first();
    let amountToPing = parseInt(args[2]);
    let command = "ping";

    if(!userToPing || isNaN(amountToPing)){
        return;
    }
    else if(amountToPing > 5){
        return message.reply("You can't ping that many times!");
    }
    else if(cooldowns.hasCooldown(message.guild.id, message.member.id, command)){
        message.delete();
        return message.reply("you can't ping yet for " + cooldownTime + " seconds");
    }

    for(let i = 0; i < amountToPing; i++){
        message.channel.send(userToPing.toString());
    }

    cooldowns.setCooldown(message.guild.id, message.member.id, command, cooldownTime);
}

module.exports = {
    info: {
        name: "!ping",
        usage: "!ping @user 2",
        description: "Ping a user multiple times! (Max 5)"
    },
    exec: ping
}