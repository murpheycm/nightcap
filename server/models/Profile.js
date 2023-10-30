const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  birthday: {
    type: Date,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  image: String,
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
