const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new UnauthorizedError('Сначала нужно авторизироваться'));
  }
  req.user = payload;
  next();
};
