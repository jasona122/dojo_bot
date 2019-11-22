const Discord = require("discord.js");
const AllGuildData = require("../guilds/guildData");

//all commands
let commands = require("../commands/commands.js");

function isCommand(message){
    let guildConfig = AllGuildData.getGuildConfig(message.guild.id)
    return message.content && message.content[0] === guildConfig.prefix;
}

const messageCommands = {
    "ping": commands.ping,
    "dog": commands.getDogPic,
    "cat": commands.getCatPic,
    "8ball": commands.eightBall,
    "say": commands.botSay,
    "prefix": commands.prefix
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
    AllGuildData.initNewGuild(message.guild.id); //initialize guild config if not already initialized
    if(!isCommand(message)) return;

    let args = message.content.substring(1).split(' ');
    let command = args[0];

    if(command === "help"){
        return help(bot, message);
    }
    if(!messageCommands[command]){
        return; //don't do anything if not a recognized command
    }

    messageCommands[command].exec(bot, message, args);
}