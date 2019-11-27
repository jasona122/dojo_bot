const mongoose = require("mongoose");
const GuildConfig = require("./models/guildConfig");
const Cooldown = require("./models/cooldownTimes");

class GuildDatabase{
    constructor(){

    }

    getGuildPrefix(guildID){
        GuildConfig.findOne({"guildID": guildID}, function(err, guild){
            if(err) throw err;
            return guild.prefix;
        });
    }

    changeGuildPrefix(guildID, newPrefix){
        GuildConfig.findOneAndUpdate({"guildID": guildID}, {"prefix": newPrefix},
        function(err, guild, res){
            if(err) throw err;
        });
    }

    setDefaultGuild(guildID){
        //only set if guild is not present
        GuildConfig.findOne({"guildID": guildID}, function(err, guild){
            if(err) throw err;
            if(!guild){
                let guildConfig = new GuildConfig({
                    _id: new mongoose.Schema.Types.ObjectId(),
                    guildID: guildID,
                    cooldownTimes: []
                });

                guildConfig.save(function(err, doc){
                    if(err) throw err;
                    console.log(doc.toString() + " has been added to DB");
                });
            } 
        });
    }

    getCommandCooldown(guildID, command){
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

    addCommandCooldown(guildID, command, cooldownTime){
        GuildConfig.findOne({"guildID": guildID})
        .populate("cooldownTimes")
        .exec(function(err, guild){
            if(err) throw err;
            
            for(let i = 0; i < guild.cooldownTimes.length; i++){
                let cooldown = guild.cooldownTimes[i];
                if(cooldown.command === command){
                    return false; //cooldown is already available
                }
            }

            let cooldown = new Cooldown({
                _id: new mongoose.Types.ObjectId(),
                command: command,
                duration: cooldownTime
            });

            cooldown.save(function(err, doc){
                if(err) throw err;
                guild.cooldownTimes.push(doc);
            });
        });
    }

    updateCooldownTime(guildID, command, newCooldownTime){
        //TODO: IMPLEMENT
        GuildConfig.findOneAndUpdate({"guildID": guildID})
    }
}


let guildDB = new GuildDatabase();


module.exports = guildDB;

