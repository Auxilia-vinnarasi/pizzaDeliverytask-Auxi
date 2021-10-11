const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
//const orderModel = require("../models/orderModel");
const stripe = require("stripe")(
  "sk_test_51JhDjXSGgrvOfeWwg2EMDvBRvwNGo0igwmvicqKxiI0MoyNpsgQKkYYkbTSaChRETgih0uVXogMP0LZkfffjAXv700XWDoKHvJ"
);
//using strike we have completed our transaction ,after copying secret key for nodejs.we have to integrating the node.js
//uuid have to import for unique key
const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
  //we are getting four params from the front end
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id, //shipping address and all token details will be given in this source
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        customer: customer.id,
        currency: "inr",
        receipt_email: token.email, //these are all mandory for the docs in stripe
      },
      {
        idempotencyKey: uuidv4(), //every payment we have one unique key
      }
    );
    if (payment) {
      //if the order is successful we have to send the data in db

      //we use order model to save the data in db
      const neworder = new Order({
        name: currentUser.name, //token.name is for delevery address name, current user.name is for account holder name
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: payment.source.id, //this is nothing but idempotencyKey // so we have to identify every new order so tahts y its mandatory
      });
      neworder.save();

      res.send("Order placed Successfully");
    } else {
      res.send("payment failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" + error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body; // receiving params as userid
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 }); //the collection will be sorted based on id prop so we have to change it,,so we have to directly sort into date prop
    //so its automatically sorted using date not in id
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
});



router.get("/getallorders", async (req, res) => {
  //we need not to receive anything from frontend
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});



router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;

  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.send("Order delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});



module.exports = router;
