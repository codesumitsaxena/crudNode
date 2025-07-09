const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  position: String,
  department: String,
  employeID: { type: Number, unique: true },
  location: String,
  email: { type: String, unique: true, required: true },
  dob: String,
  phone: String,
  language: [String],
  skill: [String]
});

module.exports = mongoose.model("User", userSchema);
