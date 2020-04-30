const router = require("express").Router();

const CommentModel = require("../models/CommentModel");

//getting comments with id of a post
router.get("/", async (req, res, next) => {
    const { postId: post } = req.query;

    const comments = await CommentModel.find({ post })
        .populate("commentor", "_id name profileImageUrl")
        .sort({ createdAt: -1 })
        .exec();

    res.json({ comments });
});

//-----USE SOCKET.IO FOR THE BELOW--------//

//create a comment, in the req.body needs postId and userId
//TEST ONLY
//TODO: DELETE WHEN SOCKET.IO IS OUT
router.post("/create", async (req, res, next) => {
    const { post, commentor, content } = req.body;

    const comment = await CommentModel.create({
        post,
        commentor,
        content,
    });

    res.json({ comment });
});

router.put("/:id");
//changing content of a comment

router.delete("/:id");
//delete a comment completely

module.exports = router;
