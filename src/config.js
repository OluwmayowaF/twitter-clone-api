module.exports = {
  development: {
    port: process.env.PORT || 3000,
    DBHost: process.env.MONGO_URI,
  },
  test: {
    port: process.env.PORT || 8001,
    DBHost: 'mongodb://127.0.0.1:27017/twitter-clone-test',
  },
  production: {
    port: process.env.PORT || 5000,
    DBHost: process.env.MONGO_URI,
  },

};
