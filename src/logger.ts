import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    //format.splat(),
    format.simple()
  ),
  transports: [
    new transports.File({ filename: "combined.log" }),
    new transports.Console()
  ]
});
