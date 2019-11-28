const mongoose = require("mongoose");
const GuildConfig = require("./models/guildConfig");
const Cooldown = require("./models/cooldownTimes");

class GuildDatabase{
    constructor(){

    }

    async getGuildPrefix(guildID){
        GuildConfig.findOne({"guildID": guildID}, function(err, guild){
            if(err) throw err;
            if(!guild) return "!";
            return guild.prefix;
        });
    }

    async changeGuildPrefix(guildID, newPrefix){
        GuildConfig.findOneAndUpdate({"guildID": guildID}, {"prefix": newPrefix},
        function(err, guild, res){
            if(err) throw err;
        });
    }

    async setDefaultGuild(guildID){
        //only set if guild is not present
        await GuildConfig.findOne({"guildID": guildID}, async function(err, guild){
            if(err) throw err;
            if(!guild){
                let guildConfig = new GuildConfig({
                    _id: new mongoose.Types.ObjectId(),
                    guildID: guildID,
                    prefix: "!",
                    cooldownTimes: []
                });

                await guildConfig.save(function(err, doc){
                    if(err) throw err;
                    console.log("Guild has been added to DB");
                });
            } 
        });
    }

    async getCommandCooldown(guildID, command){
        GuildConfig.findOne({"guildID": guildID})
        .populate("cooldownTimes")
        .exec(function(err, guild){
            if(err) throw err;

            for(let i = 0; i < guild.cooldownTimes.length; i++){
                let cooldown = guild.cooldownTimes[i];
                if(cooldown.command === command){
                    return cooldown.duration;
                }
            }
            return false;
        });
    }

    async addCommandCooldown(guildID, command, cooldownTime){
        //precondition: command and cooldownTime are valid
        await GuildConfig.findOne({"guildID": guildID})
        .populate("cooldownTimes")
        .exec(async function(err, guild){
            if(err) throw err;
            
            console.log(guild.cooldownTimes);
            for(let i = 0; i < guild.cooldownTimes.length; i++){
                let cooldown = guild.cooldownTimes[i];
                if(cooldown.command === command){
                    console.log("cooldown already available")
                    return false; //cooldown is already available
                }
            }

            let cooldown = new Cooldown({
                _id: new mongoose.Types.ObjectId(),
                command: command,
                duration: cooldownTime
            });
            console.log(cooldownTime);

            await cooldown.save(function(err, doc){
                if(err) throw err;
                console.log(doc);
                guild.cooldownTimes.push(doc);
            });
        });
    }

    async updateCooldownTime(guildID, command, newCooldownTime){
        //TODO: IMPLEMENT
        GuildConfig.findOneAndUpdate({"guildID": guildID})
    }
}


let guildDB = new GuildDatabase();

module.exports = guildDB;

