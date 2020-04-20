export const config = {
  environment: process.env.NODE_ENV || "dev",
  server: {
    port: process.env.PORT || 8082,
    host: process.env.SUBSCRIPTION_HOST || "subscription-service",
  },
  mongo: {
    url: process.env.MONGO_DB_URI || "mongodb://localhost/subscription-service",
  },
  amqp: {
    host: process.env.AMQP_HOST || "localhost",
    port: process.env.AMQP_PORT || 5672,
    user: "guest",
    pass: "guest",
    vhost: "/",
    heartbeat: 60,
  },
  queues: {
    subscription: "sub-update-queue",
  },
  schedule: process.env.SCHEDULE || "* /5 * * *",
  logs: {
    level: "info",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
