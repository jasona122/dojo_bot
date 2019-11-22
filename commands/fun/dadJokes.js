const request = require("request");
const Discord = require("discord.js");

function dadJoke(bot, message, args){
    const options = {
        url: "https://icanhazdadjoke.com/",
        headers: {
            "User-Agent": "Dojo Bot (https://github.com/jasona122/dojo_bot)",
            "Accept": "application/json"
        }
    }

    request.get(options, function(err, res, body){
        if(err) throw err;
        let joke = JSON.parse(body).joke;
        let jokeEmbed = new Discord.RichEmbed()
            .setColor('#AAAA00')
            .setTitle("Dad Jokes by DojoBot")
            .setDescription(joke);

        message.channel.send(jokeEmbed);
    });
}

module.exports = {
    info:{
        name: "!dadjoke",
        usage: "!dadjoke",
        description: "Ask the bot to tell a dad joke"
    },
    exec: dadJoke
}