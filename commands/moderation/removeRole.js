function removeRole(bot, message, args){
    if(!(message.member.hasPermission("MANAGE_ROLES") || message.author.id === "265500824266997760")){
        return message.channel.send("You don't have permissions to use this command");
    }

    let member = message.mentions.members.first()
    if(!member.manageable){
        return message.channel.send("I can't remove any roles from this member!");
    }
    let roleToRemove = args[2];
    let role = message.guild.roles.find(r => r.name === roleToRemove);

    if(!role) return message.channel.send(roleToRemove + " is not a valid role");
    member.removeRole(role).catch(console.error);
    message.channel.send(roleToRemove + " has been removed from " + member);
}

module.exports = {
    info:{
        name: "!removerole",
        usage: "!removerole @member role",
        description: "Removes a named role to a member"
    },
    exec: removeRole
}