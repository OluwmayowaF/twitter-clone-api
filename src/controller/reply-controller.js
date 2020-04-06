import Reply from '../model/Reply';
import User from '../model/User';
import Tweet from '../model/Tweet';
import ErrorHandler  from '../utils/error';

export default {
  postReply: async (req, res) => {
    const ownerId = req.user;
    const tweetId = req.params.id;
    const { reply } = req.body;

    if (!reply) throw new ErrorHandler(400, 'Please enter a reply')
    const tweet = await Tweet.findById({ _id: tweetId });
    if (!tweet) throw new ErrorHandler(404, 'No tweet found');
    const postReply = new Reply({ ownerId, tweetId, reply });
    await postReply.save((err, newReply) => {
      res.status(201).json({
        status: 'Success',
        reply: newReply,
      });
    });
  },
  viewReply: async (req, res) => {
    const { id } = req.params;
    const reply = await Reply.findById(id);
    if (!reply) throw new ErrorHandler(404, 'Reply not found');
    res.status(200).json({
      status: 'Success',
      reply,
    });
  },
};
