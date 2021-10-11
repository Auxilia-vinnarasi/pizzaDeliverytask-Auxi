import axios from "axios";
export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  //why getstate means we have to get the current user detail while place the order

  dispatch({ type: "PLACE_ORDER_REQUEST" }); //first action for the dispatch is
  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;

  try {
    // wehave to get the values for it so added token,subtotal
    const response = await axios.post("api/orders/placeorder", {
      token,
      subtotal,
      currentUser,
      cartItems,
    });
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
    console.log(response);
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAILED" });
    console.log(error);
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_USER_ORDERS_REQUEST" });
  try {
    //we are sending the data as userid to backend
    const response = await axios.post("/api/orders/getuserorders", {
      userid: currentUser._id,
    }); //here we have to pass one params user id for that we have to store userdetails in getState
    console.log(response);
    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data }); //here also i have to send payload as parameter
  } catch (error) {
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error }); //here payload is error
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_ALLORDERS_REQUEST" });
  try {
    const response = await axios.get("/api/orders/getallorders");

    console.log(response);

    dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALLORDERS_FAILED", payload: error });
  }
};


export const deliverOrder = (orderid) => async (dispatch) => {


  try {
    const response = await axios.post("/api/orders/deliverorder", { orderid });
    console.log(response);
    //after clicking deliver its getting delivered after that its reloading.. so that we have to get dispatch action for getall orders
    alert("Order Delivered")
    const orders=await axios.get("/api/orders/getallorders")
    dispatch({ type: "GET_ALLORDERS_SUCCESS",payload:orders.data });

    //first we r sending delivery req to backend if it is success we have to fetch these orderslist component thats the reason im getting getallorders from the backend 
  } //for that delivery order we dont need any reducer cause we are not going to use it anywhere
  catch (error) {
  console.log(error);
  }
};
