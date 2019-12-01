const Database = require("../guilds/guildDatabase");

module.exports = function(bot, guild){
    console.log("DojoBot has joined a guild!");
    console.log("Guild name: " + guild.name);
    console.log("Owner tag: " + guild.owner.user.tag);
    console.log("Owner ID: " + guild.ownerID);

    Database.setDefaultGuild(guild.id);
}