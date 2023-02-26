const embedUtils = require("../../libs/embedUtils.js");

module.exports = {
    builder(CommandBuilder) {
        CommandBuilder
        .setName("help")
        .setDescription("messageCommandの一覧とヘルプを表示します。");
    },
    cooldown: 0,
    async message(message, logger) {
        const { client, command: thisCommand } = message;
        const { commands } = client;

        if (thisCommand.args.length === 0) {
            const infos = {};
            commands.forEach((command) => {
                const { category } = command;
                if (typeof infos[category] === "undefined") infos[category] = [];
                infos[category].push(`**${thisCommand.prefix}${command.name}** - ${command.description}`);
            });
            const embed = embedUtils.default()
            .setTitle("messageCommand一覧");
            Object.keys(infos).forEach((category) => {
                embed.addFields({
                    name: category,
                    value: infos[category].join("\r")
                });
            });
            message.reply({ embeds: [embed] });
        } else {
            const command = commands.search(thisCommand.args[0]);
            if (!command)
                message.reply("その名前のmessageCommandが見つかりませんでした。");
            const embed = embedUtils.default()
            .setTitle(`[ ${thisCommand.prefix}${command.name} ]の詳細`)
            .setDescription(`\`\`\`json${command.json}\`\`\``);
            message.reply({ embeds: [embed] });
        };
    },
};
