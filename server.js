var Discord = require('discord.io');
var CommandParser = require("./commands.js");
var auth = require('./token/auth.json');

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

function isCommand(message, prefix){
    return message[0] === prefix;
}

bot.on('ready', function (event) {
    console.log(bot.username + " - " + bot.id);
    console.log("Connected successfully");
});

bot.on('message', function (user, userID, channelID, message, event) {
    const prefix = "!";

    //TODO: Fix general design
    if(isCommand(message, prefix)) {
        CommandParser.parseCommand(bot, user, userID, channelID, message, event);
    }
});

