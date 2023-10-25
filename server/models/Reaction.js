const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  review: {
    type: Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },
  heartEyesCount: {
    type: Number,
  },
  angryFaceCount: {
    type: Number,
  },
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

module.exports = reactionSchema;
