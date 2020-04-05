import { ErrorHandler } from '../utils/error';

const Tweet = require('../model/Tweet');

export default {
  createTweet: async (req, res) => {
    const { tweet } = req.body;
    const ownerId = req.user.id;
    if (!tweet) throw new ErrorHandler(400, 'Bad Request: Please add your tweet');
    const postTweet = new Tweet({ tweet, ownerId });
    console.log(postTweet)
    await postTweet.save((newTweet) => {
      res.status(201).json({
        status: 'Success',
        tweet: newTweet,
      });
      console.log(newTweet)
    });
  },
};
