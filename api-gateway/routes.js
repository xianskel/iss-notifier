import { Router } from "express";
import { getLocationData } from "./src/gRPC/issRoutes";
import {
  createSubscription,
  deleteSubscription
} from "./src/gRPC/subscriptionRoutes";

export const router = new Router();

router.route("/").get((req, res) => {
  res.json({ message: "Api-gateway is up and running!" });
});

router.get("/iss", getLocationData);
router.post("/subscription", createSubscription);
router.delete("/subscription", deleteSubscription);
