const { Schema } = require("mongoose");

// currently, this is only used for images associated with reviews
// to keep things separate, we can just use the firebase url for the profile image rather than this schema, limiting to one profile image at a time
const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
});

module.exports = imageSchema;
