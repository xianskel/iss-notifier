import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { config } from "../../config";
import logger from "../logger";

const protoPath = path.join(__dirname, "../..", "protos", "subscription.proto");

const protoDefinition = protoLoader.loadSync(protoPath);
const packageDefinition = grpc.loadPackageDefinition(protoDefinition)
  .subscription;
const client = new packageDefinition.SubscriptionService(
  `${config.services.subscription.hostname}:${config.services.subscription.port}`,
  grpc.credentials.createInsecure()
);

export const createSubscription = (req, res) => {
  const correlationId = req.headers["X-Correlation-ID"];
  let metadata = new grpc.Metadata();
  metadata.add("correlationId", correlationId);

  client.createSubscription({ ...req.body }, metadata, (err, result) => {
    if (err) {
      logger.error("Error occured creating subscription: " + err.message, {
        correlationId: req.headers["X-Correlation-ID"],
        status: err.status,
      });
      res.status(500).json("An error occured!");
    } else {
      logger.info("Succesfully created subscription", {
        correlationId: req.headers["X-Correlation-ID"],
      });
      res.json(result);
    }
  });
};

export const deleteSubscription = (req, res) => {
  const correlationId = req.headers["X-Correlation-ID"];
  let metadata = new grpc.Metadata();
  metadata.add("correlationId", correlationId);

  client.deleteSubscription(req.body, metadata, (err, result) => {
    if (err) {
      logger.error("Error occured deleting subscription: " + err.message, {
        correlationId: req.headers["X-Correlation-ID"],
        status: res.status,
      });
      res.status(500).json("An error occured!");
    } else {
      logger.info("Succesfully deleted subscription", {
        correlationId: req.headers["X-Correlation-ID"],
      });
      res.json(result);
    }
  });
};
