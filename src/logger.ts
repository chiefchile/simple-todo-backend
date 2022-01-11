import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    //format.splat(),
    // format.simple(),
    format.prettyPrint()
  ),
  transports: [
    new transports.File({ filename: "combined.log" }),
    new transports.Console(),
  ],
});
