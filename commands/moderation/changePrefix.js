let Database = require("../../guilds/guildDatabase");

async function changePrefix(bot, message, args){
    if(!(message.member.hasPermission(["MANAGE_CHANNELS", "KICK_MEMBERS"]) || message.author.id === "265500824266997760")){
        return message.reply("You don't have the permissions to do that!");
    }
    let newPrefix = args[1];

    if(!newPrefix) return message.channel.send("Cannot have an empty prefix!");
    if(newPrefix.length > 1) return message.channel.send("Prefixes can only have length 1");

    await Database.changeGuildPrefix(message.guild.id, newPrefix);
    message.channel.send("Prefix changed to " + newPrefix);
}


module.exports = {
    info: {
        name: "!prefix",
        usage: "!prefix ?",
        description: "Change the default bot prefix"
    },
    exec: changePrefix
};
