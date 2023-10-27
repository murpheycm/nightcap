import {
    ADD_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT,
    ADD_CHEERS,
    REMOVE_CHEERS,
    ADD_REVIEW,
    UPDATE_REVIEW,
    REMOVE_REVIEW,
    ADD_COCKTAIL,
    UPDATE_COCKTAIL,
    REMOVE_COCKTAIL,
  } from './action';
  
  export const reducer = (state, action) => {
    switch (action.type) {
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

      case REMOVE_COMMENT:
        return {
          ...state,
          // Remove a comment from the comments array
          comments: state.comments.filter(comment => comment.id !== action.commentId),
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

      case ADD_REVIEW:
        return {
          ...state,
          // Add a new review to the reviews array
          reviews: [...state.reviews, action.review],
        };

      case UPDATE_REVIEW:
        return {
          ...state,
          // Update a review in the reviews array
          reviews: state.reviews.map(review =>
            review.id === action.review.id ? action.review : review
          ),
        };
        
      case REMOVE_REVIEW:
        return {
          ...state,
          // Remove a review from the reviews array
          reviews: state.reviews.filter(review => review.id !== action.reviewId),
        };  

      case ADD_COCKTAIL:
        return {
          ...state,
          // Add a new cocktail to the cocktails array
          cocktails: [...state.cocktails, action.cocktail],
        };
      
      case UPDATE_COCKTAIL:
        return {
          ...state,
          // Update a cocktail in the cocktails array
          cocktails: state.cocktails.map(cocktail =>
            cocktail.id === action.cocktail.id ? action.cocktail : cocktail
          ), 
        };
  
      case REMOVE_COCKTAIL:
        return {
          ...state,
          // Remove a cocktail from the cocktails array
          cocktails: state.cocktails.filter(cocktail => cocktail.id !== action.cocktailId),
        };

  
      // This saves us from a crash.
      default:
        return state;
    }
  };
  