import React from "react";
//after completing action,reducer,router, we have to dispatch action in useEffect hook
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPizzaById } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import { editPizza } from "../actions/pizzaActions";

export default function Editpizza({ match }) {
  //for edit pizza whenevr im clicking edit that id will be sent to Url for edit

  const dispatch = useDispatch(); //create dispatch obj
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);

  const { pizza, loading, error } = getpizzabyidstate;

  //we cannot write two var for the same name getpizza also has loading,error so

  const editpizzastate=useSelector((state)=>state.editPizzaReducer);

  const{editloading, editerror, editsuccess}=editpizzastate

  useEffect(() => {
    //here comes the logic we have to check the url id and pizza id matches then only will get the input text for that particular id
    if (pizza) {
      if (pizza._id == match.params.pizzaid) 
      {
        setname(pizza.name)
        setsmallprice(pizza.prices[0]["small"])
        setmediumprice(pizza.prices[0]["medium"])
        setlargeprice(pizza.prices[0]["large"])
        setimage(pizza.image)
        setdescription(pizza.description)
        setcategory(pizza.category)
      } 
      else 
      {
        dispatch(getPizzaById(match.params.pizzaid));
      }
    }
    else{
    dispatch(getPizzaById(match.params.pizzaid));
    }
  }, [pizza,dispatch]);//for every sec we have to track we are getting pizza or not for that we are passing pizza,dispatch

  function formHandler(e) {
    e.preventDefault();

    const editedpizza = {
        _id:match.params.pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };
   
    dispatch(editPizza(editedpizza))

  }

  return (
    <div>
      
      {/*<h1>Pizza Id={match.params.pizzaid}</h1>*/}
      {/*so im getting the particular pizza id here in edit */}
      {/*with the help of id we have to get single pizza in the update for that we have to add action and reducers */}

      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
      <h1>Edit Pizza</h1>
        {loading && <Loading />}
        {error && <Error error="something went wrong" />}
        {editsuccess && (<Success success="Pizza details edited successfully"/>)}
        {editloading && (<Loading />)}

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
            Edit Pizza
          </button>
        </form>
      </div>
    </div>
  );
}
