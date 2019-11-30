const Discord = require("discord.js");
const request = require("request");
const apiURL = "https://randomfox.ca/floof/";

function getFoxPic(bot, message, args){
    request.get(apiURL, function(err, res, body){
        if(err) throw err;
        let foxPic = JSON.parse(body).image;
        message.channel.send(foxPic);
    });
}

module.exports = {
    info: {
        name: "!fox",
        usage: "!fox",
        description: "Get a random fox pic!"
    },
    exec: getFoxPic
}