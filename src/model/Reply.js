const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  ownerId: {
    type: [Object],
    required: true,
  },
  tweetId: {
    type: String,
    required: true,
  },
  reply: {
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

const reply = mongoose.model('replys', replySchema);

module.exports = reply;
