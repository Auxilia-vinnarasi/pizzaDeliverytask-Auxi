//addto cart is my action name im gonna dispatch it here
//3 values im going to receive along with item pizza i want quantity and price
export const addToCart = (pizza, quantity, varient) => (dispatch, getState) => {
  var cartItem = {
    name: pizza.name,
    _id: pizza._id,
    image: pizza.image,
    varient: varient,
    quantity: Number(quantity),
    prices: pizza.prices,
    price: pizza.prices[0][varient] * quantity //price of the cart items here
    //if we do not have prices array in cart item we can not able to calculate subtotal when we change the quantity
    //price is var-prices is the array which we need to calculate the price in cart
  };

  if (cartItem.quantity > 10) {
    alert("You can not enter more than 10 quantities");
  } else {
    if (cartItem.quantity < 1) {
      dispatch({ type: "DELETE_FROM_CART", payload: pizza });
    } else {
      //dispatch the action
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    }
  }

  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  //to store data in local storage
};

export const deleteFromCart = (pizza) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: pizza });

  //after deleting we have to update the local storage also so i ve added getstate
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
