const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    res.locals.userData = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
