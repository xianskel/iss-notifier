export const createSubscription = (call, callback) => {
  const location = call.request;
  console.log(location);

  if (!location) {
    return callback(new Error("You must provide a location."));
  }

  callback(null, { success: true });
};

export const deleteSubscription = (call, callback) => {
  const location = call.request;
  console.log(location);

  if (!location) {
    return callback(new Error("You must provide a location."));
  }

  callback(null, { success: true });
};
