import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const protoPath = path.join(__dirname, "../../..", "protos", "iss.proto");

const issProtoDefinition = protoLoader.loadSync(protoPath);
const issPackageDefinition = grpc.loadPackageDefinition(issProtoDefinition).iss;
const service = new issPackageDefinition.ISSInfo(
  "localhost:8081",
  grpc.credentials.createInsecure()
);

export const getLocationData = (req, res) => {
  service.getLocationData({ latitude: 1, longitude: 2 }, (err, result) => {
    console.log(result);
    res.json(result);
  });
};
