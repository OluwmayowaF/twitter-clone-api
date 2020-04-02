const { hashPassword, validPassword, validEmail, comparePassword, generateToken } = require('../utils/auth');

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

      // clean User input
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

      // Save User in the DB
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
  /**
   * Users Login controller function
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  login: async (req, res) => {
    const result = {};
    let status;
    try {
      const {
        username, email, password,
      } = req.body;
      if (username === '' && email === '') {
        status = 400;
        result.status = 'error';
        result.message = 'Username or Email is required to login';
        res.status(status).send(result);
      }
      if (!(validPassword(password))) {
        status = 400;
        result.status = 'error';
        result.message = 'Password is required to login';
        res.status(status).send(result);
      } else {
        await User.findOne(
          {
            $or: [{ username: username.toLowerCase() },
              { email: email.toLowerCase() }],
          }, (error, user) => {
            if (!error && user) {
              const match = comparePassword(user.password, password);

              if (match) {
                status = 200;
                // eslint-disable-next-line no-underscore-dangle
                const token = generateToken(user._id);
                // eslint-disable-next-line no-console
                console.log(token);
                result.status = status;
                result.data = user;
                result.token = `Bearer ${token}`;
              } else {
                status = 401;
                result.status = status;
                result.error = 'Invalid Password Please try again';
              }
            } else {
              status = 404;
              result.status = status;
              result.error = 'User not found Try again';
            }
            res.status(status).send(result);
          },
        );
      }
    } catch (error) {
      result.status = 500;
      result.err = error;
      result.message = 'Something went wrong please try again';
    }
  },
};
