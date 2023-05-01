const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  department: String,
  date: String,
  user: String,
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = { AppointmentModel };
