
import ErrorHandler from '../utils/error';

const User = require('../model/User');

export default {
  /**
   * Get Logged in user details
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  getLoggedInUser: async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id);
    return res.status(200).json({
      status: 'Success',
      message: 'Logged in user details',
      user,
    });
  },
  /**
   * Get a specifc user by id
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  getAUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) throw new ErrorHandler(404, 'User not found');
    return res.status(200).json({
      status: 'Success',
      message: 'Found User ',
      user,
    });
  },
  /**
   * Get all registered users
   *  @param {object} req
   * @param {object} res
   * @returns {object} res object
   */
  getAllUsers: async (req, res) => {
    const users = await User.find();
    console.log(users)
    if (!users) throw new ErrorHandler(404, 'No users have registered');
    return res.status(200).json({
      status: 'Success',
      message: `${users.length} users Found`,
      users,
    });
  },
};
