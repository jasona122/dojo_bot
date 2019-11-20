const Animals = require("./animals.js");

async function getCatPic(bot, message, args){
    let catURL = await Animals.getCat()
    message.channel.send(catURL);
}

module.exports = {
    info:{
        name: "!cat",
        usage: "!cat",
        description: "Get a random cat pic!"
    },
    exec: getCatPic
}