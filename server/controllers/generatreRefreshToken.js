const jwt = require('jsonwebtoken');

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });

  return refreshToken;
}
module.exports = generateRefreshToken;
