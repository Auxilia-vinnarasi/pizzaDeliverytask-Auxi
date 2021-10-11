import {combineReducers} from "redux"

import {createStore,applyMiddleware} from "redux"

import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension"
import {getAllPizzasReducer,addPizzaReducer,getPizzaByIdReducer,editPizzaReducer} from "./reducers/pizzaReducers"
import { cartReducer } from "./reducers/cartReducer";
import {registerUserReducer,loginUserReducer,getAllUsersReducer} from "./reducers/userReducer"
import {placeOrderReducer,getUserOrdersReducer,getAllOrdersReducer} from "./reducers/orderReducer"

//to combine all reducers 
const finalReducer=combineReducers({
    //call from pizzaReducers
    getAllPizzasReducer :getAllPizzasReducer,
    cartReducer:cartReducer,  
    registerUserReducer:registerUserReducer,
    loginUserReducer:loginUserReducer,
    placeOrderReducer:placeOrderReducer,
    getUserOrdersReducer:getUserOrdersReducer,
    addPizzaReducer:addPizzaReducer,
    getPizzaByIdReducer:getPizzaByIdReducer,
    editPizzaReducer:editPizzaReducer,
    getAllOrdersReducer:getAllOrdersReducer,
    getAllUsersReducer:getAllUsersReducer

})
//to store data in the local storage then only we ll get data after refreshing also
const cartItems=localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[]//we have to covert the data to string

const currentUser=localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")):null



//reducers are there to manage state in an application 

const initalState={
    //add cartItems to the cartReducer.
    cartReducer:{
    cartItems:cartItems
    },
    loginUserReducer:{
        currentUser :currentUser
    }
}

const composeEnhancers=composeWithDevTools({})//from redux dev tools

//to create store we have to use three params one is reducer,sec one is initial state, and third one is composeEnhancers
const store=createStore(finalReducer, initalState, composeEnhancers(applyMiddleware(thunk)))

export default store


