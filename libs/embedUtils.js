const { EmbedBuilder } = require("discord.js");

let config;

module.exports = {
    Setup(client) {
        config = client.config;
    },
    default() {
        const embed = new EmbedBuilder()
        .setFooter({ text: config.embed.footer });

        return embed;
    }
};