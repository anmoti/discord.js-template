const { GatewayIntentBits } = require("discord.js");

module.exports = {
    bot: {
        option: {
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
            allowedMentions: {
                repliedUser: false,
            },
        },
        id: "0000000000000000000",
        token: "TOKEN",
    },
    command: {
        dir: "./commands",
        prefixes: ["!"],
        mention: true,
        default: "help", //mentionがtrueのときにメンションが送られてきたときに実行するコマンド
    },
    console: {
        levels: ["error", "warn", "info"],
        timezone: "9",
    },
    embed: {
        footer: "Developed by anmoti(2代目)#0512 (872633375343644763)",
    },
};
