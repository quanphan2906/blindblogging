const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    postImageUrl: { type: String },
    topic: { type: String, required: true },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model;
module.exports = model("Post", PostSchema);
