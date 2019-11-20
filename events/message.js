const http = require("http");
const Animals = require("../animals/animals.js");
let prefix = "!";

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

function eightBall(bot, message, args){
    let possibleResponses = ["It is certain"," It is decidedly so", "Without a doubt",
    "Yes - definitely", "You may rely on it", "As I see it, yes",
    "Most likely", "Outlook good", "Yes",
    "Signs point to yes", "Reply hazy, try again", "Ask again later",
    "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
    "Don't count on it", "My reply is no", "My sources say no",
    "Outlook not so good", "Very doubtful"];

    let responseIndex = Math.floor(Math.random() * possibleResponses.length);
    let response = possibleResponses[responseIndex];
    message.channel.send(response);
}

async function botSay(bot, message, args){
    let messageToSay = "";
    for(let i = 1; i < args.length; i++){
        messageToSay += args[i] + " ";
    }

    try{
        await message.delete()
    }
    catch(err){
        //likely due to missing perms; send message anyway
        console.log(err);
    }

    message.channel.send(messageToSay);
}

module.exports = async function(bot, message){
    if(message.author.bot) return;
    if(!isCommand) return;
    let args = message.content.substring(1).split(' ');
    let command = args[0];

    if(!messageCommands[command]){
        return;
    }

    messageCommands[command](bot, message, args);
}