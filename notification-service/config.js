export const config = {
  environment: process.env.NODE_ENV || "dev",
  email: {
    service: "gmail",
    auth: {
      user: "iss.notifier@gmail.com",
      pass: "pass55635688836"
    }
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
    notification: "notification-queue"
  },
  server: {
    port: process.env.PORT || 8083
  }
};
