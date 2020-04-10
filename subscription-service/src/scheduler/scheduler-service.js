import { scheduleJob } from "node-schedule";
import Subscription from "../model/subscription-schema";

export class SchedulerService {
  constructor(amqpConnection) {
    this.amqpConnection = amqpConnection;
  }

  scheduleUpdates() {
    console.log("ISS updates are scheduled");
    scheduleJob("* /5 * * *", async () => {
      const subs = await Subscription.find({});
      subs.forEach(sub => this.amqpConnection.publish(sub));
    });
  }
}
