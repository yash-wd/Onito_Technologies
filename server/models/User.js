const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  sex: { type: String, required: true },
  mobile: { type: String },
  govt: { type: String },
  govtId: { type: String },
  guardian: { type: String },
  email: { type: String },
  emergency_contact: { type: String },
  address: { type: String },
  state: { type: String },
  city: { type: String },
  country: { type: String },
  pincode: { type: String },
  occupation: { type: String },
  religion: { type: String },
  marital_status: { type: String },
  blood_group: { type: String },
  nationality: { type: String },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
