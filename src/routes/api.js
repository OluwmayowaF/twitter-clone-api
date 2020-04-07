import { Router } from 'express';

import authController from '../controller/auth-controller';
import usersController from '../controller/users-controller';
import tweetController from '../controller/tweet-controller';
import replyController from '../controller/reply-controller';
import followController from '../controller/follow-controller';
import searchController from '../controller/search-controller';
import middleware from '../middleware/auth';

const router = Router();


router.post('/users', authController.register);// Registration Route
router.post('/users/login', authController.login); // Login Route

router.get('/user', middleware.validateToken, usersController.getLoggedInUser); // Get current User
router.get('/user/:id', middleware.validateToken, usersController.getAUser); // Get a specific  User
router.get('/users', middleware.validateToken, usersController.getAllUsers); // Get all registered Users

router.post('/tweets', middleware.validateToken, tweetController.createTweet); // Post tweet
router.get('/tweets', middleware.validateToken, tweetController.viewUserTweet); // View users tweets
router.get('/tweet/:id', middleware.validateToken, tweetController.viewSpecificTweet); // view a specific tweet
router.get('/timeline', middleware.validateToken, tweetController.viewUserTimeline);

router.post('/tweet/:id/reply', middleware.validateToken, replyController.postReply); // Post a Reply
router.get('/reply/:id', middleware.validateToken, replyController.viewReply); // view a specific reply

router.post('/follow/:id', middleware.validateToken, followController.followUser); // Follow a User
router.get('/followers/:id', middleware.validateToken, followController.getFollowers); // Get Followers
router.get('/following/:id', middleware.validateToken, followController.getFollowing); // Get Following 
router.get('/search/:term', middleware.validateToken, searchController.search); // Search for a user

export default router;
