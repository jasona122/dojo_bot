const Discord = require("discord.js");
let Database = require("../guilds/guildDatabase");

//all commands
let commands = require("../commands/commands.js");

async function isCommand(bot, message){
    let guildID = message.guild.id;
    let guildPrefix = await Database.getGuildPrefix(guildID);
    return message.content && message.content[0] === guildPrefix;
}

function help(bot, message){
    let helpMessage = new Discord.RichEmbed()
        .setColor('#0099ff')
	    .setTitle("Dojo Bot Commands");

    for(let prop in commands){
        let commandInfo = commands[prop].info;
        let info = commandInfo.description + "\nExample: " + commandInfo.usage;
        helpMessage.addField(commandInfo.name, info);
    }

    helpMessage.setFooter("For more information, contact the bot owner @Shelter#7777");
    message.channel.send(helpMessage);
}

module.exports = async function(bot, message){
    if(message.author.bot) return;
    if(!message.guild) return;
    await Database.setDefaultGuild(message.guild.id);
    if(!isCommand(bot, message)) return;

    let args = message.content.substring(1).split(' ');
    let command = args[0];

    if(command === "help"){
        return help(bot, message);
    }
    if(!commands[command]){
        return; //don't do anything if not a recognized command
    }
    commands[command].exec(bot, message, args);
}