const AnimalsUtil = require("./animalsUtil");
const dogAPIURL = "https://api.thedogapi.com/";

async function getDog(){
    let dogJSON = await AnimalsUtil.loadCatDogImage(dogAPIURL);
    return dogJSON[0].url;
}

async function getDogPic(bot, message, args){
    let dogURL = await getDog();
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