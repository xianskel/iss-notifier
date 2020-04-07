import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const protoPath = path.join(
  __dirname,
  "../../..",
  "protos",
  "subscription.proto"
);

const protoDefinition = protoLoader.loadSync(protoPath);
const packageDefinition = grpc.loadPackageDefinition(protoDefinition)
  .subscription;
const client = new packageDefinition.SubscriptionService(
  "localhost:8082",
  grpc.credentials.createInsecure()
);

export const createSubscription = (req, res) => {
  client.createSubscription(
    { latitude: 1, longitude: 2, email: "test", schedule: 1 },
    (err, result) => {
      console.log(result);
      res.json(result);
    }
  );
};

export const deleteSubscription = (req, res) => {
  client.deleteSubscription({ email: "test" }, (err, result) => {
    console.log(result);
    res.json(result);
  });
};
