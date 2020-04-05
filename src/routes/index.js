const users = require('./users');
//const tweets = require('./tweet');

module.exports = (router) => {
  users(router);
  //tweets(router);

  return router;
};
