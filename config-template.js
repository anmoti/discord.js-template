const { GatewayIntentBits } = require("discord.js");

module.exports = {
    bot: {
        prefix: "!",
        option: {
            intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ]
        },
        id: "0000000000000000000",
        token: "TOKEN",
    },
    command: {
        dir: "./commands"
    },
    console: {
        levels: ["error", "warn", "info"],
        timezone: "9"
    }
};