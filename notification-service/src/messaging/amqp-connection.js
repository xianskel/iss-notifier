import amqp from "amqplib-plus";
import { config } from "../../config";
import { NotificationConsumer } from "./notification-consumer";

export class AMQPConnection {
  constructor() {
    this.connection = new amqp.Connection(config.amqp);
    this.QUEUE = "notification-queue";
  }
  async runNotificationConsumer() {
    try {
      await this.connection.connect();
      const prepareConsumer = async ch => {
        await ch.assertQueue(this.QUEUE, { durable: false });
        await ch.prefetch(5);
      };
      const customConsumer = new NotificationConsumer(
        this.connection,
        prepareConsumer
      );
      customConsumer.consume(this.QUEUE, {});
      console.log("Notification service is listening to: " + this.QUEUE);
    } catch (e) {
      console.error("An error occured consuming: " + this.QUEUE + "\n" + e);
    }
  }
}
