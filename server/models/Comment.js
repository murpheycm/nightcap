const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    review: {
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        maxLength: 100,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = model("Comment", commentSchema);
module.exports = Comment;