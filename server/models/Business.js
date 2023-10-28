const { Schema, model } = require("mongoose");
const Review = require('./Review');
const Cocktail = require('./Cocktail');

const businessSchema = new Schema({
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
    maxlength: 500,
  },
  likedByUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  image: [String],
  website: String,
  location: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  cocktails: [{ type: Schema.Types.ObjectId, ref: "Cocktail" }],
});

const Business = model("BusinessProfile", businessSchema);

module.exports = Business;
