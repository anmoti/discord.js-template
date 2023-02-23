const { Events } = require("discord.js");

module.exports = {
    event: Events.MessageCreate,
    execute: (message, logger) => {
        const { commands, config } = message.client;
        const { user } = message;
        if(!message.content.startsWith(commands.prefix)) return;

        const args = message.content.slice(config.command.prefix.length).split(/( |　)+/);
        const name = args.shift();
        
        const thisInfo = commands.search(name);
        if(!thisInfo) {
            //コマンドが間違ってる時の終了処理
            return;
        };

        if(thisInfo.cooldown) {
            const { cooldowns } = thisInfo;
            if(cooldowns.has(user.id)) {
                const remaining = cooldowns.get(user.id) - Date.now();
                if(0 < remaining) {
                    //クールダウン中の終了処理
                    return;
                };
            };
            cooldowns.set(user.id, Date.now() + thisInfo.cooldown);
        };

        try {
            thisInfo.message(message, args, thisInfo.logger);
        } catch(error) {
            thisInfo.logger.error(error);
            //エラー処理
        };
    }
};