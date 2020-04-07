const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  followerId: { // Initiates the follow
    type: String,
    required: true,
  },
  followedId: { // Account being followed
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const follow = mongoose.model('follows', followSchema);

module.exports = follow;
