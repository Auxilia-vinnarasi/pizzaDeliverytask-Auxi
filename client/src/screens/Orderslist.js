import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filter from "../components/Filter";
import { getAllOrders } from "../actions/orderActions";
import { deliverOrder } from "../actions/orderActions";

export default function Orderslist() {
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);

  const { loading, error, orders } = getordersstate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders()); //now it will send the req to backend in (orderroute)
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="something went wrong" />}
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr>  
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.orderItems[0]["_id"]}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>
                      {order.isDelivered ? (<h1>Delivered</h1>) : (<button className="btn" onClick={()=>{dispatch(deliverOrder(order._id))}}>Deliver</button>)}
                      {/* when we click deliver we have to send action to delivered in backend*/}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
