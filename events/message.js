const Discord = require("discord.js");
let Database = require("../guilds/guildDatabase");
let Cooldown = require("../utility/cooldown");

//all commands
let commands = require("../commands/commands.js");

async function isCommand(bot, message){
    let guildID = message.guild.id;
    let guildPrefix = await Database.getGuildPrefix(guildID);
    return message.content && (message.content[0] === guildPrefix);
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