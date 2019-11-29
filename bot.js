require("dotenv").config();
const Discord = require('discord.js');
const fs = require("fs");
const mongoose = require("mongoose");

// Initialize mongoose database
let mongoURI = "mongodb+srv://admin:myadminpassword@dojo-bot-db-o59l6.gcp.mongodb.net/guild_config?retryWrites=true&w=majority"
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function(err){
    if(err) return console.log(err);
    console.log("Connected to Database Successfully");
});

// Initialize Discord Bot
let bot = new Discord.Client({disableEveryone: true});

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

