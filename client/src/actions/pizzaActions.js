import axios from "axios";

//action name=getAllPizzas,dispatch will be our thunk function

export const getAllPizzas = () => async (dispatch) => {
  //we have to write our asynchronous fn here
  //whenever the function is called we have to create one reducer

  dispatch({ type: "GET_PIZZAS_REQUEST" }); //so whenever the fn called this will be sent it to reducer
  //before we call the asynchronous function..install axios
  //with the help of axios we can perform api operations

  try {
    const response = await axios.get("/api/pizzas/getallpizzas"); //before typing url we have to add proxy in package.json
    console.log(response);
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data }); //here also i have to send payload as parameter
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error }); //here payload is error
  }
};
//this is all about creating actions in the getAllPizzas function

export const filterPizzas = (searchkey, category) => async (dispatch) => {
  var filteredPizzas;

  dispatch({ type: "GET_PIZZAS_REQUEST" });

  try {
    const response = await axios.get("/api/pizzas/getallpizzas");
    filteredPizzas = response.data.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchkey)
    ); //this is for searching process only
    if (category != "all") {
      filteredPizzas = response.data.filter(
        (pizza) => pizza.category.toLowerCase() == category
      );
    }
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizzas }); //whenever the filter action took place we need only the filtered data so we mentioned filteredpizzazs here
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  //whenever we receive the request, im gonna dispatch action
  //so whenever the addpizza function called so we have to send addpiza req... we are receive pizza parameter

  dispatch({ type: "ADD_PIZZA_REQUEST" });
  try {
    const response = await axios.post("/api/pizzas/addpizza", { pizza });
    console.log(response);
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
  } catch (error) {
    dispatch({ type: "ADD_PIZZA_FAILED", payload: error });
  }
};

export const getPizzaById = (pizzaid) => async (dispatch) => {
  dispatch({ type: "GET_PIZZABYID_REQUEST" });

  try {
    const response = await axios.post("/api/pizzas/getpizzabyid", { pizzaid });
    console.log(response);
    dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZABYID_FAILED", payload: error });
  }
};

export const editPizza = (editedpizza) => async (dispatch) => {
  //whenever we receive the request, im gonna dispatch action
  //so whenever the addpizza function called so we have to send addpiza req... we are receive pizza parameter

  dispatch({ type: "EDIT_PIZZA_REQUEST" });
  try {
    const response = await axios.post("/api/pizzas/editpizza", { editedpizza });
    console.log(response);
    dispatch({ type: "EDIT_PIZZA_SUCCESS" }); //after editing successful..im going to navigate to pizzalist page
    window.location.href = "/admin/pizzaslist";
  } catch (error) {
    dispatch({ type: "EDIT_PIZZA_FAILED", payload: error });
  }
};

export const deletePizza = (pizzaid) => async (dispatch) => {
  try {
    const response = await axios.post("/api/pizzas/deletepizza", {pizzaid});
    alert("Pizza Deleted Successfully");
    console.log(response);
    window.location.reload();
  } catch (error) {
    alert("something went wrong");
    console.log(error);
  }
};
