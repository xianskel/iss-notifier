import { scheduleJob } from "node-schedule";
import Subscription from "../model/subscription-schema";
import { config } from "../../config";
import logger from "../logger";

export class SchedulerService {
  constructor(amqpConnection) {
    this.amqpConnection = amqpConnection;
  }

  scheduleUpdates() {
    logger.info("ISS updates are scheduled for: " + config.schedule);
    scheduleJob(config.schedule, async () => {
      logger.info("Schedule has triggered. Fetching subscriptions");
      const subs = await Subscription.find({});
      subs.forEach((sub) => this.amqpConnection.publish(sub));
    });
  }
}
