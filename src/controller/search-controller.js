import User from '../model/User';
import Tweet from '../model/Tweet';
import Reply from '../model/Reply';
import ErrorHandler from '../utils/error';

export default {
  /**
   * Search for tweet, user or reply
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  search: async (req, res) => {
    const searchTerm = req.params.term;

    const result = [];

    let users = await User.find({ username: { $regex: searchTerm, $options: 'i' } });
    let tweets = await Tweet.find({ tweet: { $regex: searchTerm, $options: 'i' } });
    let replies = await Reply.find({ reply: { $regex: searchTerm, $options: 'i' } });
    if (users.length < 1 || tweets.length < 1 || replies.length < 1) {
      users = users.length > 0 ? users : 'no users found';
      tweets = tweets.length > 0 ? tweets : 'no tweets found';
      replies = replies.length > 0 ? replies : 'no replies found';
      result.push(users, tweets, replies);
      res.status(200).json({
        status: 'Success',
        message: 'Results Found',
        userFound: users,
        tweetFound: tweets,
        repliesFound: replies,
      });
    } else {
      throw new ErrorHandler(404, `No results found for ${searchTerm.toUpperCase()}`);
    }
  },
};
