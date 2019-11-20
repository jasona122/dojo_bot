async function botSay(bot, message, args){
    let messageToSay = "";
    for(let i = 1; i < args.length; i++){
        messageToSay += args[i] + " ";
    }
    try{
        await message.delete()
    }
    catch(err){
        //likely due to missing perms; send message anyway
        console.log(err);
    }
    message.channel.send(messageToSay);
}

module.exports = {
    description: "Ask the bot to say something",
    exec: botSay
}