import { ErrorHandler } from '../utils/error';

const Tweet = require('../model/Tweet');
const User = require('../model/User');
const Reply = require('../model/Reply');


export default {
  createTweet: async (req, res) => {
    const { tweet } = req.body;
    const ownerId = req.user.id;
    if (!tweet) throw new ErrorHandler(400, 'Bad Request: Please add your tweet');
    const postTweet = new Tweet({ tweet, ownerId });
    await postTweet.save((err, newTweet) => {
      res.status(201).json({
        status: 'Success',
        tweet: newTweet,
      });
    });
  },
  viewUserTweet: async (req, res) => {
    const ownerId = req.user.id;
    const tweet = await Tweet.find({ ownerId });
    if (!tweet) throw new ErrorHandler(404, 'No post for logged in user');
    res.status(200).json({
      status: 'Success',
      message: 'Found logged in user tweets',
      tweet,
    });
  },
  viewSpecificTweet: async (req, res) => {
    const { id } = req.params;
    const tweet = await Tweet.findById({ _id: id });

    if (!tweet) throw new ErrorHandler(404, 'That tweet was not found, might have been deleted');
    const owner = await User.findById({ _id: tweet.ownerId });
    const replies = await Reply.find({ tweetId: id });
    res.status(200).json({
      status: 'Success',
      message: 'Tweet found',
      data: {
        tweet,
        replies,
        owner,
      },
    });
  },
};
