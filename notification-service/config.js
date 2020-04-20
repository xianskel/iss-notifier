export const config = {
  environment: process.env.NODE_ENV || "dev",
  email: {
    service: "gmail",
    auth: {
      user: "iss.notifier@gmail.com",
      pass: "pass55635688836",
    },
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
    notification: "notification-queue",
  },
  logs: {
    level: "info",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
