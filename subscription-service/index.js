import mongoose from "mongoose";
import config from "./config";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { createSubscription, deleteSubscription } from "./src/controller";

mongoose.connect(config.mongo.url);

const protoPath = path.join(__dirname, "..", "protos", "subscription.proto");

const protoDefinition = protoLoader.loadSync(protoPath);
const packageDefintion = grpc.loadPackageDefinition(protoDefinition)
  .subscription;

const server = new grpc.Server();
server.addService(packageDefintion.SubscriptionService.service, {
  createSubscription: createSubscription,
  deleteSubscription: deleteSubscription
});
server.bind(
  `localhost:${config.server.port}`,
  grpc.ServerCredentials.createInsecure()
);
server.start();

console.log("Server running on port " + config.server.port);
