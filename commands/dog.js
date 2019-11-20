const Animals = require("../animals/animals.js");

async function getDogPic(bot, message, args){
    let dogURL = await Animals.getDog();
    message.channel.send(dogURL);
}

module.exports = {
    description: "Get a random dog pic!",
    exec: getDogPic
}