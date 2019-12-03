let GuildDB = require("../guilds/guildDatabase");
let cooldowns = {};

function initCooldown(guildID, command){
    if(!cooldowns[guildID]){
        cooldowns[guildID] = {};
    }
    if(!cooldowns[guildID][command]){
        cooldowns[guildID][command] = new Map();
    }
}

function createCooldownObj(cooldownTime){
    let currentTime = new Date().getTime();
    let cooldownObj = {
        timestamp: currentTime,
        cooldownTime: cooldownTime
    };
    return cooldownObj;
}

function getTimeRemaining(cooldownObj){
    let currentTime = new Date().getTime();
    let cooldownEndTime = cooldownObj.timestamp + cooldownObj.cooldownTime;
    let timeLeft = cooldownEndTime - currentTime; //in milliseconds
    return timeLeft;
}

function hasCooldown(guildID, userID, command){
    initCooldown(guildID, command);
    return cooldowns[guildID][command].has(userID);
}

function getCooldownTime(guildID, userID, command){
    initCooldown(guildID, command);
    let cooldownObj = cooldowns[guildID][command].get(userID);
    return getTimeRemaining(cooldownObj);
}

async function setCooldown(guildID, userID, command){
    //COULD STORE TIMESTAMP TO INDICATE TIME REMAINING
    let cooldownTime = await GuildDB.getCommandCooldown(guildID, command);
    if(!cooldownTime) return false; //no cooldown
    initCooldown(guildID, command);

    let cooldownObj = createCooldownObj(cooldownTime * 1000);
    cooldowns[guildID][command].set(userID, cooldownObj);
    setTimeout(function(){
        cooldowns[guildID][command].delete(userID);
    }, cooldownTime * 1000);
}

module.exports = {
    hasCooldown,
    setCooldown,
    getCooldownTime
}