import { ErrorHandler } from '../utils/error';

const { verifyToken } = require('../utils/auth');
const User = require('../model/User');


module.exports = {
  // eslint-disable-next-line consistent-return
  async validateToken(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]; // Get Token from header
      const decoded = await verifyToken(token);
      if (!decoded) throw new ErrorHandler(404, 'Invalid Token');
      const user = await User.findById({ _id: decoded.userId });
      if (!user) throw new ErrorHandler(404, 'Invalid Token');
      req.user = user;
      next();
    } else {
      throw new ErrorHandler(401, 'Authorization Token not found');
    }
  },
};
