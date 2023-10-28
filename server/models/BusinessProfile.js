const { Schema, model } = require("mongoose");
const Review = require('./Review');
const Cocktail = require('./Cocktail');

const businessProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  bio: {
    type: String,
  },
  businessImage: String,
  website: String,
  location: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  cocktails: [{ type: Schema.Types.ObjectId, ref: "Cocktail" }],
});

const BusinessProfile = model("BusinessProfile", businessProfileSchema);

module.exports = BusinessProfile;
