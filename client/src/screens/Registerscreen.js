import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { registerUser } from '../actions/userActions';
import Success from "../components/Success";
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Registerscreen() {
    const[name, setname]=useState("");
    const[email, setemail]=useState("");
    const[password, setpassword]=useState("");
    const[cpassword,setcpassword]=useState("");
    const registerstate=useSelector((state)=>state.registerUserReducer);
    //destructure out all these registerUserReducer from userReducer
    const {error,loading,success}=registerstate;
   
    const dispatch=useDispatch();

    function register(){
        if(password!=cpassword)
        {
            alert("password not matched")
        }
        else{
            const user={
                name,//name:name
                email,//email:email
                password//password:password
            }
            console.log(user)
            dispatch(registerUser(user))//dispatch action by sending the user
        }
    }
    return (
        <div>
             <div className="row justify-content-center mt-5">
                 <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
                     {loading && (<Loading/>)} 
                    {success && (<Success success="User Registered Successfully"/>)}{/* for success component im gonna use success props*/}
                     {error && (<Error error="Email already Registered"/>)} {/* for error component im gonna use this props*/}

                    <div>
                        <h2 className="text-center m-2" style={{fontsize:"35px"}}>Register</h2>
                        <input type="text" placeholder="Name" value={name} required onChange={(e)=>setname(e.target.value)} className="form-control"/>
                        <input type="text" placeholder="Email" value={email} required onChange={(e)=>setemail(e.target.value)} className="form-control"/>
                        <input type="text" placeholder="Password" value={password} required onChange={(e)=>setpassword(e.target.value)}className="form-control"/>
                        <input type="text" placeholder="Confirm Password" value={cpassword}  required onChange={(e)=>setcpassword(e.target.value)}className="form-control"/>
                        <button onClick={register} className="btn mt-3 mb-3">Register</button>
                        <br></br>
                        <a style={{color:"black"}} href="/login">Click Here To Login</a>
                    </div>

                </div>
            </div>
        </div>
    )
}
