import React from "react";
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addPizza } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success"

export default function Addpizza() {
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const dispatch = useDispatch();

  const addpizzastate=useSelector(state=>state.addPizzaReducer);//destructure out allthe var
  const{success ,error ,loading}=addpizzastate


  function formHandler(e) {
    e.preventDefault();

    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice
      }
    }
    console.log(pizza);
    //after completing the action and reducer for addpiza.. we have to dispatch action  from addpizza component
    dispatch(addPizza(pizza));//for this action im gonna send pizza as params..next gonna be backend thatsp pizza route
  }
  return (
    <div>
      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
        <h1>Add Pizza</h1>
          
        {loading && (<Loading/>)}
        {error && (<Error error="something went wrong"/>)}
        {success && (<Success success="New Pizza Added Successfully"/>)}

        <form onSubmit={formHandler}>
          <input
            type="text"
            className="form-control"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="small varient price"
            value={smallprice}
            onChange={(e) => {
              setsmallprice(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="medium varient price"
            value={mediumprice}
            onChange={(e) => {
              setmediumprice(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="large varient price"
            value={largeprice}
            onChange={(e) => {
              setlargeprice(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="category"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="image URL"
            value={image}
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <button className="btn mt-3" type="submit">
            Add Pizza
          </button>
        </form>
      </div>
    </div>
  );
}


//for deleting pizza we have to send the id to backend and from that backend we can delete that id and refresh it thats it for the delete.