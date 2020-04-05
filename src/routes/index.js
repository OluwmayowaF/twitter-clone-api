const users = require('./users');
const tweets = require('./tweets');
const follows = require('./follow');

module.exports = (router) => {
  users(router);
  tweets(router);
  follows(router);

  return router;
};
