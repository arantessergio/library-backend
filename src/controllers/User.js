const mongoose = require("mongoose");
const User = require("../models/User");

exports.create = async (req, res) => {
  try {
    const result = await User.create(req.body);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

exports.auth = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email, password }).exec();
    if (foundUser) {
      return res.send(foundUser);
    }
    return res.status(404).send();
  } catch (error) {
    return res.send(error);
  }
};
