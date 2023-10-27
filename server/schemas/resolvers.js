const { User, Profile, Review, Cocktail, Image, Tags, Comment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("profile")
          .populate("reviews");

        return userData;
      }
      throw AuthenticationError;
    },
    users: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.find({}).select("-__v -password");
        return userData;
      }
      throw AuthenticationError;
    },
    cocktails: async (parent, args, context) => {
      if (context.user) {
        const cocktailData = await Cocktail.find({}).select("-__v -password");
        return cocktailData;
      }
      throw AuthenticationError;
    },
    cocktail: async (parent, { _id }, context) => {
      if (context.user) {
        const cocktailData = await Cocktail.findOne({ _id })
          .select("-__v -password")
          .populate("reviews");
        return cocktailData;
      }
      throw AuthenticationError;
    },
    reviews: async (parent, args, context) => {
      if (context.user) {
        const reviewData = await Review.find({}).select("-__v -password");
        return reviewData;
      }
      throw AuthenticationError;
    },
    review: async (parent, { _id }, context) => {
      if (context.user) {
        const reviewData = await Review.findOne({ _id })
          .select("-__v -password")
          .populate("images")
          .populate("comments")
          .populate("reactions");
        return reviewData;
      }
      throw AuthenticationError;
    },
    images: async (parent, args, context) => {
      if (context.user) {
        const imageData = await Image.find({}).select("-__v -password");
        return imageData;
      }
      throw AuthenticationError;
    },
    image: async (parent, { _id }, context) => {
      if (context.user) {
        const imageData = await Image.findOne({ _id }).select("-__v -password");
        return imageData;
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token };
    },
    addBusiness: async (parent, args) => {
        const business = await Business.create(args);
        const token = signToken(business);
        return { business, token };
    },
    login: async (parent, { identifier, password }) => {
      let user;
    
      // Check if the provided identifier is a valid email address
      if (validator.isEmail(identifier)) {
        user = await User.findOne({ email: identifier });
      } else {
        // If not a valid email, assume it's a username
        user = await User.findOne({ username: identifier });
      }
    
      if (!user) {
        throw new AuthenticationError("Email or Username is incorrect. Please try again.");
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError("Password is incorrect. Please try again.");
      }
    
      const token = signToken(user);
      return { user, token };
    },
    addProfile: async (parent, { addProfile }, context) => {
        if (context.user) {
            const profileData = await Profile.create(addProfile);
            return profileData;
        }
        throw AuthenticationError;
    },
    addBusinessProfile: async (parent, { addBusinessProfile }, context) => {
        if (context.user) {
            const businessProfileData = await BusinessProfile.create(addBusinessProfile);
            return businessProfileData;
        }
        throw AuthenticationError;
    },
    addCocktail: async (parent, { addCocktail }, context) => {
      if (context.user) {
        const cocktailData = await Cocktail.create(addCocktail);
        return cocktailData;
      }
      throw AuthenticationError;
    },
    addImage: async (parent, { addImage }, context) => {
      if (context.user) {
        // const imageData = await Image.create(addImage);
        // return imageData;
        // this may need to be updated to handle firebase
        const reviewData = await Review.findByIdAndUpdate(
          { _id: addImage.reviewId },
          { $push: { images: addImage } },
          { new: true }
        );
        return reviewData;
      }
      throw AuthenticationError;
    },
    addReview: async (parent, { addReview }, context) => {
      if (context.user) {
        const userData = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { reviews: addReview } },
          { new: true }
        );
        return userData;
      }
      throw AuthenticationError;
    },
    deleteReview: async (parent, { _id }, context) => {
      if (context.user) {
        const userData = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reviews: { _id } } },
          { new: true }
        );
        return userData;
      }
      throw AuthenticationError;
    },
    addTag: async (parent, { addTag }, context) => {
      if (context.user) {
        // const tagData = await Tag.create(addTag);
        // return tagData;
        const cocktailData = await Cocktail.findByIdAndUpdate(
            { _id: addTag.cocktailId },
            { $push: { tags: addTag } },
            { new: true }
        );
        return cocktailData;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { addComment, _id }, context) => {
        if (context.user) {
            const commentData = await Comment.create(addComment);
            return commentData;
        }
        throw AuthenticationError;
    },
    addReaction: async (parent, { addReaction, _id }, context) => {
        if (context.user) {
            const reactionData = await Reaction.create(addReaction);
            return reactionData;
        }
        throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
