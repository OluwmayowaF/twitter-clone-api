import Follow from '../model/Follow';
import User from '../model/User';

export default {
  getFollowersId: async (id) => {
    const followers = await Follow.find({ followedId: id });
    const followersId = [];
    for (let i = 0; i < followers.length; i++) {
      followersId.push(followers[i].followerId);
    }
    return followersId;
  },

  getFollowingId: async (id) => {
    const followedId = [];
    const following = await Follow.find({ followerId: id });
    for (let i = 0; i < following.length; i++) {
      followedId.push(following[i].followedId);
    }
    return followedId;
  },

  userExists: async (id) => {
    const userExists = await User.findById(id);
    if (userExists === null) {
      return true;
    }
    return false;
  },

};
