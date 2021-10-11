const mongoose=require("mongoose");


var mongoURL="mongodb+srv://auxilia:admin123@cluster0.bg8rf.mongodb.net/pizzaDelivery"//replace test with the db name (pizzaDelivery)
//we can write opertion in our pizzaDelivery only

//connect mongoose
mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})//mongodb documentation we have to write this

var db=mongoose.connection

//success function
db.on("connected",()=>{
    console.log(`Mongo DB connection successfull`)
})

//error function
db.on("error",()=>{
    console.log(`mongo DB connection failed`)
})

module.exports=mongoose