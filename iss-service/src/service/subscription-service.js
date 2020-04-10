import ISSApi from "../rest/iss-api";
import { AMQPConnection } from "../messaging/amqp-connection";

export class SubscriptionService {
  constructor(amqpConnection) {
    this.amqpConnection = amqpConnection;
  }
  async handleMessage(message) {
    try {
      const info = await new ISSApi().fetch({
        lat: message.lat,
        lon: message.lon
      });
      console.log("Info: " + info);
      this.amqpConnection.publish({ email: message.email, data: "info" });
    } catch (e) {
      console.error("An error occured fetching ISS info: " + e);
    }
  }
}
