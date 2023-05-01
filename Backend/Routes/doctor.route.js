const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DoctorModal } = require("../Model/doctor.model");

const doctorRouter = express.Router();

doctorRouter.post("/register", async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    let doctor = await DoctorModal.find({ email });
    if (doctor.length > 0) {
      res.status(400).send({ msg: "You are already Registered" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res
            .status(404)
            .send({ msg: "Something went wrong", Error: err.message });
        } else {
          let newDoctor = new DoctorModal({
            name,
            email,
            mobile,
            password: hash,
          });
          await newDoctor.save();
          res.status(200).send({ msg: "New User has been registered" });
        }
      });
    }
  } catch (err) {
    res.status(404).send({ msg: "Something went wrong", Error: err.message });
  }
});

doctorRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await DoctorModal.find({ email });
    if (doctor.length > 0) {
      bcrypt.compare(password, doctor[0].password, (err, result) => {
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

module.exports = { doctorRouter };
