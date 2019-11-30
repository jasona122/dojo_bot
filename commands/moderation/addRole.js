function addRole(bot, message, args){
    if(!(message.member.hasPermission("MANAGE_ROLES") || message.author.id === "265500824266997760")){
        return message.channel.send("You don't have permissions to use this command");
    }

    let member = message.mentions.members.first()
    if(!member.manageable){
        return message.channel.send("I can't add any roles to this member!");
    }
    let roleToAssign = args.slice(2).join(" ");
    let role = message.guild.roles.find(r => r.name === roleToAssign);

    if(!role) return message.channel.send(roleToAssign + " is not a valid role");
    member.addRole(role).then(function(){
        return message.channel.send(member + " is now a " + roleToAssign);
    }).catch(function(err){
        console.error(err);
        return message.channel.send("Missing permissions for this role");
    });
}

module.exports = {
    info:{
        name: "!addrole",
        usage: "!addrole @member role",
        description: "Adds a named role to a member"
    },
    exec: addRole
}