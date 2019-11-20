const Animals = require("./animals.js");

async function getDogPic(bot, message, args){
    let dogURL = await Animals.getDog();
    message.channel.send(dogURL);
}

module.exports = {
    info: {
        name: "!dog",
        usage: "!dog",
        description: "Get a random dog pic!"
    },
    exec: getDogPic
}