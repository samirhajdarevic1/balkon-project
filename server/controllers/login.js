const { errorResponse, successResponse } = require('./error');
const AuthUser = require('../models/login');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const authUser = new AuthUser({
      name,
      password,
    });
    const tokens = await authUser.authUser();
    console.log(22, tokens);
    if (tokens) {
      return res.json(tokens);
    } else {
      return errorResponse(res, 'Not logged in', 409, err);
    }
    // return successResponse(res, 200, tokens);
  } catch (err) {
    return errorResponse(res, 'Conflict', 409, err);
  }
};
