export const config = {
  environment: process.env.NODE_ENV || "dev",
  server: {
    port: process.env.PORT || 8082,
    host: "subscription-service"
  },
  mongo: {
    url: process.env.MONGO_DB_URI || "mongodb://localhost/subscription-service"
  },
  amqp: {
    host: "localhost",
    port: 5672,
    user: "guest",
    pass: "guest",
    vhost: "/",
    heartbeat: 60
  },
  queues: {
    subscription: "sub-update-queue"
  },
  schedule: '* /5 * * *'
};
