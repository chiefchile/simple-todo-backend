"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.logger = winston_1.createLogger({
    level: "info",
    format: winston_1.format.combine(
    //format.splat(),
    winston_1.format.simple()),
    transports: [
        new winston_1.transports.File({ filename: "combined.log" }),
        new winston_1.transports.Console()
    ]
});
//# sourceMappingURL=logger.js.map