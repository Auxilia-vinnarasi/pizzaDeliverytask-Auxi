import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pizza from "../components/Pizza";
import { getAllPizzas } from "../actions/pizzaActions";
import Filter from "../components/Filter";

export default function Homescreen() {
  const dispatch = useDispatch();

  const pizzasstate = useSelector((state) => state.getAllPizzasReducer); //so useSelector hook is used to get the data from the reducer

  const { pizzas, error, loading } = pizzasstate;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);

  return (
    <div>
      <Filter/>
      <div className="row justify-content-center">
        {/* Here im going to write conditional rendering... the req is sent and its waiting for response means*/}
        {loading ? (
          <Loading/>
        ) : error ? (
          <Error error="something went wrong"/>
        ) : (
          pizzas.map((pizza) => {
            return (
              <div className="col-md-3 m-3" key={pizza._id}>
                <div>
                <Pizza pizza={pizza} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
