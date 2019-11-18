function parseCommand(bot, user, userID, channelID, message, event){
    let args = message.substring(1).split(' ');
    let command = args[0];

    args = args.splice(1);

    switch(command) {
        case 'ping':
            bot.sendMessage({
                to: channelID,
                message: 'Pong!'
            });
        break;
        case 'random':
            let range = parseInt(args[0]);
            let messageToSend = "";

            if(isNaN(range)){
                messageToSend = "Please specify your number";
            }
            else{
                messageToSend = getRandomNumber(range).toString();
            }
            bot.sendMessage({
                to: channelID,
                message: messageToSend
            });
        break;
    }
}

function getRandomNumber(range){
    return Math.floor(Math.random() * range);
}

module.exports = { 
    parseCommand 
};
