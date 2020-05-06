const PostModel = require("../models/PostModel");

module.exports = (io, socket) => {
    socket.on("like", async ({ postId }, callback) => {
        try {
            const post = await PostModel.findById(postId).exec();

            if (!post.likes) post.likes = 0;
            post.likes = post.likes + 1;

            await post.save();

            io.emit("newLike", { postId });
        } catch (err) {
            callback(err);
        }
    });
};
