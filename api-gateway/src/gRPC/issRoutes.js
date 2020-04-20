import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { config } from "../../config";
import logger from "../logger";

const protoPath = path.join(__dirname, "../..", "protos", "iss.proto");

const issProtoDefinition = protoLoader.loadSync(protoPath);
const issPackageDefinition = grpc.loadPackageDefinition(issProtoDefinition).iss;
const service = new issPackageDefinition.ISSInfo(
  `${config.services.iss.hostname}:${config.services.iss.port}`,
  grpc.credentials.createInsecure()
);

export const getLocationData = (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    throw new Error("Missing required query parameters");
  }
  const correlationId = req.headers["X-Correlation-ID"];
  let metadata = new grpc.Metadata();
  metadata.add("X-Correlation-ID", correlationId);

  service.getLocationData({ lat, lon }, metadata, (err, result) => {
    if (err) {
      logger.error("Error occured fetching location data: " + err.message, {
        correlationId,
        status: err.status,
      });
      res.status(500).json("An error occured!");
    } else {
      logger.info("Succesfully retrieved location data", {
        correlationId,
      });
      res.json(result);
    }
  });
};
