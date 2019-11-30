const request = require("request");
const apiURL = "https://some-random-api.ml/img/birb"

function getBirdPic(bot, message, args){
    request.get(apiURL, function(err, res, body){
        if(err) throw err;
        let birdPic = JSON.parse(body).link;
        message.channel.send(birdPic);
    });
}

module.exports = {
    info:{
        name: "!bird",
        usage: "!bird",
        description: "Get a random bird pic!"
    },
    exec: getBirdPic
}