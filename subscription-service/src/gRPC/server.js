import { config } from "../../config";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { createSubscription, deleteSubscription } from "./controller";
import logger from "../logger";

const protoPath = path.join(
  __dirname,
  "../../",
  "protos",
  "subscription.proto"
);

export class gRPCServer {
  constructor() {
    this.protoDefinition = protoLoader.loadSync(protoPath);
    this.packageDefintion = grpc.loadPackageDefinition(
      this.protoDefinition
    ).subscription;
    this.server = new grpc.Server();
  }

  start = () => {
    this.server.addService(this.packageDefintion.SubscriptionService.service, {
      createSubscription: createSubscription,
      deleteSubscription: deleteSubscription,
    });
    this.server.bind(
      `${config.server.host}:${config.server.port}`,
      grpc.ServerCredentials.createInsecure()
    );
    this.server.start();

    logger.info("Subscription Service is running on port " + config.server.port);
  };
}
