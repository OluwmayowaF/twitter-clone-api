import ErrorHandler from '../utils/error';
import Tweet from '../model/Tweet';
import User from '../model/User';
import Reply from '../model/Reply';
import Follow from '../model/Follow';
import followerHelper from '../utils/followerHelp';

export default {
  /**
   *  Post a tweet
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
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
  /**
   * View all logged in users tweet
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  viewUserTweet: async (req, res) => {
    const ownerId = req.user.id;
    const tweet = await Tweet.find({ ownerId }).sort('-createdAt');
    if (!tweet) throw new ErrorHandler(404, 'No post for logged in user');
    res.status(200).json({
      status: 'Success',
      message: 'Found logged in user tweets',
      tweet,
    });
  },
  /**
   * view a specific tweet
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
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
  /**
   * View logged in users tweet and those of the thier followers and people they are following
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  viewUserTimeline: async (req, res) => {
    const { id } = req.user;
    let validUserTweet = [id];

    const getFollowers = await followerHelper.getFollowersId;
    const getFollowing = await followerHelper.getFollowingId;
    validUserTweet = validUserTweet.concat(getFollowers, getFollowing);

    const tweets = await Tweet.find({ ownerId: { $in: validUserTweet } }).sort('-createdAt');
    if (!tweets) throw new ErrorHandler(404, 'No Tweets are available to show');
    res.status(200).json({
      status: 'Success',
      tweets,
    });
  },
};
