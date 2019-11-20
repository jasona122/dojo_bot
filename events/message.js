const http = require("http");
let prefix = "!";

//commands declarations
const ping = require("../commands/ping");
const getDogPic = require("../commands/dog");
const getCatPic = require("../commands/cat");
const eightBall = require("../commands/eightBall");
const botSay = require("../commands/botSay");

function isCommand(message){
    return message[0] === prefix;
}

const messageCommands = {
    "ping": ping,
    "dog": getDogPic,
    "cat": getCatPic,
    "8ball": eightBall,
    "say": botSay
}

module.exports = async function(bot, message){
    if(message.author.bot) return;
    if(!isCommand) return;
    let args = message.content.substring(1).split(' ');
    let command = args[0];

    if(!messageCommands[command]){
        return;
    }

    messageCommands[command].exec(bot, message, args);
}