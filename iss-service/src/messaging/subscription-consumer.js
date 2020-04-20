import amqp from "amqplib-plus";
import logger from "../logger";

export class SubscriptionConsumer extends amqp.Consumer {
  constructor(service, conn, prepareFn) {
    super(conn, prepareFn);
    this.service = service;
  }

  processMessage(msg, channel) {
    logger.info("Recieved message:", msg.content.toString());

    const content = JSON.parse(msg.content);
    //Validation logic
    if (content && content.email && content.lat && content.lon) {
      this.service.handleMessage(content);
    } else {
      logger.error("Message failed validation");
    }
    channel.ack(msg);
  }
}
