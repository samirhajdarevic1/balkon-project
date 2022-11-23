const { errorResponse, successResponse } = require('./error');
const User = require('../models/user');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
