//backend code for regostering new user

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    newUser.save();
    res.send("User regsitered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password }); //going to find obj in mongodb with email and password..if the credentia matched will get the user
    if (user.length > 0) {
      //if the user already in mongodb //here user is an array
      // res.send("User logged in successfully")
      // res.send(user[0])
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin, //so whenever the login is successful we ll get these details from the backend to the front end
        _id: user[0]._id,
      };
      res.send(currentUser);
    } else {
      return res.status(400).json({ message: "User login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
});



router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ messgae: error });
  }
});



router.post("/deleteuser", async (req, res) => {
  
  const userid = req.body.userid;

  try {
    await User.findOneAndDelete({ _id: userid });
    res.send("User deleted Successfully")
  } 
  catch (error) 
  {
    return res.status(400).json({message:error})
  }
});


//we have to export here

module.exports = router;
