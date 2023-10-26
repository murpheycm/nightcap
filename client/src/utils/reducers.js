import {
    UPDATE_PROFILE,
    ADD_COCKTAIL,
    UPDATE_COCKTAIL,
    REMOVE_COCKTAIL,
    ADD_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT,
    ADD_REACTION,
    REMOVE_REACTION,
  } from './actions';
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case ADD_COCKTAIL:
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
  