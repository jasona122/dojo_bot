let commandNames = require("../commandNames.js");
let GuildDB = require("../../guilds/guildDatabase");
const ONE_YEAR = 8760 * 60 * 60;


async function addCooldown(bot, message, args){
    if(!(message.member.hasPermission(["MANAGE_CHANNELS", "MANAGE_MESSAGES"]) || message.author.id === "265500824266997760")){
        return message.reply("You don't have the permissions to do that!");
    }
    
    let command = args[1];
    let cooldownTime = parseInt(args[2]);

    if(!commandNames[command]){
        return message.channel.send("Invalid command entered");
    }
    else if(isNaN(cooldownTime)){
        return message.channel.send("Cooldown must be a valid number");
    }
    if(cooldownTime < 1 || cooldownTime > ONE_YEAR) return message.channel.send("Cooldown time must be between 1 second to 1 year"); //out of bounds

    let hasCooldown = await GuildDB.hasCommandCooldown(message.guild.id, command);

    if(hasCooldown){
        await GuildDB.updateCooldownTime(message.guild.id, command, cooldownTime);
    }
    else{
        await GuildDB.addCommandCooldown(message.guild.id, command, cooldownTime);
    }
    message.channel.send("Cooldown set for " + command + " at " + cooldownTime + " seconds");
}

module.exports = {
    info:{
        name: "!addcooldown",
        usage: "!addcooldown command 30",
        description: "Adds a cooldown (in seconds) to a given command"
    },
    exec: addCooldown
}

