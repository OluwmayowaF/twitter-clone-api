const users = require('./users');
const tweets = require('./tweets');

module.exports = (router) => {
  users(router);
  tweets(router);

  return router;
};
