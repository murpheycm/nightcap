const { Schema, model } = require("mongoose");

const friendsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friend: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Friends = model("Friends", friendsSchema);

module.exports = Friends;