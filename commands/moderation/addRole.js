function addRole(bot, message, args){
    if(!(message.member.hasPermission("MANAGE_ROLES") || message.author.id === "265500824266997760")){
        return message.channel.send("You don't have permissions to use this command");
    }

    let member = message.mentions.members.first()
    if(!member.manageable){
        return message.channel.send("I can't add any roles to this member!");
    }
    let roleToAssign = args[2];
    let role = message.guild.roles.find(r => r.name === roleToAssign);

    if(!role) return message.channel.send(roleToAssign + " is not a valid role");
    member.addRole(role).catch(console.error);
    message.channel.send(member + " is now a " + roleToAssign);
}

module.exports = {
    info:{
        name: "!addrole",
        usage: "!addrole @member role",
        description: "Adds a named role to a member"
    },
    exec: addRole
}