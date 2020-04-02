const controller = require('../controller/auth-controller');

module.exports = (router) => {
  router.route('/users')
    .post(controller.register);
};
