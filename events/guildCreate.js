let AllGuildData = require("../guilds/guildData");

module.exports = function(guild){
    console.log("Client has joined a guild!");
    console.log("Guild name: " + guild.name);
    console.log("Owner tag: " + guild.owner.user.tag);
    console.log("Owner ID: " + guild.ownerID);

    AllGuildData.initNewGuild(guild);
}