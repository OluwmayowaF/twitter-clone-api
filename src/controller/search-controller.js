import User from '../model/User';
import Tweet from '../model/Tweet';
import Reply from '../model/Reply';
import  ErrorHandler  from '../utils/error';

export default {
  search: async (req, res) => {
    const searchTerm = req.params.term;

    const result = [];

    let users = await User.find({ username: { $regex: searchTerm, $options: 'i' } });
    users = users.length > 1 ? users : 'no users found';
    let tweets = await Tweet.find({ tweet: { $regex: searchTerm, $options: 'i' } });
    tweets = tweets.length > 1 ? tweets : 'no tweets found';
    let replies = await Reply.find({ reply: { $regex: searchTerm, $options: 'i' } });
    replies = replies.length > 1 ? replies : 'no replies found';

    if (!users && !tweets && !replies) throw new ErrorHandler(404, 'No results found');
    result.push(users, tweets, replies);
    res.status(200).json({
      status: 'Success',
      message: 'Results Found',
      userFound: users,
      tweetFound: tweets,
      repliesFound: replies,
    });
  },
};
