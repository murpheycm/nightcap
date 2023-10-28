const { Schema, model } = require("mongoose");

const cheersSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  review: { type: Schema.Types.ObjectId, ref: 'Review', required: true },
});

const Cheers = model('Cheers', cheersSchema);

module.exports = Cheers;
