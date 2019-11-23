require("dotenv").config();
const Discord = require('discord.js');
const fs = require("fs");

// Initialize Discord Bot
var bot = new Discord.Client({disableEveryone: true});

fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        let eventHandler = require(`./events/${file}`)
        let eventName = file.split('.')[0]
        bot.on(eventName, function(args){
            eventHandler(bot, args);
        });
    });
});

bot.login(process.env.BOT_TOKEN);

