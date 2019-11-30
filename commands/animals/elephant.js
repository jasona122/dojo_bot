const request = require("request");
const Discord = require("discord.js");
const apiURL = "https://elephant-api.herokuapp.com/elephants/random";

function getElephantPic(bot, message, args){
    request.get(apiURL, function(err, res, body){
        let elephant = JSON.parse(body)[0];
        let elephantBio = new Discord.RichEmbed()
            .setColor('#AACC00')
            .setTitle(elephant.name)
            .setImage(elephant.image)
            .addField("Date of Birth", elephant.dob)
            .addField("Date of Death", elephant.dod)
            .setDescription(elephant.note)
            .setFooter("Requested by " + message.member.displayName)
            .setTimestamp();
        
        message.channel.send(elephantBio);
    });
}

module.exports = {
    info: {
        name: "!elephant",
        usage: "!elephant",
        description: "Get a random elephant biography!"
    },
    exec: getElephantPic
}
