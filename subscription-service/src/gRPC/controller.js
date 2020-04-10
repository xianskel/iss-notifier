import Subscription from "../model/subscription-schema";

export const createSubscription = (call, callback) => {
  const sub = call.request;
  console.log(sub);

  if (!sub || !sub.email || !sub.lat || !sub.lon) {
    return callback(new Error("You must provide a valid request body."));
  }

  Subscription.update({ email: sub.email }, sub, {
    upsert: true
  })
    .then(() => callback(null, { success: true }))
    .catch(err => callback(err, { success: false }));
};

export const deleteSubscription = (call, callback) => {
  const body = call.request;

  if (!body || !body.email) {
    return callback(new Error("You must provide a email."));
  }

  Subscription.deleteOne(body)
    .then(() => callback(null, { success: true }))
    .catch(err => callback(err, { success: false }));
};
