const http = require("http");
let prefix = "!";

//all commands
let commands = require("../commands/commands.js");

function isCommand(message){
    return message[0] === prefix;
}

const messageCommands = {
    "ping": commands.ping,
    "dog": commands.getDogPic,
    "cat": commands.getCatPic,
    "8ball": commands.eightBall,
    "say": commands.botSay,
}

function help(bot, message){
    let helpMessage = "```";

    for(let prop in commands){
        let commandInfo = commands[prop].info;
        let info = "";
        for(let key in commandInfo){
            info += key + ": " + commandInfo[key];
            info += "\n";
        }
        helpMessage += info + "\n\n";
    }

    helpMessage += "```"
    message.channel.send(helpMessage);
}

module.exports = async function(bot, message){
    if(message.author.bot) return;
    if(!isCommand) return;
    let args = message.content.substring(1).split(' ');
    let command = args[0];

    if(command === "help"){
        return help(bot, message);
    }

    if(!messageCommands[command]){
        return;
    }

    messageCommands[command].exec(bot, message, args);
}