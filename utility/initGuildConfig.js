//interface between guild "database" and other functions
let AllGuildData = require("../guilds/guildData");
let GuildConfig = require("../guilds/guildConfig");
const defaultPrefix = "!";

function initGuildConfig(guildID){
    let defaultGuildConfig = new GuildConfig(defaultPrefix);
    let hasGuild = AllGuildData.getGuildConfig(guildID);

    if(!hasGuild){
        AllGuildData.addGuild(guildID, defaultGuildConfig);
    }
}

module.exports = {
    initGuildConfig
};