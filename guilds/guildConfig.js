class GuildConfig{
    constructor(prefix){
        //just prefix for now, more to be added
        this.prefix = prefix;
        this.cooldowns = {};
    }

    changePrefix(newPrefix){
        this.prefix = newPrefix;
    }

    addCooldown(command, user){
        if(!this.cooldowns[command]){
            this.cooldowns[command] = new Set();
        }
        this.cooldowns[command].add(user);
    }

    removeCooldown(command, user){
        if(!this.cooldowns[command]) return;
        this.cooldowns[command].delete(user);
    }

    hasCooldown(command, user){
        if(!this.cooldowns[command]) return false;
        return this.cooldowns[command].has(user);
    }
}

module.exports = GuildConfig;