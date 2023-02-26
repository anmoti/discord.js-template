const { DiscordSnowflake } = require("@sapphire/snowflake"); //14.7.2 で削除

module.exports = {
    builder(CommandBuilder) {
        CommandBuilder
        .setName("ping")
        .setDescription("pingを測定します。");
    },
    cooldown: 0, //ms
    async message(message, logger) {
        const { reply, text } = await ping(message);
        reply.edit(text);
    },
    async interaction(interaction, logger) {
        const { text } = await ping(interaction);
        interaction.editReply(text);
    },
};

async function ping(obj) {
    const base = ":ping_pong:Pong!\r";
    const reply = await obj.reply(base + "取得中...");
    const final = base + [
        `Websocket: ${obj.client.ws.ping}ms`,
        `API Endpoint: ${Date.now() - DiscordSnowflake.timestampFrom(reply.id)}ms`
    ];//14.7.2で DiscordSnow.... を reply.createdTimestamp に変更
    return { reply, text };
};