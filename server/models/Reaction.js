const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  review: {
    type: Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },
});

module.exports = reactionSchema;
