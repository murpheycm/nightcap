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
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

module.exports = commentSchema;