const { Schema, model } = require("mongoose");

const Comment = require("./Comment");
const Cheers = require("./Cheers");
// const reactionSchema = require("./Reaction");
// const imageSchema = require("./Image");

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cocktail: {
    type: Schema.Types.ObjectId,
    ref: "Cocktail",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  image: {
    type: [String],
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  cheers: [{ type: Schema.Types.ObjectId, ref: "Cheers" }],
  // reactions: [reactionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
  {
    toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

// if we need a count of comments:
reviewSchema.virtual('commentsCount').get(function () {
  return this.comments.length;
});
// not sure if this is the right way to do this yet...
// trying to push review to both user and cocktail models after review is created
reviewSchema.post("save", async function (doc, next) {
  console.log(doc);

  // Use async/await to update related models
  const cocktail = await Cocktail.findByIdAndUpdate(doc.cocktail, {
    $addToSet: { reviews: doc._id }, // Use doc._id to reference the review
  });
  const user = await User.findByIdAndUpdate(doc.user, {
    $addToSet: { reviews: doc._id }, // Use doc._id to reference the review
  });

  next();
});


const Review = model("Review", reviewSchema);
module.exports = Review;