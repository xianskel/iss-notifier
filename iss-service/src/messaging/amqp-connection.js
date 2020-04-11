import amqp from "amqplib-plus";
import { config } from "../../config";
import { SubscriptionConsumer } from "./subscription-consumer";

export class AMQPConnection {
  publisher;

  constructor() {
    this.connection = new amqp.Connection(config.amqp);
  }

  async startConsumer(service) {
    try {
      await this.connection.connect();
      const prepareConsumer = async ch => {
        await ch.assertQueue(config.queues.consumer, {
          durable: false
        });
        await ch.prefetch(5);
      };
      const customConsumer = new SubscriptionConsumer(
        service,
        this.connection,
        prepareConsumer
      );
      customConsumer.consume(config.queues.consumer, {});
      console.log(
        "Subscription service is listening to: " + config.queues.consumer
      );
    } catch (e) {
      console.error(
        "An error occured consuming: " + config.queues.consumer + "\n" + e
      );
    }
  }

  async createPublisher() {
    await this.connection.connect();
    const preparePublisher = async ch => {
      await ch.assertQueue(config.queues.publish, { durable: false });
      console.log("Publisher ready for " + config.queues.publish);
    };
    this.publisher = new amqp.Publisher(this.connection, preparePublisher);
  }

  async publish(message) {
    console.log("Now:" + this.publisher);
    if (!this.publisher) {
      await createPublisher();
    }
    await this.publisher.sendToQueue(
      config.queues.publish,
      new Buffer.from(JSON.stringify(message)),
      {}
    );
  }
}
