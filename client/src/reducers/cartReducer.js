export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      //item is present or not
      const alreadyExists = state.cartItems.find(
        (item) => item._id === action.payload._id
      ); //for updating

      if (alreadyExists){
        //updaating quantity logic
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        };
      } // adding new items
      else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload], //everytime we are incrementing one item to cart with the already added items here
        };
      }
    case "DELETE_FROM_CART":
      return {
          ...state,
          cartItems: state.cartItems.filter((item) =>item._id !== action.payload._id)
      };
    default:
      return state;
  }
};
//now i have to add these in store
