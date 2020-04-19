const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    commentor: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model;
module.exports = model("Comment", CommentSchema);
