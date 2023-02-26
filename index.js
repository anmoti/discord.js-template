const { Client } = require("discord.js");
const ddlogger = require("dd-logger");
const config = require("./config.js");

const client = new Client(config.bot.option);
client.logger = new ddlogger.Channel(config.logger);
client.config = config;
require("./libs/embedUtils.js").Setup(client);

const runFunc = [
    require("./libs/eventLoader.js"),
    require("./libs/commandLoader.js"),
];
runFunc.forEach((func) => func(client));

client.login(config.bot.token);
