const express=require("express");

const Pizza =require("./models/pizzaModel");


const app=express();//create app var with the help of express
const db =require("./db.js")//its entry point for backend application

app.use(express.json());
const path=require("path")

const pizzasRoute=require("./routes/pizzasRoute")
const userRoute=require("./routes/userRoute")//entry point for userroute
const ordersRoute=require("./routes/ordersRoute")

app.use("/api/pizzas/",pizzasRoute)//instead of getting route all the obj in pizza collection we add here
app.use("/api/users/",userRoute)
app.use("/api/orders",ordersRoute)


if(process.env.NODE_ENV ==="production")
{
    app.use("/",express.static("client/build"))   

    app.get("*",(req,res)=>{         //what is entry point for client
        res.sendFile(path.resolve(__dirname,"client/build/index.html"))
    })
}

//app.get("/",(req,res)=>{ //home page rout in the backend
   // res.send("Server working "+port)

//});



const port=process.env.PORT || 5000;

app.listen(port, ()=>`server running on port 5000`)