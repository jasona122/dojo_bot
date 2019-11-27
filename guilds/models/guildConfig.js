const mongoose = require("mongoose");
const guildConfigSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    prefix: String,
    cooldownTimes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CooldownTimes"
    }]
});

module.exports = mongoose.model("GuildConfig", guildConfigSchema);