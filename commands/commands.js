const animalCommands = {
    "cat": require("./animals/cat"),
    "dog": require("./animals/dog")
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
    "addcooldown": require("./moderation/addCooldown")
}

let commands = {
    ...animalCommands,
    ...funCommands,
    ...moderationCommands
};

module.exports = commands;
