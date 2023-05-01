const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  mobile: { type: String },
  password: { type: String },
});

const UserModal = mongoose.model("user", userSchema);

module.exports = { UserModal };
