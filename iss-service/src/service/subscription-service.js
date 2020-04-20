import ISSApi from "../rest/iss-api";
import logger from "../logger";

export class SubscriptionService {
  constructor(amqpConnection) {
    this.amqpConnection = amqpConnection;
  }
  async handleMessage(message) {
    try {
      const info = await new ISSApi().fetch({
        lat: message.lat,
        lon: message.lon,
      });
      this.amqpConnection.publish({ email: message.email, data: "info" });
    } catch (e) {
      logger.error("An error occured fetching ISS info: " + e);
    }
  }
}
