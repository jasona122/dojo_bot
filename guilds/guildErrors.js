class GuildNotFoundError extends Error{}
class GuildConfigError extends Error{}
class GuildAlreadyExistsError extends Error{}

module.exports = {
    GuildNotFoundError,
    GuildConfigError,
    GuildAlreadyExistsError
};