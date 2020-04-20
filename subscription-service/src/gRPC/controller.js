import Subscription from "../model/subscription-schema";
import logger from "../logger";

export const createSubscription = (call, callback) => {
  const sub = call.request;

  if (!sub || !sub.email || !sub.lat || !sub.lon) {
    logger.error("Invalid subscription: " + sub);
    return callback(new Error("You must provide a valid request body."));
  }

  logger.info("Updating subscription: " + sub);
  Subscription.update({ email: sub.email }, sub, {
    upsert: true,
  })
    .then(() => callback(null, { success: true }))
    .catch((err) => callback(err, { success: false }));
};

export const deleteSubscription = (call, callback) => {
  const body = call.request;

  if (!body || !body.email) {
    logger.error("Invalid deletion request");
    return callback(new Error("You must provide a email."));
  }

  logger.info("Deleting subscription: " + sub);
  Subscription.deleteOne(body)
    .then(() => callback(null, { success: true }))
    .catch((err) => callback(err, { success: false }));
};
