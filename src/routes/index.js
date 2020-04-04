import { ErrorHandler } from '../utils/error';

const users = require('./users');

module.exports = (router) => {
  users(router);

  return router;
};
