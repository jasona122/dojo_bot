let commandNames = require("../commandNames.js");
let GuildDB = require("../../guilds/guildDatabase");


async function addCooldown(bot, message, args){
    let command = args[1];
    let cooldownTime = parseInt(args[2]);

    if(!commandNames[command]){
        return message.channel.send("Invalid command entered");
    }
    else if(isNaN(cooldownTime)){
        return message.channel.send("Cooldown must be a valid number");
    }

    let hasCooldown = await GuildDB.hasCommandCooldown(message.guild.id, command);

    if(hasCooldown){
        return message.channel.send("Cooldown for command " + command + " already exists");
    }
    
    await GuildDB.addCommandCooldown(message.guild.id, command, cooldownTime);
    message.channel.send("Cooldown set for " + command + " at " + cooldownTime + " seconds");
}

module.exports = {
    info:{
        name: "!addcooldown",
        usage: "!addcooldown [command] [cooldown time]",
        description: "Adds a cooldown (in seconds) to a given command"
    },
    exec: addCooldown
}

