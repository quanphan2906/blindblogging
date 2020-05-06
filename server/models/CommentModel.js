const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        commentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        originalComment: { type: Schema.Types.ObjectId, ref: "Comment" },
    },
    {
        timestamps: true,
    }
);

const model = mongoose.model;
module.exports = model("Comment", CommentSchema);
