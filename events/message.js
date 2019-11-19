const http = require("http");
const Animals = require("../animals/animals.js");
let prefix = require("../config.js").BOT_PREFIX;

function isCommand(message){
    return message[0] === prefix;
}

const messageCommands = {
    "ping": ping,
    "dog": getDogPic,
    "cat": getCatPic
}

async function getDogPic(bot, message, args){
    let dogURL = await Animals.getDog();
    message.channel.send(dogURL);
}

async function getCatPic(bot, message, args){
    let catURL = await Animals.getCat()
    message.channel.send(catURL);
}

function ping(bot, message, args){
    let userToPing = args[1];
    let amountToPing = parseInt(args[2]);

    if(!userToPing || isNaN(amountToPing)){
        return message.channel.send("Invalid arguments passed");
    }
    else if(amountToPing > 5){
        return message.reply("You can't ping that many times!");
    }

    for(let i = 0; i < amountToPing; i++){
        message.channel.send(userToPing);
    }
}

module.exports = async function(bot, message){
    if(message.author.bot) return;
    if(message.author.username === "Mcw"){
        message.channel.send("^ is an fdp");
    }
    if(!isCommand) return;
    let args = message.content.substring(1).split(' ');
    let command = args[0];

    if(!messageCommands[command]){
        return;
    }

    messageCommands[command](bot, message, args);
}