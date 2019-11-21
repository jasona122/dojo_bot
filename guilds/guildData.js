let GuildErrors = require("./guildErrors");

class GuildData {
    constructor(){
        this.guilds = {}
    }

    addGuild(guildID, guildConfig){
        if(!guildConfig){
            throw new GuildErrors.GuildConfigError("Guild config cannot be empty");
        }
        this.guilds[guildID] = guildConfig;
    }

    getGuildConfig(guildID){
        return this.guilds[guildID];
    }

    updateGuild(guildID, newGuildConfig){
        if(!this.guilds[guildID]){
            throw new GuildNotFoundError("Guild not found");
        }
        this.guilds[guildID] = newGuildConfig;
    }
}

let GuildDataInstance = new GuildData();

module.exports = GuildDataInstance;