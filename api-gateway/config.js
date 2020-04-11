export const config = {
  environment: process.env.NODE_ENV || "dev",
  server: {
    port: process.env.PORT || 8080
  },
  services: {
    iss: {
      hostname: "iss-service",
      port: 8081
    },
    subscription: {
      hostname: "subscription-service",
      port: 8082
    }
  }
};

module.exports = config;
