const config = require("../config.js");

module.exports = function customLogger(name, logger) {
    config.logger.levels.forEach((level) => {
        this[level] = (text) => {
            //logger[level](`${names.map((name) => { return `[${name}]` }).join(" ")} ${text}`);
            logger[level](`[${name}]${text}`);
        };
    });
};
