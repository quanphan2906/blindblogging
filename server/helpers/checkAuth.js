const jwt = require("jsonwebtoken");
const config = require("../config/config");
const AppError = require("../error_handler/AppError");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new AppError("missingJWTToken", 401);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    res.locals.userData = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
