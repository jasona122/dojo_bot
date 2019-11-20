const Animals = require("../animals/animals.js");

async function getCatPic(bot, message, args){
    let catURL = await Animals.getCat()
    message.channel.send(catURL);
}

module.exports = {
    description: "Get a random cat pic!",
    exec: getCatPic
}