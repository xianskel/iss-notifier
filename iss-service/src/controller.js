export const getLocationData = (call, callback) => {
  const location = call.request;
  console.log(location);

  if (!location) {
    return callback(new Error("You must provide a location."));
  }

  callback(null, { date: "gfsgkasd" });
};
