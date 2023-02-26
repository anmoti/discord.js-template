const fs = require("fs");
const customLogger = require("./customLogger.js");

module.exports = (client) => {
    const { dir } = client.config.event;
    const logger = new customLogger("Event", client.logger);

    fs.readdirSync(dir).forEach((fileName) => {
        if (!fileName.endsWith(".js")) return;

        const file = require(`../${dir}/${fileName}`);

        client.on(file.event, (...args) => {
            file.execute(...args, new customLogger(file.event, logger));
        });
        logger.info(`Loaded ${fileName} > ${file.event}`);
    });
};
