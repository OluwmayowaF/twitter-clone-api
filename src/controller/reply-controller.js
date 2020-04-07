import Reply from '../model/Reply';
import Tweet from '../model/Tweet';
import ErrorHandler from '../utils/error';

export default {
  /**
   * Post a Reply
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  postReply: async (req, res) => {
    const ownerId = req.user;
    const tweetId = req.params.id;
    const { reply } = req.body;

    if (!reply) throw new ErrorHandler(400, 'Please enter a reply');
    const tweet = await Tweet.findById({ _id: tweetId });
    if (!tweet) throw new ErrorHandler(404, 'No tweet found');
    const postReply = new Reply({ ownerId, tweetId, reply });
    await postReply.save((err, savedReply) => {
      res.status(201).json({
        status: 'Success',
        message: 'Reply has been posted',
        reply: savedReply,
      });
    });
  },
  /**
   * View a reply
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
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
