import middleware from '../middleware/auth';
import followController from '../controller/follow-controller';
import searchController from '../controller/search-controller';

module.exports = (router) => {
  router.route('/follow/:id')
    .post(middleware.validateToken, followController.followUser);
  router.route('/search/:term')
    .get(middleware.validateToken, searchController.search);
};
