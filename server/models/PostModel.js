const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        subtitle: { type: String, trim: true },
        postImageUrl: { type: String },
        altText: { type: String, trim: true },
        topic: { type: String, required: true, trim: true, maxlength: 40 },
        content: { type: String },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        likes: { type: Number },
        likers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    }
);

PostSchema.index({ title: "text", subtitle: "text" });

const model = mongoose.model;
module.exports = model("Post", PostSchema);
