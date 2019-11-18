var Discord = require('discord.js');
var auth = require('./token/auth.json');

// Initialize Discord Bot
var bot = new Discord.Client();

function isCommand(message, prefix){
    return message[0] === prefix;
}

bot.on('ready', function () {
    console.log(bot.user.tag);
    console.log("Connected successfully");
});

bot.on('message', function (message) {
    const prefix = "!";

    if(message.content === "ping"){
        message.reply("pong");
    }
});

bot.login(auth.token);

