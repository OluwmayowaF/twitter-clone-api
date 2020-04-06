import ErrorHandler from '../utils/error';
import Follow from '../model/Follow';

export default {
  followUser: async (req, res) => {
    const followerId = req.user.id;
    const followedId = req.params.id;


    if (!followedId) throw new ErrorHandler(400, 'Select User to follow');
    if (followedId === followerId) throw new ErrorHandler(400, 'You cannot follow yourself');
    // check if already following
    const alreadyFollowing = Follow.findOne({ $and: [{ followerId }, { followedId }] });
    if (alreadyFollowing) throw new ErrorHandler(404, 'Already Following this user');
    const follow = new Follow({
      followerId, followedId,
    });

    await follow.save((err, newFollow) => {
      res.status(200).json({
        status: 'Success1',
        message: 'Follow Sucessfully',
        follow: newFollow,
      });
    });
  },

  followBack: async (req, res) => {
    const followedId = req.user.id;
    const followerId = req.params.id;
    const relationshipExists = Follow.findOne({ $and: [{ followerId }, { followedId }] });
    if (!relationshipExists) throw new ErrorHandler(404, 'Not following ');
    const followBack = relationshipExists.update({ $set: { followBack: true } }, { updatedAt: Date.now }, { new: true });
    res.status(200).json({
      status: 'Success',
      message: 'Follow Sucessfully',
      follow: followBack,
    });
  },

};
