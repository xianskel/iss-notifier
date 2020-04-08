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
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    throw new Error("Missing required query parameters");
  }
  service.getLocationData({ lat, lon }, (err, result) => {
    res.json(result);
  });
};
