module.exports = function(bot, message){
    if(message.content === "ping"){
        message.reply("pong");
    }
}