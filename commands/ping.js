function canPing(user){
    return user && user[0] === "<" && user[user.length - 1] === ">"
}

function ping(bot, message, args){
    let userToPing = args[1];
    let amountToPing = parseInt(args[2]);

    if(!canPing(userToPing) || isNaN(amountToPing)){
        return message.channel.send("Invalid arguments passed");
    }
    else if(amountToPing > 5){
        return message.reply("You can't ping that many times!");
    }

    for(let i = 0; i < amountToPing; i++){
        message.channel.send(userToPing);
    }
}

module.exports = {
    description: "Ping a user multiple times! (Max 5)",
    exec: ping
}