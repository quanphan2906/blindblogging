const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            trim: true,
        },
        password: { type: String, required: true },
        name: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 30,
            trim: true,
        },
        //if name is null -> set name = email
        profileImageUrl: { type: String },
        altText: { type: String },
        occupation: { type: String, trim: true },
        description: { type: String, trim: true },
        likedPost: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    },
    {
        timestamps: true,
    }
);

UserSchema.index({ email: "text", name: "text" });

const model = mongoose.model;
module.exports = model("User", UserSchema);
