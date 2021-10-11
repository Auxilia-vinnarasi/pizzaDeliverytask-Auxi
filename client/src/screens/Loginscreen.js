import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from "../actions/userActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const loginstate=useSelector((state)=>state.loginUserReducer)
  //destructure out the var in loginUserReducer
  const {loading,error}=loginstate; 

  const dispatch = useDispatch();

  useEffect(()=>{
if(localStorage.getItem("currentUser"))
{
    window.location.href="/"
}
  },[])

  function login() {
      const user={email,password}
    dispatch(loginUser(user));
  }
  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <div>
            <h2 className="text-center m-2" style={{ fontsize:"35px"}}>Login</h2>
            {loading && (<Loading/>)}
            {error && (<Error error="Invalid Credentials"/>)}

            <input
              type="text"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
              className="form-control"
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setpassword(e.target.value)}
              className="form-control"
            />

            <button onClick={login} className="btn mt-3 mb-3">
              LOGIN
            </button>
           <br></br>
            <a style={{color:"black"}} href="/register">Click Here To Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}
