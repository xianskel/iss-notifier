import ISSApi from "../rest/iss-api";
import logger from "../logger";

export const getLocationData = (call, callback) => {
  const location = call.request;
  const correlationId = call.metadata.get("X-Correlation-ID");

  if (!location) {
    logger.error("Invalid location: " + location, {
      correlationId,
    });
    return callback(new Error("You must provide a location."));
  }

  new ISSApi()
    .fetch(location)
    .then((res) => {
      logger.info("Retireved location data from ISS Api: " + location, {
        correlationId,
        status: res.status,
      });
      callback(null, { passes: res.data.response });
    })
    .catch((err) => {
      logger.error(
        "Error occured fetching location data from ISS Api: " + location,
        {
          correlationId,
          status: res.status,
        }
      );
      callback("An error occured", null);
    });
};
