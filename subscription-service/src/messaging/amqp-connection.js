import amqp from "amqplib-plus";
import { config } from "../../config";

export class AMQPConnection {
  publisher;

  constructor() {
    this.connection = new amqp.Connection(config.amqp);
  }

  async createPublisher() {
    await this.connection.connect();
    const preparePublisher = async ch => {
      await ch.assertQueue(config.queues.subscription, { durable: false });
      console.log("Publisher ready for " + config.queues.subscription);
    };
    this.publisher = new amqp.Publisher(this.connection, preparePublisher);
  }

  async publish(message) {
    if (!this.publisher) {
      await createPublisher();
    }
    await this.publisher.sendToQueue(
      config.queues.subscription,
      new Buffer.from(JSON.stringify(message)),
      {}
    );
    console.log(
      "Message published to " + config.queues.subscription + "\n" + message
    );
  }
}
