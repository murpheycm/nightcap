const { Schema, model } = require("mongoose");

const businessProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  bio: {
    type: String,
  },
  profileImage: String,
  website: String,
  location: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const BusinessProfile = model("BusinessProfile", businessProfileSchema);

module.exports = businessProfileSchema;
