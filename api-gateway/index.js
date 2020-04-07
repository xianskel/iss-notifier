import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import config from "./config";
import { router } from "./routes";

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
