let GuildErrors = require("./guildErrors");
let GuildConfig = require("./guildConfig");

class GuildData {
    constructor(){
        this.guilds = {}
    }

    initNewGuild(guildID){
        if(this.guilds[guildID]){
            return; //no need to do anything
        }
        const defaultPrefix = "!";
        let defaultConfig = new GuildConfig(defaultPrefix);

        this.guilds[guildID] = defaultConfig;
    }

    addGuild(guildID, guildConfig){
        if(!guildConfig){
            throw new GuildErrors.GuildConfigError("Guild config cannot be empty");
        }
        else if(this.guilds[guildID]){
            throw new GuildErrors.GuildAlreadyExistsError("Guild already exists");
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