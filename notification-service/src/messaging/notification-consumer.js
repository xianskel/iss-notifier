import amqp from "amqplib-plus";
import { sendMail } from "../email-service";
import logger from "../logger";

export class NotificationConsumer extends amqp.Consumer {
  constructor(conn, prepareFn) {
    super(conn, prepareFn);
  }

  processMessage(msg, channel) {
    logger.info("Message recived:", msg.content.toString());

    const content = JSON.parse(msg.content);

    //Validation logic
    if (content && content.email && content.data) {
      sendMail(content);
    } else {
      logger.error("Message failed validation: " + message);
    }
    channel.ack(msg);
  }
}
