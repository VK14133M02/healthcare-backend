const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  password: { type: String },
});

const DoctorModal = mongoose.model("doctor", doctorSchema);

module.exports = { DoctorModal };
