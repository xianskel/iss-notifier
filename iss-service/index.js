import { config } from "./config";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { getLocationData } from "./src/controller";

const protoPath = path.join(__dirname, "..", "protos", "iss.proto");

const protoDefinition = protoLoader.loadSync(protoPath);
const issPackageDefintion = grpc.loadPackageDefinition(protoDefinition).iss;

const server = new grpc.Server();
server.addService(issPackageDefintion.ISSInfo.service, {
  getLocationData: getLocationData
});
server.bind(
  `localhost:${config.server.port}`,
  grpc.ServerCredentials.createInsecure()
);
server.start();

console.log("Server running on port " + config.server.port);
