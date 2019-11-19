const Discord = require('discord.js');
const config = require('./config.js');
const fs = require("fs");

// Initialize Discord Bot
var bot = new Discord.Client();

fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        let eventHandler = require(`./events/${file}`)
        let eventName = file.split('.')[0]
        bot.on(eventName, function(args){
            eventHandler(bot, args);
        });
    });
});

bot.login(config.BOT_TOKEN);

