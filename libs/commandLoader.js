const { Collection, SlashCommandBuilder, REST, Routes } = require("discord.js");
const fs = require("fs");
const customLogger = require("./customLogger.js");

module.exports = (client) => {
    const { config } = client;
    const { dir } = config.command;

    const logger = new customLogger("Command", client, client.logger);

    client.commands = new Collection();
    client.commands.prefix = config.command.prefix;
    client.commands.search = (name) => {
            return client.commands.get(name) || client.commands.find((command) => command.aliases && command.aliases.includes(name));
    };

    fs.readdirSync(dir).forEach(folder => {
        const folderPath = `${dir}/${folder}/`;
        const cateLogger = new customLogger(folder, client, logger);
        fs.readdirSync(folderPath).forEach(file => {
            if (!file.endsWith(".js")) return;
            const command = {
                ...require("../" + folderPath + file),
                category: folder
            };
            const builderData = new SlashCommandBuilder();
            command.builder(builderData);
            command.json = builderData.toJSON();
            Array("name", "description").forEach((eName) => {
                command[eName] = command.json[eName];
            });
            command.logger = new customLogger(command.name, client, cateLogger);
            if (command.cooldown) command.cooldowns = new Collection();
            client.commands.set(command.name, command);
            logger.info(`Loaded ${folder} > ${command.name}`);
        });
    });

    slashCommands = client.commands.map((command) => {
        return command.json;
    });

    new REST({ version: "10" })
    .setToken(config.bot.token)
    .put(
        Routes.applicationCommands(config.bot.id),
        { body: slashCommands }
    );
};