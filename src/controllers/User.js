const mongoose = require("mongoose");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const secretConfig = require("../config/secret");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateToken = (email) =>
  jwt.sign({ email }, secretConfig.secret, { expiresIn: "1d" });

exports.create = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(
      req?.body?.password,
      saltRounds
    );

    const result = await User.create({
      ...req.body,
      password: encryptedPassword,
    });
    return res.send({ ...result.toJSON(), token: generateToken() });
  } catch (error) {
    return res.send(error);
  }
};

exports.auth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.exists({ email });
    if (exists) {
      const user = await User.findOne({ email }).exec();

      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = generateToken(user.email, user.role);

          return res.send({ ...user.toJSON(), token });
        }
      }
    }
    return res.status(404).send();
  } catch (error) {
    return res.send(error);
  }
};
