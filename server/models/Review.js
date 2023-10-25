const { Schema, model } = require("mongoose");

const commentSchema = require("./Comment");
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
  image: {
    type: String,
  },
  comments: [commentSchema],
  thumbUpCount: {
    type: Number,
  },
  thumbDownCount: {
    type: Number,
  },
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
reviewSchema.post("save", function (doc, next) {
  console.log(doc);
  const cocktail = Cocktail.findByIdAndUpdate(doc.cocktail, {
    $addToSet: { reviews: doc },
  });
  const user = User.findByIdAndUpdate(doc.user, { $addToSet: { reviews: doc } });
  next();
});


// const Review = model("Review", reviewSchema);

// module.exports = Review;

module.exports = reviewSchema;