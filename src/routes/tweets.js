import middleware from '../middleware/auth';
import tweetController from '../controller/tweet-controller';
import replyController from '../controller/reply-controller';


module.exports = (router) => {
  router.route('/tweets') // post tweet
    .post(middleware.validateToken, tweetController.createTweet)
    .get(middleware.validateToken, tweetController.viewUserTweet);
  router.route('/tweet/:id')
    .get(middleware.validateToken, tweetController.viewSpecificTweet);
  router.route('/tweet/:id/reply')
    .post(middleware.validateToken, replyController.postReply);
  router.route('/reply/:id')
    .get(middleware.validateToken, replyController.viewReply);
};
