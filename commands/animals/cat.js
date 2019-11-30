const AnimalsUtil = require("./animalsUtil.js");
const catAPIURL = "https://api.thecatapi.com/";

async function getCat(){
    let catJSON = await AnimalsUtil.loadCatDogImage(catAPIURL);
    return catJSON[0].url;
}

async function getCatPic(bot, message, args){
    let catURL = await getCat();
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