const { Schema, model } = require("mongoose");

const cheersSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
});

const Cheers = model('Cheers', cheersSchema);

module.exports = Cheers;
