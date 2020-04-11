import amqp from "amqplib-plus";
import { config } from "../../config";
import { NotificationConsumer } from "./notification-consumer";

export class AMQPConnection {
  constructor() {
    this.connection = new amqp.Connection(config.amqp);
  }
  async runNotificationConsumer() {
    try {
      await this.connection.connect();
      const prepareConsumer = async ch => {
        await ch.assertQueue(config.queues.notification, { durable: false });
        await ch.prefetch(5);
      };
      const customConsumer = new NotificationConsumer(
        this.connection,
        prepareConsumer
      );
      customConsumer.consume(config.queues.notification, {});
      console.log(
        "Notification service is listening to: " + config.queues.notification
      );
    } catch (e) {
      console.error(
        "An error occured consuming: " + config.queues.notification + "\n" + e
      );
    }
  }
}
