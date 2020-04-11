export const config = {
  environment: process.env.NODE_ENV || "dev",
  server: {
    port: process.env.PORT || 8081,
    hostname: "iss-service"
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
    publish: "notification-queue",
    consumer: "sub-update-queue"
  }
};
