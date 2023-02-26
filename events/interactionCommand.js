const { Events } = require("discord.js");

module.exports = {
    event: Events.InteractionCreate,
    execute: (interaction, logger) => {
        const { commands } = interaction.client;
        const { user } = interaction;

        if (!interaction.isChatInputCommand()) return;

        const thisInfo = commands.search(interaction.commandName);

        if (thisInfo.cooldown) {
            const { cooldowns } = thisInfo;
            if (cooldowns.has(user.id)) {
                const remaining = cooldowns.get(user.id) - Date.now();
                if (0 < remaining) {
                    //クールダウン中の終了処理
                    return;
                };
            };
            cooldowns.set(user.id, Date.now() + thisInfo.cooldown);
        };

        try {
            thisInfo.interaction(interaction, thisInfo.logger);
        } catch (error) {
            thisInfo.logger.error(error);
            //エラー処理
        };
    }
};