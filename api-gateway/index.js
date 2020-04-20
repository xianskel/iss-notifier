import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import { config } from "./config";
import cors from "cors";
import { router } from "./routes";
import logger from "./src/logger";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use((req, res, next) => {
  req.headers["X-Correlation-ID"] = uuidv4();
  next();
});
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger.logRequestInfo);
app.use(logger.logRequestError);

app.use("/", router);

app.listen(config.server.port, () => {
  logger.info(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
