//file to store all valid command names;
//used by setting cooldowns to avoid circular dependency
//fix if better design is found
let names = {
    "bird": true,
    "cat": true,
    "dog": true,
    "elephant": true,
    "fox": true,
    "say": true,
    "8ball": true,
    "ping": true,
    "dadjoke": true,
    "prefix": true,
    "addrole": true,
    "removerole": true,
    "addcooldown": true,
    "listcooldowns": true,
    "kick": true,
    "help": true
}

module.exports = names;