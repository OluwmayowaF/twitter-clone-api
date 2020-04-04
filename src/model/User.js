const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

// Create the user schema 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    hide: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
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

const user = mongoose.model('users', userSchema.plugin(mongooseHidden));

module.exports = user;
