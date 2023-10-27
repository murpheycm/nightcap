import {
    ADD_COMMENT,
    ADD_REVIEW,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
    TOGGLE_CART,
  } from './action';
  
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
      case ADD_TO_CART:
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, action.product],
        };

      case UPDATE_COCKTAIL:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map((product) => {
            if (action._id === product._id) {
              product.purchaseQuantity = action.purchaseQuantity;
            }
            return product;
          }),
        };
  
      case REMOVE_COCKTAIL:
        return {
          ...state,
          categories: [...action.categories],
        };
  
      return {
          ...state,
          
        };


      case ADD_COMMENT:
        return {
          ...state,
          comments: [...state.post, action.comment],
        };

      case UPDATE_COMMENT:
        return {
          ...state,
          categories: [...action.categories],
        };

      case REMOVE_COMMENT:
        return {
          ...state,
          categories: [...action.categories],
        };

      case ADD_REACTION:
        return {
          ...state,
          categories: [...action.categories],
        };      
      
        case REMOVE_REACTION:
          return {
            ...state,
            categories: [...action.categories],
          };

  
      // This saves us from a crash.
      default:
        return state;
    }
  };
  