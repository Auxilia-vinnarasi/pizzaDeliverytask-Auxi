import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filter from "../components/Filter";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";
import { Link } from "react-router-dom";


export default function Pizzaslist() {
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { error, loading, pizzas } = pizzasstate;
  const dispatch = useDispatch();

  //write useEffect hook to dispatch the action
  
  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);

  return (
    <div>
      <h2>Pizzas List</h2>{/*so im getting all the pizzas here after that have to do conditional rendring*/}
      {loading && (<Loading/>)}
      {error && (<Error error="Something went Wrong"/>)} 
      <table className="table table-bordered table-responsive-sm">
          <thead className="thead-dark">
              <tr>
                  <th>Name</th>
                  <th>Prices</th>
                  <th>Category</th>
                  <th>Actions</th>  
              </tr>
          </thead>
          <tbody>
              {pizzas && pizzas.map(pizza=>{// for every iteration we ahve to get one row
                  return <tr>
                      <td>{pizza.name}</td>
                      <td>
                          Small:{pizza.prices[0]["small"]} <br></br>
                          Medium:{pizza.prices[0]["medium"]} <br></br>
                          Large:{pizza.prices[0]["large"]} <br></br>
                      </td>
                      <td>{pizza.category}</td>
                      <td>
                          <i className="fa fa-trash m-1" onClick={()=>{dispatch(deletePizza(pizza._id))}}></i>
                        <Link to={`/admin/editpizza/${pizza._id}`}>{/*im using back tich here cause im using URL here*/}<i className="fa fa-edit m-1"></i></Link> {/*we were using link tag cause its navigate toedit screen(next page)when we click edit*/}
                      </td>

                      </tr>
              })}
          </tbody>
      </table>
    
    </div>
  );
}
