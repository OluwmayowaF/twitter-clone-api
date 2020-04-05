const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  followerId: {
    type: String,
    required: true,
  },
  followedId: {
    type: String,
    required: true,
  },
  followBack: {
    type: Boolean,
    required: true,
    default: false,
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
