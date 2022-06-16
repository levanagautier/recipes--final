const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

const authMiddleware = (req, res, next) => {
  jwt.verify(req.get('x-access-token'), SECRET_KEY, (err, decode) => {
    if (
      typeof decode === 'undefined' ||
      (req.session.userId && req.session.userId !== decode.userId)
    ) {
      res.status(403).json({ error: err });

      return;
    }
    next();
  });
};

module.exports = authMiddleware;
