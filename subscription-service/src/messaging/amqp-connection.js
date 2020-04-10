import amqp from "amqplib-plus";
import { config } from "../../config";

export class AMQPConnection {
  publisher;

  constructor() {
    this.connection = new amqp.Connection(config.amqp);
    this.PUBLISH_QUEUE = "sub-update-queue";
  }

  async createPublisher() {
    await this.connection.connect();
    const preparePublisher = async ch => {
      await ch.assertQueue(this.PUBLISH_QUEUE, { durable: false });
      console.log("Publisher ready for " + this.PUBLISH_QUEUE);
    };
    this.publisher = new amqp.Publisher(this.connection, preparePublisher);
  }

  async publish(message) {
    if (!this.publisher) {
      await createPublisher();
    }
    await this.publisher.sendToQueue(
      this.PUBLISH_QUEUE,
      new Buffer.from(JSON.stringify(message)),
      {}
    );
    console.log("Message published to " + this.PUBLISH_QUEUE + "\n" + message);
  }
}
