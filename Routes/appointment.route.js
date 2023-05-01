const express = require("express");
const { AppointmentModel } = require("../Model/appointment.model");

const appointmentRoute = express.Router();

appointmentRoute.post("/book", async (req, res) => {
  try {
    const appointment = new AppointmentModel(req.body);
    await appointment.save();
    res.status(200).send({ msg: "Your Apponitment has been booked" });
  } catch (err) {
    res.status(404).send({ msg: "Something went wrong", Error: err.message });
  }
});

appointmentRoute.get("/", async (req, res) => {
  try {
    let myAppointment = await AppointmentModel.find({ user: req.body.user });
    res.status(200).send(myAppointment);
  } catch (err) {
    res.status(404).send({ msg: "Something went wrong", Error: err.message });
  }
});

appointmentRoute.patch("/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  const appointment = await AppointmentModel.findOne({ _id: ID });
  let user_in_appointment = appointment.user;
  let user_making_req = req.body.user;
  try {
    if (user_in_appointment !== user_making_req) {
      res.status(500).send({ msg: "You are not Authorised" });
    } else {
      await AppointmentModel.findByIdAndUpdate({ _id: ID }, payload);
      res.status(200).send("Appointment data has been modified");
    }
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", Error: err.message });
  }
});

appointmentRoute.delete("/:id", async (req, res) => {
  const ID = req.params.id;
  const appointment = await AppointmentModel.findOne({ _id: ID });
  let user_in_appointment = appointment.user;
  let user_making_req = req.body.user;
  try {
    if (user_in_appointment !== user_making_req) {
      res.status(500).send({ msg: "You are not Authorised" });
    } else {
      await AppointmentModel.findByIdAndDelete({ _id: ID });
      res.status(200).send("Appointment data has been deleted");
    }
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", Error: err.message });
  }
});

module.exports = { appointmentRoute };
