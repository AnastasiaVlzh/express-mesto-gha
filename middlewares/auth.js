const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    console.log(process.env['JWT_SECRET']);
    payload = jwt.verify(token, process.env['JWT_SECRET']);
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};
