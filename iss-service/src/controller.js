import ISSApi from "./iss-api";

export const getLocationData = (call, callback) => {
  const location = call.request;
  console.log(location);

  if (!location) {
    return callback(new Error("You must provide a location."));
  }

  new ISSApi()
    .fetch(location)
    .then(res => {
      callback(null, { passes: res.data.response });
    })
    .catch(err => {
      callback("An error occured", null);
    });
};
