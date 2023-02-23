const { DiscordSnowflake } = require('@sapphire/snowflake');//14.7.2 で削除
module.exports = {
    builder(SlashCommandBuilder) {
        SlashCommandBuilder
        .setName("ping")
        .setDescription("このbotのpingを測定します。")
    },
    cooldown: 0, //ms
    async message(message, args, logger) {
        const finaly = await ping(message);
        finaly[0].edit(finaly[1]);
    },
    async interaction(interaction, logger) {
        const finaly = await ping(interaction);
        interaction.editReply(finaly[1]);
    }
};

async function ping(obj) {
    const base = ":ping_pong:Pong!\r"
    const reply = await obj.reply(base + "取得中...");
    const final = base + `Websocket: ${obj.client.ws.ping}ms\rAPI Endpoint: ${Date.now() - DiscordSnowflake.timestampFrom(reply.id)}ms`; //14.7.2で DiscordSnow.... を reply.createdTimestamp に変更
    console.log(reply)
    return [reply, final];
}