let Database = require("../guilds/guildDatabase");
let Cooldown = require("../utility/cooldown");
let Embed = require("../utility/generateEmbed");

//command sections
let CommandSections = require("../commands/commands.js");

//all commands
let commands = require("../commands/commands.js").commands;

async function isCommand(bot, message){
    let guildID = message.guild.id;
    let guildPrefix = await Database.getGuildPrefix(guildID);
    return message.content && (message.content[0] === guildPrefix);
}

async function help(bot, message){
    let introEmbed = Embed.regular("Dojo Bot Commands", "Below is the list of commands");
    let animalEmbed = Embed.commandHelp("Animal Commands", CommandSections.animal, "Animal pics!");
    let funEmbed = Embed.commandHelp("Fun Commands", CommandSections.fun, "Here is where the fun begins!");
    let modEmbed = Embed.commandHelp("Moderation Commands", CommandSections.moderation, "Commands to moderate members");
    let closer = Embed.closer("Thank you for using DojoBot", "Please contact @Shelter#7777 for any further questions. Suggestions and feedbacks are always welcome",
    "Requested by " + message.member.displayName);

    await message.channel.send(introEmbed);
    await message.channel.send(animalEmbed);
    await message.channel.send(funEmbed);
    await message.channel.send(modEmbed);
    await message.channel.send(closer);
}

module.exports = async function(bot, message){
    if(message.author.bot) return;
    if(!message.guild) return;

    await Database.setDefaultGuild(message.guild.id);
    if(!await isCommand(bot, message)) return;

    let args = message.content.substring(1).split(' ');
    let command = args[0];

    if(command === "help"){
        return help(bot, message);
    }
    if(!commands[command]){
        return; //don't do anything if not a recognized command
    }
    if(Cooldown.hasCooldown(message.guild.id, message.member.id, command)){
        return message.reply("You can't use this command yet");
    }

    if(await Database.getCommandCooldown(message.guild.id, command)){
        //add user to cooldown
        Cooldown.setCooldown(message.guild.id, message.member.id, command);
    }

    console.log("New command!");
    console.log("Guild: " + message.guild.name);
    console.log("Author: " + message.author.username);
    console.log("Command: " + message.content + "\n");
    
    commands[command].exec(bot, message, args);
}