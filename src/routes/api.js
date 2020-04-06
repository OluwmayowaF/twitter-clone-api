import { Router } from 'express';

import authController from '../controller/auth-controller';
import tweetController from '../controller/tweet-controller';
import replyController from '../controller/reply-controller';
import followController from '../controller/follow-controller';
import searchController from '../controller/search-controller';
import middleware from '../middleware/auth';

const router = Router();


router.post('/users', authController.register);// Registration Route
router.post('/users/login', authController.login); // Login Route
router.get('/user', middleware.validateToken, authController.getLoggedInUser); // Get current User
router.get('/user/:id', middleware.validateToken, authController.getAUser); // Get current User

router.post('/tweets', middleware.validateToken, tweetController.createTweet); // Post tweet
router.get('/tweets', middleware.validateToken, tweetController.viewUserTweet);
router.get('/tweet/:id', middleware.validateToken, tweetController.viewSpecificTweet);
router.post('/tweet/:id/reply', middleware.validateToken, replyController.postReply);
router.get('/reply/:id', middleware.validateToken, replyController.viewReply);

router.post('/follow/:id', middleware.validateToken, followController.followUser);
router.get('/search/:term', middleware.validateToken, searchController.search);

export default router;
