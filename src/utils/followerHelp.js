import Follow from '../model/Follow';

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

};
