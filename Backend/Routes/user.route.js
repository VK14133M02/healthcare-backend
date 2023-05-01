const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModal } = require("../Model/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, mobile, password } = req.body;
  try {
    let user = await UserModal.find({ email });
    if (user.length > 0) {
      res.send({ msg: "You are already Registered, Login Please" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res
            .status(404)
            .send({ msg: "Something went wrong", Error: err.message });
        } else {
          let newUser = new UserModal({
            username,
            email,
            mobile,
            password: hash,
          });
          await newUser.save();
          res.status(200).send({ msg: "New User has been registered" });
        }
      });
    }
  } catch (err) {
    res.status(404).send({ msg: "Something went wrong", Error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModal.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "masai");
          res.send({ msg: "Login successful", Token: token });
        } else {
          res.send({ msg: "Wrong password" });
        }
      });
    } else {
      res.send({ msg: "Register First, You have not Registerd" });
    }
  } catch (err) {
    res.status(400).send({ msg: "something went wrong", Error: err.message });
  }
});

module.exports = { userRouter };
