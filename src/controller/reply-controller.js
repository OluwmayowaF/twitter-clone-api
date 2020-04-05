import Reply from '../model/Reply';
import User from '../model/User';
import Tweet from '../model/Tweet'
import { ErrorHandler } from '../utils/error'

export default {
  postReply: async (req, res) => {
    const ownerId = req.user;
    console.log(req.user)
    const tweetId = req.params.id;
    const { reply } = req.body;

    const tweet = await Tweet.findById({ _id: tweetId });
    console.log(tweet)
    if (!tweet) throw new ErrorHandler(404, 'No tweet found');
    const postReply = new Reply({ ownerId, tweetId, reply });
    await postReply.save((err, newReply) => {
      res.status(201).json({
        status: 'Success',
        reply: newReply,
      });
    });
  },
};
