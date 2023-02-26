const { Events } = require("discord.js");

module.exports = {
    event: Events.ClientReady,
    execute: (client, logger) => {
        logger.info(`Logged on ${client.user.tag}(${client.user.id}).`);
    },
};
