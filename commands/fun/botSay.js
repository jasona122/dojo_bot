async function botSay(bot, message, args){
    let messageToSay = "";
    for(let i = 1; i < args.length; i++){
        let word = args[i];
        messageToSay += word + " ";
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
    info:{
        name: "!say",
        usage: "!say Hello, world",
        description: "Ask the bot to say something"
    },
    exec: botSay
}