import { config } from "../../config";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { getLocationData } from "./controller";
import logger from "../logger";

const protoPath = path.join(__dirname, "../..", "protos", "iss.proto");

export class gRPCServer {
  constructor() {
    this.protoDefinition = protoLoader.loadSync(protoPath);
    this.packageDefintion = grpc.loadPackageDefinition(
      this.protoDefinition
    ).iss;
    this.server = new grpc.Server();
  }

  start = () => {
    this.server.addService(this.packageDefintion.ISSInfo.service, {
      getLocationData: getLocationData
    });
    this.server.bind(
      `:${config.server.port}`,
      grpc.ServerCredentials.createInsecure()
    );
    this.server.start();

    logger.info("Server running on port: " + config.server.port);
  };
}
