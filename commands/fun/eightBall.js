function eightBall(bot, message, args){
    let possibleResponses = ["It is certain"," It is decidedly so", "Without a doubt",
    "Yes - definitely", "You may rely on it", "As I see it, yes",
    "Most likely", "Outlook good", "Yes",
    "Signs point to yes", "Reply hazy, try again", "Ask again later",
    "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
    "Don't count on it", "My reply is no", "My sources say no",
    "Outlook not so good", "Very doubtful"];

    let responseIndex = Math.floor(Math.random() * possibleResponses.length);
    let response = possibleResponses[responseIndex];
    message.channel.send(response);
}

module.exports = {
    info: {
        name: "!8ball",
        usage: "!8ball Am I a good bot?",
        description: "Generates a random 8ball response"
    },
    exec: eightBall
}