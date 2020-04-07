import amqp from "amqplib-plus";
import { config } from "./config";
import { CustomConsumer } from "./src/consumer";

const connection = new amqp.Connection(config.amqp);
const QUEUE = "notification-queue";

async function runCustomConsumer() {
  await connection.connect();
  const prepareConsumer = async ch => {
    await ch.assertQueue(QUEUE, { durable: false });
    await ch.prefetch(5);
  };
  const customConsumer = new CustomConsumer(connection, prepareConsumer);
  customConsumer.consume(QUEUE, {});
  console.log("Notification service is listening to: " + QUEUE);
}
runCustomConsumer();
