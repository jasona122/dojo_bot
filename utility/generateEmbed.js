const Discord = require("discord.js");
const defaultColor = "#0099ff";

function regularEmbed(title, description){
    return new Discord.RichEmbed()
        .setColor(defaultColor)
        .setTitle(title)
        .setDescription(description);
}

function commandHelpEmbed(title, commandObj, description){
    let commandHelpMessage = regularEmbed(title, description);
    for(let prop in commandObj){
        let commandInfo = commandObj[prop].info;
        let info = commandInfo.description + "\nExample: " + commandInfo.usage;
        commandHelpMessage.addField(commandInfo.name, info);
    }
    return commandHelpMessage;
}

function closerEmbed(title, description, footer){
    let closer = regularEmbed(title, description);
    closer.setFooter(footer).setTimestamp();
    return closer;
}

module.exports = {
    regular: regularEmbed,
    commandHelp: commandHelpEmbed,
    closer: closerEmbed
}