//file to store all valid command names;
//used by setting cooldowns to avoid circular dependency
//fix if better design is found
let names = {
    "cat": true,
    "dog": true,
    "say": true,
    "8ball": true,
    "ping": true,
    "dadjoke": true,
    "prefix": true,
    "addrole": true,
    "removerole": true,
}

module.exports = names;