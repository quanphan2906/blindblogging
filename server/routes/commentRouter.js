const router = require("express").Router();

const CommentModel = require("../models/CommentModel");

//getting comments with id of a post
//or get reply comments of id of original comment
router.get("/", async (req, res, next) => {
    const { postId: post, commentId: originalComment } = req.query;

    let queryObj = {};
    if (post) queryObj.post = post;
    if (originalComment) queryObj.originalComment = originalComment;

    const comments = await CommentModel.find(queryObj)
        .populate("commentor", "_id name profileImageUrl")
        .sort({ createdAt: -1 })
        .exec();

    res.json({ comments });
});

module.exports = router;
