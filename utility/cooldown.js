let GuildDB = require("../guilds/guildDatabase");
let cooldowns = {};

function initCooldown(guildID, command){
    if(!cooldowns[guildID]){
        cooldowns[guildID] = {};
    }
    if(!cooldowns[guildID][command]){
        cooldowns[guildID][command] = new Set();
    }
}

function createCooldownObj(userID){
    let currentTime = new Date();
}

function formatCooldownObjToStr(cooldownObj){
    return JSON.stringify(cooldownObj);
}

function getTimestamp(cooldownStr){
    let cooldownObj = JSON.parse(cooldownStr);
    return cooldownObj.timestamp;
}

function hasCooldown(guildID, userID, command){
    initCooldown(guildID, command);
    return cooldowns[guildID][command].has(userID);
}

async function setCooldown(guildID, userID, command){
    //COULD STORE TIMESTAMP TO INDICATE TIME REMAINING
    let cooldownTime = await GuildDB.getCommandCooldown(guildID, command);
    if(!cooldownTime) return false; //no cooldown
    initCooldown(guildID, command);

    cooldowns[guildID][command].add(userID);
    setTimeout(function(){
        cooldowns[guildID][command].delete(userID)
    }, cooldownTime * 1000);
}

module.exports = {
    hasCooldown,
    setCooldown
}