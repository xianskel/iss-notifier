import amqp from "amqplib-plus";
import { sendMail } from "../email-service";

export class NotificationConsumer extends amqp.Consumer {
  constructor(conn, prepareFn) {
    super(conn, prepareFn);
  }

  processMessage(msg, channel) {
    console.log("Message body:", msg.content.toString());

    const content = JSON.parse(msg.content);

    //Validation logic
    if (content && content.email && content.data) {
      sendMail(content);
    } else {
      console.log("Message failed validation");
    }
    channel.ack(msg);
  }
}
