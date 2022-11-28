const { errorResponse, successResponse } = require('./error');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (name.trim().length === 0) {
      return errorResponse(res, 'Not valid input error', err);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      hashedPassword,
    });
    console.log(user);
    await user.save();
    return successResponse(res, 200, user);
  } catch (err) {
    return errorResponse(res, 'Conflict', 409, err);
  }
};
