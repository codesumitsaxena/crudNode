const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  fullName: String,
  position: String,
  department: String,
  employeID: Number,
  location: String,
  email: String,
  dob: String,
  phone: String,
  language: [String],
  skill: [String]
});

module.exports = mongoose.model("User", userSchema);
