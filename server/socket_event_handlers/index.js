const CommentModel = require("../models/CommentModel");

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
};
