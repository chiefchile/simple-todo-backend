"use strict";
const { createLogger, format, transports } = require('winston');
module.exports = createLogger({
    level: 'info',
    format: format.combine(
    //format.splat(),
    format.simple()),
    transports: [
        new transports.File({ filename: 'combined.log' }),
        new transports.Console()
    ]
});
//# sourceMappingURL=logger.js.map