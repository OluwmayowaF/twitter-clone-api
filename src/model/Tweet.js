const mongoose = require('mongoose');

// Create the Tweet model

const tweetSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  tweet: {
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

const tweet = mongoose.model('tweets', tweetSchema);

module.exports = tweet;
