const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
  //get token from request header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send('Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }

    req.user = user;
    next(); //proceed to the next action in the calling function
  });
};

module.exports = {
  authCheck,
};
