const mongoose = require("mongoose");
const GuildConfig = require("./models/guildConfig");
const Cooldown = require("./models/cooldownTimes");

class GuildDatabase{
    constructor(){

    }

    async getGuildPrefix(guildID){
        let guild = await GuildConfig.findOne({"guildID": guildID});
        if(!guild) return "!";
        return guild.prefix;
    }

    async changeGuildPrefix(guildID, newPrefix){
        await GuildConfig.findOneAndUpdate({"guildID": guildID}, {"prefix": newPrefix},
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
        let guildData = await GuildConfig.findOne({"guildID": guildID})
        .populate("cooldownTimes");
        let cooldowns = guildData.cooldownTimes;

        for(let i = 0; i < cooldowns.length; i++){
            let cooldown = cooldowns[i];
            if(cooldown.command === command){
                return cooldown.duration;
            }
        }
        return false;
    }

    async hasCommandCooldown(guildID, command){
        let guildData = await GuildConfig.findOne({"guildID": guildID})
        .populate("cooldownTimes");
        let cooldowns = guildData.cooldownTimes;

        for(let i = 0; i < cooldowns.length; i++){
            let cooldown = cooldowns[i];
            if(cooldown.command === command){
                return true;
            }
        }
        return false;
    }

    async addCommandCooldown(guildID, command, cooldownTime){
        //precondition: command and cooldownTime are valid
        await GuildConfig.findOne({"guildID": guildID})
        .populate("cooldownTimes")
        .exec(async function(err, guild){
            if(err) throw err;

            let cooldown = new Cooldown({
                _id: new mongoose.Types.ObjectId(),
                command: command,
                duration: cooldownTime
            });

            await cooldown.save(async function(err, doc){
                if(err) throw err;
                guild.cooldownTimes.push(doc);
                await guild.save();
            });
        });
    }

    async updateCooldownTime(guildID, command, newCooldownTime){
        await GuildConfig.findOne({"guildID": guildID})
        .populate("cooldownTimes")
        .exec(async function(err, guild){
            if(err) throw err;

            for(let i = 0; i < guild.cooldownTimes.length; i++){
                let cooldown = guild.cooldownTimes[i];
                if(cooldown.command === command){
                    cooldown.duration = newCooldownTime;
                    await guild.save();
                    Cooldown.findOneAndUpdate({"_id": cooldown._id}, {"duration": newCooldownTime}, function(err){
                        if(err) throw err;
                    });
                }
            }
        });
    }

    async getAllCooldowns(guildID){
        let guild = await GuildConfig.findOne({"guildID": guildID})
        .populate("cooldownTimes");
        return guild.cooldownTimes;
    }
}

let guildDB = new GuildDatabase();
module.exports = guildDB;

