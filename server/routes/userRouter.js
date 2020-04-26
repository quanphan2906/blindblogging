const router = require("express").Router();

const UserModel = require("../models/UserModel");

const config = require("../config/config");

const checkAuth = require("../helpers/checkAuth");
const upload = require("../helpers/multerConfig");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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

        const expiresIn = 3; //in terms of hours
        const expiresInString = expiresIn.toString() + "h";

        const token = jwt.sign(
            { email: user.email, userId: user._id },
            config.JWT_SECRET,
            { expiresIn: expiresInString }
        );

        const expiredInMilisec = expiresIn * 3600000;

        res.json({ message: "success", token, expiresIn: expiredInMilisec });
    } catch (err) {
        next(err);
    }
});

router.get("/profiles/", async (req, res, next) => {
    try {
        const { searchString } = req.query;

        const users = await UserModel.find(
            { $text: { $search: searchString } },
            { score: { $meta: "textScore" } }
        )
            .select("-password")
            .sort({ score: { $meta: "textScore" } })
            .exec();

        res.json({ users });
    } catch (err) {
        next(err);
    }
});

router.get("/profile/:id", async (req, res, next) => {
    try {
        const userId = req.params.id;

        const userInfo = await UserModel.findById(userId)
            .select("-password")
            .exec();

        res.json({ user: userInfo._doc });
    } catch (err) {
        next(err);
    }
});

router.put(
    "/profile",
    checkAuth,
    upload.single("profileImage"),
    async (req, res, next) => {
        try {
            //send data as form-data
            const { userId } = res.locals.userData;

            if (req.body.email) {
                const existedEmail = await UserModel.findOne({
                    email: req.body.email,
                }).exec();

                if (existedEmail) return res.json({ message: "existedEmail" });
            }

            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            const updateObj = { ...req.body };

            if (req.file !== undefined) {
                updateObj.profileImageUrl = req.file.path;

                const user = await UserModel.findById(userId).exec();

                if (user._doc.profileImageUrl) {
                    const oldImage = user._doc.profileImageUrl;
                    if (oldImage) {
                        if (fs.existsSync(oldImage)) fs.unlinkSync(oldImage); //TODO: Check if delete
                    }
                }
            }

            const newUserInfo = await UserModel.findByIdAndUpdate(
                userId,
                updateObj,
                {
                    new: true,
                }
            )
                .select("-password")
                .exec();

            res.json({ user: newUserInfo._doc });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
