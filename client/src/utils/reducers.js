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
  
  // The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
  export const reducer = (state, action) => {
    switch (action.type) {
      // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.
      case UPDATE_PROFILE:
        return {
          ...state,
          products: [...action.products],
        };
  
      case ADD_COCKTAIL:
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, action.product],
        };
      // Returns a copy of state, sets the cartOpen to true and maps through the items in the cart.
      // If the item's `id` matches the `id` that was provided in the action.payload, we update the purchase quantity.
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
  
      // First we iterate through each item in the cart and check to see if the `product._id` matches the `action._id`
      // If so, we remove it from our cart and set the updated state to a variable called `newState`
      case REMOVE_COCKTAIL:
        let newState = state.cart.filter((product) => {
          return product._id !== action._id;
        });
  
        // Then we return a copy of state and check to see if the cart is empty.
        // If not, we set the cartOpen status to  `true`. Then we return an updated cart array set to the value of `newState`.
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState,
        };


      case ADD_COMMENT:
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, action.product],
        };

      case UPDATE_COMMENT:
        return {
          ...state,
          categories: [...action.categories],
        };

      case REMOVE_COMMENT:
        let newState = state.cart.filter((product) => {
          return product._id !== action._id;
        });

      case ADD_REACTION:
        let newState = state.cart.filter((product) => {
          return product._id !== action._id;
        });
      
      
        case REMOVE_REACTION:
        let newState = state.cart.filter((product) => {
          return product._id !== action._id;
        });

  
      // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
      // This saves us from a crash.
      default:
        return state;
    }
  };
  