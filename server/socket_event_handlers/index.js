const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");

module.exports = (io, socket) => {
    socket.on(
        "newComment",
        async ({ postId, commentor, content }, callback) => {
            try {
                const comment = await CommentModel.create({
                    post: postId,
                    commentor,
                    content,
                });

                const populatedComment = await comment
                    .populate("commentor", "-password")
                    .execPopulate();

                io.emit("newCommentData", {
                    ...populatedComment._doc,
                });
            } catch (err) {
                callback(err);
            }
        }
    );
    socket.on("like", async ({ postId }, callback) => {
        try {
            const post = await PostModel.findById(postId).exec();

            post.likes = post.likes + 1;

            await post.save();

            io.emit("newLike");
        } catch (err) {
            callback(err);
        }
    });
};
