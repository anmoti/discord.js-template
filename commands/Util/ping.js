module.exports = {
    builder(SlashCommandBuilder) {
        SlashCommandBuilder
        .setName("ping")
        .setDescription("このbotのpingを測定します。")
    },
    cooldown: 0, //ms
    message(message, args, logger) {
        message.channel.send("pong");
    },
    interaction(interaction, logger) {
        interaction.reply("pong");
    }
};