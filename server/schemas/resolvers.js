const { Business, Cheers, Cocktail, Comment, Friends, Profile, Review, Tag, User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("profile")
          .populate("friends")
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
    addUser: async (parent, args, context) => {
      if (context.user) {
        throw new AuthenticationError('You are already logged in as a user.');
      }
  
        try {
          const user = await User.create(args);
          const token = signToken(user);
          return { user, token };
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create a user.');
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
    addTag: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add a tag.');
        }
        try {
          const tagData = await Tag.create(args);
          return tagData;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create a tag.');
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
    acceptFriendRequest: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to accept a friend request.');
      }

      try {
        const friendship = await Friends.findByIdAndUpdate(friendshipId);

        if (!friendship) {
          throw new Error('Failed to accept friend request.');
        }

        if (friendship.user.toString() !== context.user._id.toString() && friendship.friend.toString () !== context.user.id.toString()) {
          throw new AuthenticationError('You are not authorized to accept this friend request.');
        }

        friendship.status = "accepted";
        await frienship.save();

        return friendship;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to accept friend request.');
      }
    },
    deleteFriend: async (parent, args, context) => {
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
