import controller from '../controller/auth-controller';
import middleware from '../middleware/auth';

module.exports = (router) => {
  router.route('/users') // Registration Route
    .post(controller.register);
  router.route('/users/login') // Login Route
    .post(controller.login);
  router.route('/user') // Get current User
    .get(middleware.validateToken, controller.getLoggedInUser);
  router.route('/user/:id') // Get current User
    .get(middleware.validateToken, controller.getAUser);
};
