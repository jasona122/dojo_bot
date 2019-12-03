const animalCommands = {
    "bird": require("./animals/bird"),
    "cat": require("./animals/cat"),
    "dog": require("./animals/dog"),
    "elephant": require("./animals/elephant"),
    "fox": require("./animals/fox")
}

const funCommands = {
    "say": require("./fun/botSay"),
    "8ball": require("./fun/eightBall"),
    "ping": require("./fun/ping"),
    "dadjoke": require("./fun/dadJokes")
}

const moderationCommands = {
    "prefix": require("./moderation/changePrefix"),
    "addrole": require("./moderation/addRole"),
    "removerole": require("./moderation/removeRole"),
    "addcooldown": require("./moderation/addCooldown"),
    "listcooldowns": require("./moderation/listCooldowns"),
    "kick": require("./moderation/kick")
}

let commands = {
    ...animalCommands,
    ...funCommands,
    ...moderationCommands,
    "help": true
};

module.exports = {
    animal: animalCommands,
    fun: funCommands,
    moderation: moderationCommands,
    commands: commands
}
