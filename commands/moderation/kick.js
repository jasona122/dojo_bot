async function kickMember(bot, message, args){
    if(!message.member.hasPermission("KICK_MEMBERS")){
        return message.reply("You don't have permission to kick members!");
    }
    let memberToKick = message.mentions.members.first();
    if(!memberToKick.kickable){
        return message.channel.send("I can't kick this member!");
    }

    let memberName = memberToKick.displayName;
    memberToKick.kick().then(function(){
        message.channel.send(memberName + " has been kicked from the server");
    }).catch(function(err){
        console.error(err);
    });
}

module.exports = {
    info: {
        name: "!kick",
        usage: "!kick @member",
        description: "Kick a member from the server"
    },
    exec: kickMember
}