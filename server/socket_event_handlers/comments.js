const CommentModel = require("../models/CommentModel");
const jwt = require("jsonwebtoken");
const AppError = require("../error_handler/AppError");
const config = require("../config/config");

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

                io.emit("newCommentData", { populatedComment });
            } catch (err) {
                callback({ message: err.message, statusCode: err.statusCode });
            }
        }
    );

    socket.on(
        "changeComment",
        async ({ commentId, content, jwtToken }, callback) => {
            try {
                const { userId } = jwt.verify(jwtToken, config.JWT_SECRET);

                const comment = await CommentModel.findById(commentId)
                    .populate("commentor")
                    .exec();

                if (comment.commentor._id != userId)
                    throw new AppError("notAuthorized", 403);

                comment.content = content;

                const newComment = await comment.save();

                io.emit("changeCommentData", { newComment });
            } catch (err) {
                callback({ message: err.message, statusCode: err.statusCode });
            }
        }
    );

    socket.on("deleteComment", async ({ commentId, jwtToken }, callback) => {
        try {
            const { userId } = jwt.verify(jwtToken, config.JWT_SECRET);

            const comment = await CommentModel.findById(commentId)
                .populate("commentor")
                .exec();

            if (comment.commentor._id != userId)
                throw new AppError("notAuthorized", 403);

            const deletedComment = await CommentModel.findByIdAndDelete(
                commentId
            ).exec();

            io.emit("deleteCommentData", { deletedComment });
        } catch (err) {
            callback({ message: err.message, statusCode: err.statusCode });
        }
    });

    socket.on(
        "newReplyComment",
        async (
            { commentId, authContext, newReplyContent: content },
            callback
        ) => {
            try {
                const originalComment = await CommentModel.findById(
                    commentId
                ).exec();

                const { post } = originalComment;

                let newReplyCommentData = await CommentModel.create({
                    post,
                    commentor: authContext._id,
                    content,
                    originalComment: commentId,
                });

                newReplyCommentData = await newReplyCommentData
                    .populate("commentor")
                    .execPopulate();

                io.emit("newReplyCommentData", { newReplyCommentData });
            } catch (err) {
                callback({ message: err.message, statusCode: err.statusCode });
            }
        }
    );
};
