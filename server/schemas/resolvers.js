const { Business, Cheers, Cocktail, Comment, Friends, Profile, Review, Tag, User, Allergen } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("profile")
          .populate("friends")
          .populate("badges")
          .populate("cocktails")
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
    business: async (parent, { _id }, context) => {
      if (context.user) {
        const businessData = await Business.findOne({ _id })
          .select("-__v -password")
          .populate("cocktails")
          .populate("reviews");
          return businessData;
      }
      throw AuthenticationError;
    },
    badges: async (parent, { _id }, context) => {
      if (context.user) {
        const badgesData = await Badge.find({ _id })
         .select("-__v -password");
          return badgesData;
      }
      throw AuthenticationError;
    },
    businesses: async (parent, args, context) => {
      if (context.user) {
        const businessData = await Business.find({}).select("-__v -password");
        return businessData;
      }
      throw AuthenticationError;
    },
    businessesLikedByUser: async (parent, { _id }, context) => {
      if (context.user) {
        const businesses = await Business.find({ likedByUsers: context.user._id })
          .select("-__v -password");
        return businesses;
      }
      throw AuthenticationError;
    },
    profile: async (parent, { _id }, context) => {
      if (context.user) {
        const profileData = await Profile.findOne({ _id })
        .select("-__v -password");
        return profileData;
      }
      throw AuthenticationError;
    },
    profiles: async (parent, args, context) => {
      if (context.user) {
        const profileData = await Profile.find({}).select("-__v -password");
        return profileData;
      }
      throw AuthenticationError;
    },
    cocktails: async (parent, args, context) => {
      if (context.user) {
        const cocktailData = await Cocktail.find({})
          .select("-__v -password")
          .populate("business")
          .populate("tags");
        return cocktailData;
      }
      throw AuthenticationError;
    },
    cocktail: async (parent, { _id }, context) => {
      if (context.user) {
        const cocktailData = await Cocktail.findOne({ _id })
          .select("-__v -password")
          .populate("reviews")
          .populate("comments")
          .populate("tags")
          .populate("business");
        return cocktailData;
      }
      throw AuthenticationError;
    },
    friends: async (parent, args, context) => {
      if (context.user) {
        const userId = context.user._id;
    
        try {
          const user = await User.findOne({ _id: userId });
          if (user) {
            const friendsData = await Friends.find({
              user: userId,
              status: { $in: ["accepted", "pending"] }
            });
    
            const friendIds = friendsData.map(friend => friend.friend);
    
            const friends = await User.find({ _id: { $in: friendIds } })
              .select("image username")
              .populate("profile")
              .exec();
    
            const friendList = friends.map(friend => ({
              _id: friend._id,
              username: friend.username,
              image: friend.image,
              fullName: friend.fullName,
              status: friendsData.find(f => f.friend.toString() === friend._id.toString()).status
            }));
    
            return friendList;
          } else {
            throw new AuthenticationError("User not found.");
          }
        } catch (error) {
          throw new Error("An error occurred while fetching friends.");
        }
      }
      throw new AuthenticationError("User not authenticated.");
    },
    review: async (parent, { _id }, context) => {
      if (context.user) {
        const reviewData = await Review.findOne({ _id })
          .select("-__v -password")
          .populate("comments")
          .populate("cheers");
        return reviewData;
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
    userReviews: async (parent, { _id }, context) => {
      if (context.user) {
        const userID = context.user._id;
        const userReviews = await Review.find({ user: userID })
          .select("-__v -password")
          .populate("cocktail")
          .populate("comments");
        return userReviews;
      }
      throw AuthenticationError;
    },
    friendReviews: async (parent, args, context) => {
      // Ensure the user is authenticated
      if (context.user) { 
      const userId = context.user._id;
      const user = await User.findById(userId).populate({
        path: 'friends',
        match: { status: 'accepted' },
        populate: { 
          path: 'friend', 
          model: 'User',
          select: 'image fullName username'
         },
      });
    
      if (!user) {
        throw new AuthenticationError('User not found.');
      }
    
      const friendIds = user.friends.map((friend) => friend.friend._id);
      const friendReviews = await Review.find({ user: { $in: friendIds } }).populate('cocktail');
    
      return friendReviews;
      }
      throw AuthenticationError
    },
    tag: async (parent, { _id }, context) => {
      if (context.user) {
        const tagData = await Tag.findOne({ _id })
         .select("-__v -password");
        return tagData;
      }
      throw AuthenticationError;
    },
    tags: async (parent, args, context) => {
      if (context.user) {
        const tagData = await Tag.find({}).select("-__v -password");
        return tagData;
      }
      throw AuthenticationError;
    },
    allergen: async (parent, { _id }, context) => {
      if (context.user) {
        const allergenData = await Allergen.findOne({ _id })
        .select("-__v -password");
        return allergenData;
      }
      throw AuthenticationError;
    },
    allergens: async (parent, args, context) => {
      if (context.user) {
        const allergenData = await Allergen.find({}).select("-__v -password");
        return allergenData;
      }
      throw AuthenticationError;
    },
  },
  //   images: async (parent, args, context) => {
  //     if (context.user) {
  //       const imageData = await Image.find({}).select("-__v -password");
  //       return imageData;
  //     }
  //     throw AuthenticationError;
  //   },
  //   image: async (parent, { _id }, context) => {
  //     if (context.user) {
  //       const imageData = await Image.findOne({ _id }).select("-__v -password");
  //       return imageData;
  //     }
  //     throw AuthenticationError;
  //   },
  // },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const existingUser = await User.findOne({
          $or: [{ username: args.username }, { email: args.email }],
        });
  
        if (existingUser) {
          throw new Error("Username or email is already in use.");
        }
  
        // Proceed with user creation if no existing user is found
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      } catch (error) {
        // Handle the error, and possibly return a specific error message
        console.error("Error creating user:", error);
        throw new Error("Failed to create a user");
      }
    },
    updateUser: async (parent, args, context) => {
       if (!context.user) {
          throw new AuthenticationError('You must be logged in to update your user information.');
        }
  
        try {
          const updatedUser = await User.findByIdAndUpdate(args._id, args, { new: true });
          return updatedUser;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to update user.');
        }
    },
    addBusiness: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add a business.');
        }
      
        try {
          const business = await Business.create(args);
          const token = signToken(business);
          return { business, token };
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create a business.');
        }
    },
    updateBusiness: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to update business information.');
        }
        try {
          const updatedBusiness = await Business.findByIdAndUpdate(args._id, args, { new: true });
          return updatedBusiness;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to update business.');
        }
    },
    updateProfile: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to update your profile.');
        }
        try {
          const updatedProfile = await Profile.findByIdAndUpdate(args._id, args, { new: true });
          return updatedProfile;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to update profile.');
        }
    },
    addCocktail: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add a cocktail.');
        }
        try {
          const cocktailData = await Cocktail.create(args);
          
          // Update the associated user's cocktails array
          const updatedUser = await User.findByIdAndUpdate(args.user, { $push: { cocktails: cocktailData } }, { new: true });
  
          // Update the associated business's cocktails array
          if (args.business) {
            const updatedBusiness = await Business.findByIdAndUpdate(args.business, { $push: { cocktails: cocktailData } }, { new: true });
          }
  
          return cocktailData;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create a cocktail.');
        }
    },
    updateCocktail: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to update a cocktail.');
        }
        try {
          const updatedCocktail = await Cocktail.findByIdAndUpdate(args._id, args, { new: true });
          return updatedCocktail;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to update cocktail.');
        }
    },
    removeCocktail: async (parent, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to delete a cocktail.');
      }
    
      try {
        // Check if the cocktail exists and belongs to the authenticated user
        const cocktail = await Cocktail.findOne({ _id, user: context.user._id });
    
        if (!cocktail) {
          throw new Error('Cocktail not found or you are not authorized to delete it.');
        }
    
        const deletedCocktail = await Cocktail.findByIdAndDelete(_id);
    
        return deletedCocktail;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete cocktail.');
      }
    },
    addReview: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add a review.');
        }
        try {
          const reviewData = await Review.create(args);
          const updatedUser = await User.findByIdAndUpdate(args.user, { $push: { reviews: reviewData } }, { new: true });
  
          const updatedCocktail = await Cocktail.findByIdAndUpdate(args.cocktail, { $push: { reviews: reviewData } }, { new: true });
  
          return reviewData;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create a review.');
        }
    },
    updateReview: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to update a review.');
        }
        try {
          const updatedReview = await Review.findByIdAndUpdate(args._id, args, { new: true });
          return updatedReview;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to update review.');
        }
    },
    removeReview: async (parent, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to delete a review.');
      }
  
      try {
        // Check if the review exists and is owned by the user
        const review = await Review.findById(_id);
        if (!review) {
          throw new Error('Review not found.');
        }
        if (review.user._id.toString() !== context.user._id) {
          throw new AuthenticationError('You are not authorized to delete this review.');
        }
  
        // Delete the review and its associated comments and cheers
        await Comment.deleteMany({ review: _id });
        await Cheers.deleteMany({ review: _id });
        const deletedReview = await Review.findByIdAndDelete(_id);
  
        return deletedReview;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete the review.');
      }
    },
    addComment: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add a comment.');
        }
        try {
          const commentData = await Comment.create(args);
          
          // Update the associated review's comments array
          const updatedReview = await Review.findByIdAndUpdate(args.review, { $push: { comments: commentData } }, { new: true });
  
          return commentData;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create a comment.');
        }
    },
    updateComment: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to update a comment.');
        }
        try {
          const updatedComment = await Comment.findByIdAndUpdate(args._id, args, { new: true });
          return updatedComment;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to update comment.');
        }
    },
    removeComment: async (parent, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to delete a comment.');
      }
  
      try {
        // Check if the comment exists and is owned by the user
        const comment = await Comment.findById(_id);
        if (!comment) {
          throw new Error('Comment not found.');
        }
        if (comment.user._id.toString() !== context.user._id) {
          throw new AuthenticationError('You are not authorized to delete this comment.');
        }
  
        // Delete the comment from the review
        await Review.findByIdAndUpdate(comment.review, { $pull: { comments: _id } });
        const deletedComment = await Comment.findByIdAndDelete(_id);
  
        return deletedComment;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete the comment.');
      }
    },
    addCheers: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add cheers.');
        }
        try {
          const cheersData = await Cheers.create(args);
          return cheersData;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to add cheers.');
        }
    },
    removeCheers: async (parent, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to delete cheers.');
      }
    
      try {
        // Check if the cheers exists and is owned by the user
        const cheers = await Cheers.findById(_id);
        if (!cheers) {
          throw new Error('Cheers not found.');
        }
        if (cheers.user._id.toString() !== context.user._id) {
          throw new AuthenticationError('You are not authorized to delete this cheers.');
        }
    
        const deletedCheers = await Cheers.findByIdAndDelete(_id);
    
        return deletedCheers;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete the cheers.');
      }
    },
    addTag: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to add a tag.');
      }
    
      try {
        // Check if a tag with the same name already exists
        const existingTag = await Tag.findOne({ name: args.name });
    
        if (existingTag) {
          throw new Error('Tag with the same name already exists.');
        } else {
          const tagData = await Tag.create(args);
          return tagData;
        }
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create a tag.');
      }
    },
    addAllergen: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to add an allergen.');
      }

      try {
        const existingAllergen = await Allergen.findOne({ name: args.name });

        if (existingAllergen) {
          throw new Error('Allergen with the same name already exists.');
        } else {
          const allergenData = await Allergen.create(args);
          return allergenData;
        }
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create an allergen.');
      }
    },
    addFriend: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add a friend.');
        }
        try {
          const friendData = await Friends.create(args);
          return friendData;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to add a friend.');
        }
    },
    acceptFriendRequest: async (parent, { friendshipId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to accept a friend request.');
      }
    
      try {
        const friendship = await Friends.findByIdAndUpdate(friendshipId, { status: 'accepted' }, { new: true });
    
        if (!friendship) {
          throw new Error('Failed to accept friend request.');
        }
    
        if (
          friendship.user.toString() !== context.user._id.toString() &&
          friendship.friend.toString() !== context.user._id.toString()
        ) {
          throw new AuthenticationError('You are not authorized to accept this friend request.');
        }
    
        return friendship;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to accept friend request.');
      }
    },
    removeFriend: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to delete a friend.');
        }
        try {
          const friendData = await Friends.findOneAndDelete(args);
          return friendData;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to delete a friend.');
        }
    },
    likeBusiness: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to like a business.');
        }
        try {
          const updatedUser = await User.findByIdAndUpdate(args.user, { $addToSet: { likedBusinesses: args.id } }, { new: true });
          context.user = updatedUser;

          const likedBusiness = await Business.findByIdAndUpdate(args._id, { $push: { likes: context.user._id } }, { new: true });
          return likedBusiness;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to like a business.');
        }
    },
    unlikeBusiness: async (parent, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to remove a like from a business.');
      }
    
      try {
        // Find the business by its _id
        const business = await Business.findById(_id);
    
        if (!business) {
          throw new Error('Business not found.');
        }
    
        // Check if the user has liked the business
        if (business.likes.includes(context.user._id)) {
          business.likes = business.likes.filter(userId => userId.toString() !== context.user._id.toString());
          await business.save();
    
          context.user.likedBusinesses = context.user.likedBusinesses.filter(
            businessId => businessId.toString() !== _id.toString()
          );
          await context.user.save();
    
          // Return the updated business
          return business;
        } else {
          throw new Error('You have not liked this business.');
        }
      } catch (error) {
        console.error(error);
        throw new Error('Failed to remove the like from the business.');
      }
    },
    login: async (parent, { identifier, password }) => {
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
      
        if (!user) {
          throw new AuthenticationError('Email or Username is incorrect. Please try again.');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Password is incorrect. Please try again.');
        }
      
        const token = signToken(user);
        return { user, token };
      },
    },
  };
  
//   Mutation: {
//     addUser: async (parent, args, context) => {
//       if (context.user) {
//         throw new AuthenticationError('You are already logged in as a user.');
//       }

//       try {
//         const user = await User.create(args);
//         const token = signToken(user);

//         return { user, token };
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to create a user.');
//       }
//     },
//     updateUser: async (parent, args, context) => {
//       if (!context.user) {
//         throw new AuthenticationError('You must be logged in to update your user information.');
//       }

//       try {
//         const updatedUser = await User.findByIdAndUpdate(args._id, args, { new: true });
//         return updatedUser;
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to update user.');
//       }
//     },
//     addBusiness: async (parent, args, context) => {
//       if (!context.user) {
//         throw new AuthenticationError('You must be logged in to add a business.');
//       }
    
//       try {
//         const business = await Business.create(args);
//         const token = signToken(business);
//         return { business, token };
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to create a business.');
//       }
//     },
//     updateBusiness: async (parent, args, context) => {
//       if (!context.user) {
//         throw new AuthenticationError('You must be logged in to update business information.');
//       }
//       try {
//         const updatedBusiness = await Business.findByIdAndUpdate(args._id, args, { new: true });
//         return updatedBusiness;
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to update business.');
//       }
//     },
//     updateProfile: async (parent, { _id }, context) => {
//       if (!context.user) {
//         throw new AuthenticationError('You must be logged in to update your profile.');
//       }
//       try {
//         const updatedProfile = await Profile.findByIdAndUpdate(_id, args, { new: true });
//         return updatedProfile;
//       } catch (error) {
//           console.error(error);
//           throw new Error('Failed to update profile.');
//       }
//     },
//     addCocktail : async (parent, args, context) => {
//       if (!context.user) {
//         throw new AuthenticationError('You must be logged in to add a cocktail.');
//       }
//       try {
//         const cocktailData = await Cocktail.create(args);
//         return cocktailData;
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to create a cocktail.');
//       }
//     },
//     updateCocktail: async (parent, { _id }, context) => {
//       if (!context.user) {
//         throw new AuthenticationError('You must be logged in to update a cocktail.');
//       }
//       try {
//         const updatedCocktail = await Cocktail.findByIdAndUpdate(_id, args, { new: true });
//         return updatedCocktail;
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to update cocktail.');
//       }
//     },
//     addReview: async (parent, args, context) => {
//       if (!context.user) {
//         throw new AuthenticationError('You must be logged in to add a review.');
//       }

//       try {
//         const reviewData = await Review.create(args);
//         await Cocktail.findByIdAndUpdate(
//           args.cocktail,
//           { $push: { reviews: reviewData._id } },
//           { new: true }
//         );
//         return reviewData;
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to create a review.');
//       }
//     },
//     updateReview: async (parent, { _id }, context) => {
//       if (!context.user) {
//         throw new AuthenticationError('You must be logged in to update a review.');
//       }
//       try {
//         const updatedReview = await Review.findByIdAndUpdate(_id, args, { new: true });
//         return updatedReview;
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to update review.');
//       }
//     },
//     addProfile: async (parent, { addProfile }, context) => {
//         if (context.user) {
//             const profileData = await Profile.create(addProfile);
//             return profileData;
//         }
//         throw AuthenticationError;
//     },
//     addCocktail: async (parent, args, context) => {
//       if (!context.user) {
//         throw new AuthenticationError('You must be logged in to add a cocktail.');
//       }
    
//       try {
//         const cocktailData = await Cocktail.create(args);
    
//         await User.findByIdAndUpdate(args.user, {
//           $push: { cocktails: cocktailData._id },
//         });
    
//         await Business.findByIdAndUpdate(args.business, {
//           $push: { cocktails: cocktailData._id },
//         });
    
//         return cocktailData;
//       } catch (error) {
//         console.error(error);
//         throw new Error('Failed to create a cocktail.');
//       }
//     },
//     addImage: async (parent, { addImage }, context) => {
//       if (context.user) {
//         // const imageData = await Image.create(addImage);
//         // return imageData;
//         // this may need to be updated to handle firebase
//         const reviewData = await Review.findByIdAndUpdate(
//           { _id: addImage.reviewId },
//           { $push: { images: addImage } },
//           { new: true }
//         );
//         return reviewData;
//       }
//       throw AuthenticationError;
//     },
//     addReview: async (parent, { addReview }, context) => {
//       if (context.user) {
//         const userData = await User.findByIdAndUpdate(
//           { _id: context.user._id },
//           { $push: { reviews: addReview } },
//           { new: true }
//         );
//         return userData;
//       }
//       throw AuthenticationError;
//     },
//     deleteReview: async (parent, { _id }, context) => {
//       if (context.user) {
//         const userData = await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $pull: { reviews: { _id } } },
//           { new: true }
//         );
//         return userData;
//       }
//       throw AuthenticationError;
//     },
//     addTag: async (parent, { addTag }, context) => {
//       if (context.user) {
//         // const tagData = await Tag.create(addTag);
//         // return tagData;
//         const cocktailData = await Cocktail.findByIdAndUpdate(
//             { _id: addTag.cocktailId },
//             { $push: { tags: addTag } },
//             { new: true }
//         );
//         return cocktailData;
//       }
//       throw AuthenticationError;
//     },
//     addComment: async (parent, { addComment, _id }, context) => {
//         if (context.user) {
//             const commentData = await Comment.create(addComment);
//             return commentData;
//         }
//         throw AuthenticationError;
//     },
//     // addReaction: async (parent, { addReaction, _id }, context) => {
//     //     if (context.user) {
//     //         const reactionData = await Reaction.create(addReaction);
//     //         return reactionData;
//     //     }
//     //     throw AuthenticationError;
//     // },
//     login: async (parent, { identifier, password }) => {
//       const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    
//       if (!user) {
//         throw new AuthenticationError("Email or Username is incorrect. Please try again.");
//       }
    
//       const correctPw = await user.isCorrectPassword(password);
    
//       if (!correctPw) {
//         throw new AuthenticationError("Password is incorrect. Please try again.");
//       }
    
//       const token = signToken(user);
//       return { user, token };
//     },
//   },
// };

module.exports = resolvers;
