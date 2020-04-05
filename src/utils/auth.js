import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ErrorHandler from './error';

require('dotenv').config();

const saltRounds = 10;
/**
     * Valid Password check Function
     * @param {string} password
     * @returns {boolean} returns true or false
    */

export function validPassword(password) {
  return password.length >= 8;
}
/**
     * Valid Email check function
     * @param {string} email
     * @returns {boolean} returns true or false
    */

export function validEmail(email) {
  const regexTest = /\S+@\S+\.\S+/;
  return regexTest.test(email);
}

/**
     * Encrypt Password with bcrypt
     * @param {string} email
     * @returns {boolean} returns true or false
    */

export function hashPassword(password) {
  return bcrpyt.hashSync(password, bcrpyt.genSaltSync(saltRounds));
}
/**
       * Compare Password Function
       * @param {string} hashPassword
       * @param {string} password
       * @returns {Boolean} return True or False
    */

export function comparePassword(hashedPassword, password) {
  return bcrpyt.compareSync(password, hashedPassword);
}
/**
   * Generate JSON Web token
   * @param {int} id
   * @returns {string} encoded JWT
   */
export function generateToken(id) {
  const options = {
    expiresIn: '8h',
    issuer: 'http://mays-twitter-clone.com',
  };
  const secret = process.env.JWT_SECRET;
  const payload = { userId: id };
  const token = jwt.sign(payload, secret, options);

  return token;
}

/**
   * Verify token
   * @param {string} token
   * @return {object} decoded token
   */
export function verifyToken(token) {
  const options = {
    expiresIn: '8h',
    issuer: 'http://mays-twitter-clone.com',
  };
  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret, options);
    return decoded;
  } catch (err) {
    throw new ErrorHandler(401, 'Invalid Token', err.name);
  }
}
