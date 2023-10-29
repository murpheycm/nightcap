const { Schema, model } = require("mongoose");

const badgeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    criteria: {
        type: String,
        required: true
    }
  });
  
  const Badge = model('Badge', badgeSchema);
  module.exports = Badge;
  