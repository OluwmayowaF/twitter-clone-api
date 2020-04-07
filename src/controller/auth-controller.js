import ErrorHandler from '../utils/error';

const {
  hashPassword, validPassword, validEmail, comparePassword, generateToken,
} = require('../utils/auth');

const User = require('../model/User');


export default {
  /**
    *Register a new User
    * @param {object} req
    * @param {object} res
    * @returns {object} res object
    * */
  register: async (req, res) => {
    let {
      // eslint-disable-next-line prefer-const
      username, email, password, firstname, lastname,
    } = req.body;

    // Validate User input
    if (!username || username.length < 1) throw new ErrorHandler(400, 'Bad Request: Please Provide Username');
    if (!validEmail(email)) throw new ErrorHandler(400, 'Bad Request:Please Provide valid Email');
    if (!(validPassword(password))) throw new ErrorHandler(400, 'Bad Request: Password must have atleast 8 characters');

    // clean User input
    username = username.toLowerCase();
    email = email.toLowerCase();
    firstname = !firstname ? null : firstname.toLowerCase();
    lastname = !lastname ? null : lastname.toLowerCase();

    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });
    if (usernameExists) throw new ErrorHandler(400, 'User with that username already registered');
    if (emailExists) throw new ErrorHandler(400, 'User with that email already registered');

    const user = new User({
      username, email, password: await hashPassword(password), firstname, lastname,
    });
    // Save User in the DB
    await user.save((err, newUser) => {
      if (err) throw new ErrorHandler(500, 'Something went wrong, please try again', err);
      res.status(201).json({
        status: 'Success',
        message: 'User has been registered succesfully',
        user: newUser,
      });
    });
  },
  /**
   * Users Login controller function
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  login: async (req, res) => {
    const {
      username, password,
    } = req.body;

    // validate User Input
    if (!username) throw new ErrorHandler(400, 'Bad Request:Username  is required to login');
    if (!(validPassword(password))) throw new ErrorHandler(400, 'Bad Request: Password must have atleast 8 characters');

    // Find User in the datatbase
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      throw new ErrorHandler(404, 'User with that username was not found');
    }

    // Confrim User Password
    const isPasswordCorrect = comparePassword(user.password, password);
    if (!isPasswordCorrect) {
      throw new ErrorHandler(401, 'Incorrect Password Please try again');
    }
    // eslint-disable-next-line no-underscore-dangle
    const token = generateToken(user._id);
    res.status(200).json({
      status: 'Success',
      message: 'User logged in Succesfully',
      user,
      token: `Bearer ${token}`,
    });
  },
};
