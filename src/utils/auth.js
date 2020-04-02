require('dotenv').config();

const bcrpyt = require('bcrypt');

const saltRounds = 10;
const User = require('../model/User');

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
  /**
     * Email already used to register
     * @param {string} email
     * @returns {boolean} returns true or false
   */
/*
  async userEmailExists(email) {
    await User.findOne( (user, err) => {
        console.log(user)
        if (user === null) {
          return true;
        }
      });
  },
  */
  /**
   * Username already used to register
   * @param {string} username
   * @returns {boolean} returns true or false
   */
/*
  async userUsernameExists(username) {
    await User.findOne({ username }, (user) => {
      if (user) {
        return true;
      }
    });
  },
  */
  /**
       * Hash Password Method
       * @param {string} password
       * @returns {string} returns hashed password
    */

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


};
