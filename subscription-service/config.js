const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8082
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/subscription-service'
  }
}

module.exports = config
