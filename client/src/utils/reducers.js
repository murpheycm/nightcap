import {
    ADD_COMMENT,
    ADD_REVIEW,
  } from './action';
  
  // The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
  export const reducer = (state, action) => {
    switch (action.type) {
      // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.
      case ADD_COMMENT:
        return {
          ...state,
          comments: [...state.comments, action.comment],
        };
      case ADD_REVIEW:
        return {
          ...state,
          reviews: [...state.reviews, action.review],
        };    

      default:
        return state;
    }
  };
  