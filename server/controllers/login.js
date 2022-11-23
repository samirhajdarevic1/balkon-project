const { errorResponse, successResponse } = require('./error');
const AuthUser = require('../models/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateAccessToken = require('./generateAccesToken');
const generateRefreshToken = require('./generatreRefreshToken');

exports.loginUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const authUser = new AuthUser({
      name,
      password,
    });
    const tokens = await authUser.authUser();
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

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  console.log(refreshToken, req.body);
  try {
    const data = await jwt.decode(refreshToken);
    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accesToken = generateAccessToken({ name: data.name });
    const rt = generateRefreshToken({ name: data.name });

    return successResponse(res, 200, { accesToken, refreshToken: rt });
  } catch (error) {
    console.log('error', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
