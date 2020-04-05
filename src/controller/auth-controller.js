import { ErrorHandler } from '../utils/error';

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
      username, email, password, firstname, lastname,
    } = req.body;

    // clean User input
    username = username.toLowerCase();
    email = email.toLowerCase();
    firstname = !firstname ? null : firstname.toLowerCase();
    lastname = !lastname ? null : lastname.toLowerCase();
    // Validate User input
    if (!username || username.length < 1) throw new ErrorHandler(400, 'Bad Request: Please Provide Username');
    if (!validEmail(email)) throw new ErrorHandler(400, 'Bad Request:Please Provide valid Email');
    if (!(validPassword(password))) throw new ErrorHandler(400, 'Bad Request: Password must have atleast 6 characters');

    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });
    if (usernameExists) throw new ErrorHandler(400, 'User with that username already registered');
    if (emailExists) throw new ErrorHandler(400, 'User with that email already registered');

    // Encrypt Password
    password = hashPassword(password);
    const user = new User({
      username, email, password, firstname, lastname,
    });
    // Save User in the DB
    await user.save((err, newUser) => {
      if (err) throw new ErrorHandler(500, 'Something went wrong, please try again', err);
      res.status(200).json({
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
    if (!(validPassword(password))) throw new ErrorHandler(400, 'Bad Request: Password is required to login');

    // Find User in the datatbase
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      throw new ErrorHandler(404, 'User with that email/username was not found');
    }

    // Confrim User Password
    const isPasswordCorrect = comparePassword(user.password, password);
    if (!isPasswordCorrect) {
      throw new ErrorHandler(401, 'Invalid Password Please try again');
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
  /**
   * Get Logged in user details
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */

  getUser: async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id);
    return res.status(200).json({
      status: 'Success',
      message: 'Logged in user details',
      user,
    });
  },
};
