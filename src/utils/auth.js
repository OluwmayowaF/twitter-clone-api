import { ErrorHandler } from './error';

require('dotenv').config();
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
// const User = require('../model/User');

module.exports = {

  /**
     * Valid Password Method
     * @param {string} password
     * @returns {boolean} returns true or false
    */

  validPassword(password) {
    return password.length > 6;
  },
  /**
     * Valid Email Method
     * @param {string} email
     * @returns {boolean} returns true or false
    */

  validEmail(email) {
    const regexTest = /\S+@\S+\.\S+/;
    return regexTest.test(email);
  },

  hashPassword(password) {
    return bcrpyt.hashSync(password, bcrpyt.genSaltSync(saltRounds));
  },
  /**
       * Compare Password Method
       * @param {string} hashPassword
       * @param {string} password
       * @returns {Boolean} return True or False
    */

  comparePassword(hashPassword, password) {
    return bcrpyt.compareSync(password, hashPassword);
  },
  /**
   * Generate JSON Web token
   * @param {int} id
   * @returns {string} encoded JWT
   */
  generateToken(id) {
    const options = {
      expiresIn: '8h',
      issuer: 'http://mays-twitter-clone.com',
    };
    const secret = process.env.JWT_SECRET;
    const payload = { userId: id };
    const token = jwt.sign(payload, secret, options);

    return token;
  },

  /**
   * Verify token
   * @param {string} token
   * @return {object} decoded token
   */
  verifyToken(token) {
    const options = {
      expiresIn: '8h',
      issuer: 'http://mays-twitter-clone.com',
    };
    const secret = process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token, secret, options);
      return decoded;
    } catch (err) {
      throw new ErrorHandler(401, 'Invalid Token', err);
    }
  },

};
