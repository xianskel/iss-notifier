import { AMQPConnection } from "./src/messaging/amqp-connection";

new AMQPConnection().runNotificationConsumer();
