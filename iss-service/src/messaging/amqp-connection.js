import amqp from "amqplib-plus";
import { config } from "../../config";
import { SubscriptionConsumer } from "./subscription-consumer";

export class AMQPConnection {
  publisher;

  constructor() {
    this.connection = new amqp.Connection(config.amqp);
    this.PUBLISH_QUEUE = "notification-queue";
    this.CONSUMER_QUEUE = "sub-update-queue";
  }

  async startConsumer(service) {
    try {
      await this.connection.connect();
      const prepareConsumer = async ch => {
        await ch.assertQueue(this.CONSUMER_QUEUE, { durable: false });
        await ch.prefetch(5);
      };
      const customConsumer = new SubscriptionConsumer(
        service,
        this.connection,
        prepareConsumer
      );
      customConsumer.consume(this.CONSUMER_QUEUE, {});
      console.log(
        "Subscription service is listening to: " + this.CONSUMER_QUEUE
      );
    } catch (e) {
      console.error(
        "An error occured consuming: " + this.CONSUMER_QUEUE + "\n" + e
      );
    }
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
    console.log("Now:" + this.publisher);
    if (!this.publisher) {
      await createPublisher();
    }
    await this.publisher.sendToQueue(
      this.PUBLISH_QUEUE,
      new Buffer.from(JSON.stringify(message)),
      {}
    );
  }
}
