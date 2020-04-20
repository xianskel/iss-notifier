import mongoose from "mongoose";
import { config } from "./config";
import { gRPCServer } from "./src/gRPC/server";
import { AMQPConnection } from "./src/messaging/amqp-connection";
import { SchedulerService } from "./src/scheduler/scheduler-service";
import logger from "./src/logger";

mongoose.connect(config.mongo.url).catch((err) => {
  logger.error("Could not connect to mongoDB");
});
new gRPCServer().start();
const amqpConnection = new AMQPConnection();
amqpConnection.createPublisher();
new SchedulerService(amqpConnection).scheduleUpdates();
