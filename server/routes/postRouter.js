const router = require("express").Router();

const PostModel = require("../models/PostModel");
const CommentModel = require("../models/CommentModel");
const UserModel = require("../models/UserModel");

const checkAuth = require("../helpers/checkAuth");
const upload = require("../helpers/multerConfig");

const AppError = require("../error_handler/AppError");

const fs = require("fs");

//return posts with queries
router.get("/", async (req, res, next) => {
    try {
        if (!req.query.pageName) throw new AppError("pageName needed", 400);

        if (req.query.pageName === "home") {
            const limit = req.query.limit ? parseInt(req.query.limit) : 3;
            const topic = req.query.topic ? req.query.topic : "blogging"; //string

            const posts = await PostModel.find({ topic })
                .sort({ createdAt: -1 })
                .limit(limit)
                .exec();

            return res.json({ posts });
        }

        if (req.query.pageName === "blog") {
            const pageNum = req.query.pageNum ? parseInt(req.query.pageNum) : 1;
            const resPerPage = req.query.resPerPage
                ? parseInt(req.query.resPerPage)
                : 3;
            const { isMostRecent = true, topic, searchString } = req.query;
            //at front-end, allow users to search by title or author

            //at front-end, allow users to search across topics (disable topic)
            const queryObj = {};
            const findScore = {};
            const sortObj = {};
            //if searchString -> sort according to relevance
            //else, search according to mostRecent or mostLike

            if (topic) queryObj.topic = topic;
            if (searchString) {
                queryObj.$text = {
                    $search: searchString,
                };
                findScore.score = { $meta: "textScore" };
                sortObj.score = { $meta: "textScore" };
            } else {
                if (isMostRecent === true) {
                    sortObj = { createdAt: -1 };
                } else {
                    //take the most likes post
                    sortObj = { likes: -1 };
                }
            }

            const total = await PostModel.countDocuments(queryObj);
            const totalPage =
                total % resPerPage === 0
                    ? total / resPerPage
                    : Math.floor(total / resPerPage) + 1;

            if (pageNum > totalPage) {
                return res.json({ posts: [], totalPage, message: "notFound" });
            }

            const posts = await PostModel.find(queryObj, findScore)
                .skip((pageNum - 1) * resPerPage)
                .sort(sortObj)
                .limit(resPerPage)
                .exec();

            res.json({ posts, totalPage });
        }
    } catch (err) {
        next(err);
    }
});

//post new post
//need to send data as form-data
router.post(
    "/create",
    checkAuth,
    upload.single("postImage"),
    async (req, res, next) => {
        try {
            const author = res.locals.userData.userId;
            const postImageUrl = req.file ? req.file.path : "";

            const newPost = await PostModel.create({
                ...req.body,
                author,
                postImageUrl,
            });

            res.json({ message: "success", post: newPost._doc });
        } catch (err) {
            next(err);
        }
    }
);

//all methods except post
router
    .route("/:id")
    .all(
        (req, res, next) => {
            if (req.method === "GET") return next();
            checkAuth(req, res, next);
        },
        async (req, res, next) => {
            try {
                const post = await PostModel.findById(req.params.id)
                    .populate("author", "-password")
                    .exec();
                res.locals.post = post._doc;
                if (req.method === "GET") return next();

                const { userId, email } = res.locals.userData;
                if (post.author == userId) return next();

                throw new AppError("notAuthorized", 403);
            } catch (err) {
                next(err);
            }
        }
    )
    .get(async (req, res, next) => {
        //for GET method -> find comments in the post
        try {
            const post = res.locals.post;

            post.comments = await CommentModel.find({
                post: post._id,
            })
                .sort({ createdAt: -1 })
                .populate("commentor", "name profileImageUrl altText updatedAt")
                .exec(); //TODO: test this when writing comment routes

            res.json({ post });
        } catch (err) {
            next(err);
        }
    })
    .put(upload.single("postImage"), async (req, res, next) => {
        //send data as form-data
        try {
            const newPostObj = { ...req.body };

            if (req.file !== undefined) {
                fs.unlinkSync(res.locals.post.postImageUrl);
                newPostObj.postImageUrl = req.file.path;
            }

            const newPost = await PostModel.findByIdAndUpdate(
                req.params.id,
                newPostObj,
                { new: true }
            ).exec();

            res.json({ post: newPost._doc, message: "success" });
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        //delete comments and image in uploads folder of this post also
        try {
            const post = res.locals.post;

            if (fs.existsSync(post.postImageUrl)) {
                fs.unlinkSync(post.postImageUrl);
            }

            await CommentModel.deleteMany({ post: post._id }); //TODO: test this when writing comment routes

            await PostModel.findByIdAndDelete(req.params.id);

            res.json({ message: "success" });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
