let AllGuildData = require("../guilds/guildData");

function hasCooldown(guildID, userID, command){
    let guildConfig = AllGuildData.getGuildConfig(guildID);
    return guildConfig.hasCooldown(command, userID);
}

function setCooldown(guildID, userID, command, cooldownTime){
    let guildConfig = AllGuildData.getGuildConfig(guildID);
    guildConfig.addCooldown(command, userID);
    setTimeout(function(){
        guildConfig.removeCooldown(command, userID);
    }, cooldownTime * 1000);
}

module.exports = {
    hasCooldown,
    setCooldown
}