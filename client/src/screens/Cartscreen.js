import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import {deleteFromCart} from "../actions/cartActions";
import Checkout from "../components/Checkout";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Cartscreen() {

  AOS.init();

  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems; //there is only one items in cart reducer so we dont use destructure here ive directly written cart item
 
 var subtotal=cartItems.reduce((x,item)=>x+item.price,0) // subtotal value in cartitems
  const dispatch=useDispatch();//used dispatch object to click on add cart plus button
  return (
    <div>
      <div className="row justify-content-center p-2" data-aos="fade-down">
        <div className="col-md-6">
          <h2 style={{ fontSize: "40px" }}>My Cart</h2>
          {cartItems.map((item) => {
            return (
              <div className="flex-container">
                <div className="text-left m-1 w-100">{/*first div*/}
                  <h1>
                    {item.name}[{item.varient}]
                  </h1>
                  <h1>
                    Price: {item.quantity} * {item.prices[0][item.varient]} ={" "}
                    {item.price}
                  </h1>
                  <h1 style={{display:"inline"}}>Quantity:</h1>
                  <i className="fa fa-plus" aria-hidden="true" onClick={()=>{dispatch(addToCart(item,item.quantity+1,item.varient))}}></i>
                  <b>{item.quantity}</b>
                  <i className="fa fa-minus" aria-hidden="true" onClick={()=>{dispatch(addToCart(item,item.quantity-1,item.varient))}}></i>
                <hr/>
                </div>
                <div className="m-1 w-100">{/*second div*/}
                    <img src={item.image} style={{height:"80px",width:"80px"}}/>

                </div>
                <div className="m-1 w-100">{/*third div*/}
                <i className="fa fa-trash mt-5" aria-hidden="true" onClick={()=>{dispatch(deleteFromCart(item))}}></i>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-4 text-right">
            <h2 style={{fontsize:"45px"}}>SubTotal:{subtotal} /Rs-</h2>
            <Checkout subtotal={subtotal}/>
        </div>
      </div>
    </div>
  );
}
