import winston, { format } from "winston";
import { config } from "../config";
import morgan from "morgan";

morgan.token("correlationId", function (req, res) {
  return req.headers["X-Correlation-ID"];
});

morgan.format(
  "http",
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :correlationId'
);

var logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: "DD/MMM/YYYY:hh:mm:ssZ" }),
    format.json()
  ),
  transports: [new winston.transports.Console(config.logs)],
  exitOnError: false,
});

logger.logRequestInfo = morgan("http", {
  stream: {
    write: (message, encoding) => {
      logger.info(message);
    },
  },
  skip: (req) => req.statusCode < 400,
});

logger.logRequestError = morgan("http", {
  stream: {
    write: (message, encoding) => {
      logger.error(message);
    },
  },
  skip: (req) => req.statusCode >= 400,
});

export default logger;
