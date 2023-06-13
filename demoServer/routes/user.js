const express = require("express");
const { User, validateUserUpdate } = require("../models/user");
const { validateId } = require("../db");
const auth = require("../middleware/auth");
const { hashPassword } = require("../services/hashService");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const { _id: userId } = req.user;
  const isValid = validateId(userId);
  if (!isValid) return res.status(400).send("Invalid User Id.");

  const userInfo = await User.select(
    User.findById(userId),
    "-password -_id -date -__v -transactions"
  );

  if (!userInfo) return res.status(400).send("Invalid User Id.");
  res.send(userInfo);
});

router.put("/", auth, async (req, res) => {
  const updatedUserInfo = req.body;

  const { error } = validateUserUpdate(updatedUserInfo);
  if (error) return res.status(400).send(error.details[0].message);

  if (updatedUserInfo.email) {
    const isEmailTaken = await User.findOne({ email: updatedUserInfo.email });
    if (isEmailTaken) return res.status(400).send("Email is taken.");
  }

  if (updatedUserInfo.password) {
    updatedUserInfo.password = await hashPassword(updatedUserInfo.password);
  }

  const id = req.user._id;
  const newUserInfo = await User.select(
    User.findByIdAndUpdate(id, updatedUserInfo),
    "-password -date -__v -_id -transactions"
  );

  res.send(newUserInfo);
});

module.exports = router;
