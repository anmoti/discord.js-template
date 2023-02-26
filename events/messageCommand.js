const { Events } = require("discord.js");

module.exports = {
    event: Events.MessageCreate,
    execute: (message, logger) => {
        const { user, client, content, mentions } = message;
        const { commands, config } = client;

        let prefix, trimContent;
        for (let _prefix of commands.prefixes) {
            if (content.startsWith(_prefix)) {
                prefix = _prefix;
                trimContent = content.slice(prefix.length);
                break;
            };
        };
        if (typeof prefix === "undefined") {
            const mentionRe = new RegExp(`^<@!?${client.user.id}>`);
            if (config.command.mention && mentionRe.test(content)) {
                prefix = config.prefixes[0];
                trimContent = content.replace(mentionRe, "");
            } else return;
        };

        const [name, ...args] = trimContent.split(/\s+/);

        const command = {
            ...commands.search(name),
            prefix,
            args,
        };

        if (typeof command.message !== "function") return;

        if (!command) {
            //コマンドが間違ってる時の終了処理
            return;
        }

        if (command.cooldown) {
            const { cooldowns } = command;
            if (cooldowns.has(user.id)) {
                const remaining = cooldowns.get(user.id) - Date.now();
                if (0 < remaining) {
                    //クールダウン中の終了処理
                    return;
                };
            };
            cooldowns.set(user.id, Date.now() + command.cooldown);
        };

        message.command = command;

        try {
            command.message(message, command.logger);
        } catch (error) {
            command.logger.error(error);
            //エラー処理
        };
    },
};
