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
  client.createSubscription(req.body, (err, result) => {
    if (err) {
      res.status(500).json("An error occured!");
    } else {
      console.log(result);
      res.json(result);
    }
  });
};

export const deleteSubscription = (req, res) => {
  client.deleteSubscription(req.body, (err, result) => {
    if (err) {
      res.status(500).json("An error occured!");
    } else {
      console.log(result);
      res.json(result);
    }
  });
};
