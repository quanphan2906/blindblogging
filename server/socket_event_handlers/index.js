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

                //populate the commentor field also
                io.emit("newCommentData", {
                    ...comment._doc,
                });
            } catch (err) {
                callback(err);
            }
        }
    );

    socket.on("disconnect", () => {
        console.log("socket has closed");
    });
};
