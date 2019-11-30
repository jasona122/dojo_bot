const Discord = require("discord.js");
const Database = require("../../guilds/guildDatabase");

async function listCooldowns(bot, message, args){
    let cooldowns = await Database.getAllCooldowns(message.guild.id);
    let outputList = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle(message.guild + " Cooldown List");

    for(let i = 0; i < cooldowns.length; i++){
        let cooldown = cooldowns[i];
        outputList.addField(cooldown.command, "Duration: " + cooldown.duration + " seconds");
    }

    outputList.setFooter("Requested by " + message.member.displayName);
    outputList.setTimestamp();

    message.channel.send(outputList);
}

module.exports = {
    info:{
        name: "!listcooldowns",
        usage: "!listcooldowns",
        description: "Lists all command cooldowns on this server"
    },
    exec: listCooldowns
}