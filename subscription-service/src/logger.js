import winston, { format } from "winston";
import { config } from "../config";

var logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: "DD/MMM/YYYY:hh:mm:ssZ" }),
    format.json()
  ),
  transports: [new winston.transports.Console(config.logs)],
  exitOnError: false,
});

export default logger;
