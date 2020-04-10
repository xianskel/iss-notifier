import amqp from "amqplib-plus";

export class SubscriptionConsumer extends amqp.Consumer {
  constructor(service, conn, prepareFn) {
    super(conn, prepareFn);
    this.service = service;
  }

  processMessage(msg, channel) {
    console.log("Message body:", msg.content.toString());

    const content = JSON.parse(msg.content);
    //Validation logic
    if (content && content.email && content.lat && content.lon) {
      this.service.handleMessage(content);
    } else {
      console.log("Message failed validation");
    }
    channel.ack(msg);
  }
}
