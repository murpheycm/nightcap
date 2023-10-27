const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
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
  profileImage: String,
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
