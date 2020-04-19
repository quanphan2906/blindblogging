const router = require("express").Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const checkAuth = require("../helpers/checkAuth");
const AppError = require("../error_handler/AppError");

//create new user
router.post("/register", async (req, res, next) => {
  try {
    const existedEmail = await UserModel.findOne({
      email: req.body.email,
    }).exec();
    if (existedEmail) {
      return res.json({ message: "existedEmail" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await UserModel.create({
      email: req.body.email,
      password: hash,
      name: req.body.email,
    });
    res.json({ message: "success" });
  } catch (err) {
    next(err);
  }
});

//login a user and send back jwt token
router.post("/login", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).exec();
    if (!user) return res.json({ message: "notRegistered" });

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) return res.json({ message: "incorrectPassword" });
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      config.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );
    res.json({ message: "success", token });
  } catch (err) {
    next(err);
  }
});

//retrieve a user profile
router
  .route("/profile/:id")
  .all(checkAuth, (req, res, next) => {
    const { userId, email } = res.locals.userData;
    if (userId === req.params.id) {
      next();
    } else {
      const err = new AppError("notAuthorized", 403);
      next(err);
    }
  })
  .get(async (req, res, next) => {
    const { userId, email } = res.locals.userData;
    const userInfo = await UserModel.findById(userId)
      .select("-password")
      .exec();
    res.json({ user: userInfo._doc });
  })
  .put(async (req, res, next) => {
    const { userId, email } = res.locals.userData;
    const newUserInfo = await UserModel.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true }
    );
    res.json({ user: newUserInfo._doc });
  });

module.exports = router;
