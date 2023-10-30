import {
    UPDATE_USER,
    UPDATE_BUSINESS,
    LIKE_BUSINESS,
    UNLIKE_BUSINESS,
    UPDATE_PROFILE,
    UPDATE_COCKTAIL,
    UPDATE_REVIEW,
    ADD_COMMENT,
    UPDATE_COMMENT,
    ADD_CHEERS,
    REMOVE_CHEERS,
    ADD_TAG,
    ADD_ALLERGEN,
    ADD_FRIEND,
    ACCEPT_FRIEND_REQUEST,
    REMOVE_FRIEND,
  } from './action';
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_USER:
        return{
          ...state,
          users: state.users.map(user =>
            user.id === action.user.id ? action.user : user
          ),
        };

      case UPDATE_BUSINESS:
        return {
          ...state,
          // Update a business in the businesses array
          businesses: state.businesses.map(business =>
            business.id === action.business.id? action.business : business
          ),
        };

      case LIKE_BUSINESS:
        return {
          ...state,
          // Update the liked status of a business
          businesses: state.businesses.map(business =>
            business.id === action.business.id? action.business : business
          ),
        };

      case UNLIKE_BUSINESS:
        return {
          ...state,
          // Update the liked status of a business
          businesses: state.businesses.map(business =>
            business.id === action.business.id ? action.business : business
          ),
        };

      case UPDATE_PROFILE:
        return {
          // Update a profile in the profiles array
          profiles: state.profiles.map(profile =>
            profile.id === action.profile.id? action.profile : profile
          ),
        };

      case ADD_COMMENT:
        return {
          ...state,
          // Add a new comment to the comments array
          comments: [...state.comments, action.comment],
        };

      case UPDATE_COMMENT:
        return {
          ...state,
          // Update a comment in the comments array
          comments: state.comments.map(comment =>
            comment.id === action.comment.id ? action.comment : comment
          ),
        };

      case ADD_CHEERS:
        return {
          ...state,
          // Add a new cheer to the reactions array
          reactions: [...state.reactions, action.cheers],
        };      
    
      case REMOVE_CHEERS:
        return {
          ...state,
           // Remove a cheer from the reactions array
          reactions: state.reactions.filter(cheers => cheers.id !== action.cheersId),
        };

      case UPDATE_REVIEW:
        return {
          ...state,
          // Update a review in the reviews array
          reviews: state.reviews.map(review =>
            review.id === action.review.id ? action.review : review
          ),
        };

      case UPDATE_COCKTAIL:
        return {
          ...state,
          // Update a cocktail in the cocktails array
          cocktails: state.cocktails.map(cocktail =>
            cocktail.id === action.cocktail.id ? action.cocktail : cocktail
          ), 
        };

      case ADD_TAG:
        return {
         ...state,
          // Add a new tag to the tags array
          tags: [...state.tags, action.tag],
        };

      case ADD_ALLERGEN:
        return {
          ...state,
          // Add a new allergen to the allergens array
          allergens: [...state.allergens, action.allergen]
        };

      case ADD_FRIEND:
        return {
        ...state,
          // Add a new friend to the friends array
          friends: [...state.friends, action.friend],
        };

      case ACCEPT_FRIEND_REQUEST:
        return {
          ...state,
          // Update the status of a friend request to "accepted"
          friends: state.friends.map(friend =>
            friend.id === action.friend.id ? { ...friend, status: 'accepted' } : friend
          ),
        };
      
      case REMOVE_FRIEND:
        return {
         ...state,
          // Remove a friend from the friends array
          friends: state.friends.filter(friend => friend.id!== action.friendId),
        };
      // This saves us from a crash.
      default:
        return state;
    }
  };
  