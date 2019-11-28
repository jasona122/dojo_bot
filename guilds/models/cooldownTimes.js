const mongoose = require("mongoose");
const availableCommands = require("../../commands/commandNames.js");
const cooldownTimesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    command: {
        type: String,
        validate: {
            validator: function(commandName){
                return availableCommands[commandName]
            },
            message: "Command is not recognized"
        }
    },
    duration: {
        type: Number,
        validate: {
            validator: function(cooldownTime){
                return cooldownTime >= 0;
            },
            message: "Cooldown time cannot be negative"
        }
    }
});

module.exports = mongoose.model("CooldownTimes", cooldownTimesSchema);