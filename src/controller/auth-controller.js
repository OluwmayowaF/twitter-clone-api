const { hashPassword, validPassword, validEmail } = require('../utils/auth');

const User = require('../model/User');


module.exports = {
  /**
    *Register a new User
    * @param {object} req
    * @param {object} res
    * @returns {object} res object
    * */
  register: async (req, res) => {
    const result = {};
    let status;
    try {
      let {
        username, email, password, firstname, lastname,
      } = req.body;
      username = username.toLowerCase();
      email = email.toLowerCase();
      firstname = !firstname ? null : firstname.toLowerCase();
      lastname = !lastname ? null : lastname.toLowerCase();

      if (!username) {
        status = 400;
        result.status = 'error';
        result.message = 'Username is required to register';
        res.status(status).send(result);
      }
      if (!validEmail(email)) {
        status = 400;
        result.status = 'error';
        result.message = 'A Valid Email is required to register';
        res.status(status).send(result);
      }
      if (!(validPassword(password))) {
        status = 400;
        result.status = 'error';
        result.message = 'a valid password is required to register';
        res.status(status).send(result);
      }
      password = hashPassword(password);
      const user = new User({
        username, email, password, firstname, lastname,
      });

      await user.save((err, newUser) => {
        if (!err) {
          status = 201;
          result.status = 'success';
          result.message = 'User has been registered succesfully';
          result.data = newUser;
        } else {
          status = 400;
          result.status = 'error';
          result.message = 'Unable to register user see hint for more details ';
          result.hint = err.errmsg;
        }
        res.status(status).send(result);
      });
    } catch (error) {
      result.status = 500;
      result.err = error;
      result.message = 'Something went wrong please try again';
    }
  },
};
