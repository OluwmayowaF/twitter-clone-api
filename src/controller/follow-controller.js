import ErrorHandler from '../utils/error';
import Follow from '../model/Follow';
import User from '../model/User';
import followerHelp from '../utils/followerHelp';

export default {


  /**
   * Follow a user
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  followUser: async (req, res) => {
    const followerId = req.user.id;
    const followedId = req.params.id;

    const followedIdExists = await User.findById(followedId);

    if (followedIdExists === null) throw new ErrorHandler(404, 'User was not found, might have deleted account');
    if (followedId === followerId) throw new ErrorHandler(400, 'You cannot follow yourself');
    // check if already following
    const alreadyFollowing = await Follow.findOne({ $and: [{ followerId }, { followedId }] });
    if (alreadyFollowing !== null) throw new ErrorHandler(400, 'Already Following this user');
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
  /**
   * Get a users followers
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  getFollowers: async (req, res) => {
    const { id } = req.params;
    const userExists = await User.findById(id);

    if (userExists === null) throw new ErrorHandler(404, 'User was not found, might have deleted account');
    const followersId = await followerHelp.getFollowersId(id);

    if (followersId.length < 1) throw new ErrorHandler(404, 'User has no followers');
    const followers = await User.find({ _id: { $in: followersId } });
    res.status(200).json({
      status: 'success',
      followers,
    });
  },
  /**
   * Get users a user is following
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  getFollowing: async (req, res) => {
    const { id } = req.params;
    const userExists = await User.findById(id);

    if (userExists === null) throw new ErrorHandler(404, 'User was not found, might have deleted account');

    const followedId = await followerHelp.getFollowingId(id);
    if (followedId.length < 1) throw new ErrorHandler(404, 'User has not followed anyone');
    const following = await User.find({ _id: { $in: followedId } });
    res.status(200).json({
      status: 'success',
      following,
    });
  },
};
