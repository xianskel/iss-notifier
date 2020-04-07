import amqp from "amqplib-plus";
import { sendMail } from "./service";

export class CustomConsumer extends amqp.Consumer {
  constructor(conn, prepareFn) {
    super(conn, prepareFn);
  }

  processMessage(msg, channel) {
    console.log("Message headers:", JSON.stringify(msg.properties.headers));
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
