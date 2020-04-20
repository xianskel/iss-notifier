export const config = {
  environment: process.env.NODE_ENV || "dev",
  server: {
    port: process.env.PORT || 8081,
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
    publish: "notification-queue",
    consumer: "sub-update-queue",
  },
  logs: {
    level: "info",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
