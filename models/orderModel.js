const mongoose=require("mongoose");

//we have created schemA

const orderSchema=mongoose.Schema({ //mandatory things for orders
    name:{type:String,require},
    email:{type:String,require},
    userid:{type:String,require},
    orderItems:[],
    shippingAddress:{type:Object},
    orderAmount:{type:Number,require},
    transactionId:{type:String,require},
    isDelivered:{type:Boolean,require, default:false}// cause the admin only gonna change isdelivered true
},{
    timestamps:true //this is to check the date
})

//HERE WE have to create model
module.exports=mongoose.model("orders",orderSchema);//collection name is "orders",the schema name is orderSchema.