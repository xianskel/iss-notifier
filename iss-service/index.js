import { gRPCServer } from "./src/gRPC/server";
import { AMQPConnection } from "./src/messaging/amqp-connection";
import { SubscriptionService } from "./src/service/subscription-service";

new gRPCServer().start();
const amqpConnection = new AMQPConnection();
const service = new SubscriptionService(amqpConnection);
amqpConnection.startConsumer(service);
amqpConnection.createPublisher();
