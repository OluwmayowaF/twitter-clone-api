const mongoose = require('mongoose');

// const uri = 'mongodb://test:password12345@cluster0-shard-00-00-7pndu.mongodb.net:27017,cluster0-shard-00-01-7pndu.mongodb.net:27017,cluster0-shard-00-02-7pndu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
const uri = 'mongodb://127.0.0.1:27017/twitter-clone-test';

module.exports = {

  connect: async () => {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  },

  /**
 * Drop database, close the connection and stop mongod.
 */
  closeDatabase: async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  },


  /**
 * Remove all the data for all db collections.
 */
  clearDatabase: async (collection) => {
    await mongoose.connection.collection(collection).deleteMany({});
  },

};
