const UserModel = require("../models/User");
const mongoose = require("mongoose");

//  post user data controller
const postData = async (req, res) => {
  try {
    const {
      name,
      dob,
      sex,
      mobile,
      govt,
      govtId,
      guardian,
      email,
      emergency_contact,
      address,
      state,
      city,
      country,
      pincode,
      occupation,
      religion,
      marital_status,
      blood_group,
      nationality,
    } = req.body;
    const newUserData = await UserModel.create({
      name,
      dob,
      sex,
      mobile,
      govt,
      govtId,
      guardian,
      email,
      emergency_contact,
      address,
      state,
      city,
      country,
      pincode,
      occupation,
      religion,
      marital_status,
      blood_group,
      nationality,
    });
    res.status(200).json(newUserData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getData = async (req, res) => {
  try {
    const getUserData = await UserModel.find();
    res.status(200).json({ getUserData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//   app.get('/api/users', async (req, res) => {
//     try {
//       const users = await User.find({});
//       res.status(200).send(users);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });

module.exports = {
  postData,
  getData,
};
