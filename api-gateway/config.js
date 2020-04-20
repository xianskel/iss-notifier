export const config = {
  environment: process.env.NODE_ENV || "dev",
  server: {
    port: process.env.PORT || 8080,
  },
  services: {
    iss: {
      hostname: process.env.ISS_HOST || "localhost",
      port: process.env.ISS_PORT || 8081,
    },
    subscription: {
      hostname: process.env.SUB_HOST || "localhost",
      port: process.env.SUB_PORT || 8082,
    },
  },
  logs: {
    level: "info",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

module.exports = config;
