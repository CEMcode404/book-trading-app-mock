const express = require("express");
const router = express.Router();
const { hashPassword } = require("../services/hashService");
const {
  User,
  validateUser,
  validateEmail,
  generateUserAuthToken,
} = require("../models/user");

router.post("/", async (req, res) => {
  if (!process.env.JWT_PRIVATE_KEY) return res.end();

  const userInfo = req.body;
  const { error } = validateUser(userInfo);
  if (error) return res.status(400).send(error.details[0].message);

  let user = User.findOne({ email: userInfo.email });
  if (user) return res.status(400).send("This email is already taken.");

  user = userInfo;
  user.password = await hashPassword(user.password);
  user.date = new Date();
  user.transactions = {};

  user = User.save(user);

  const token = generateUserAuthToken(user._id, User);

  const { _id, firstName, lastName } = user;
  res.setHeader("Authorization", token).send({ _id, firstName, lastName });
});

router.post("/email", (req, res) => {
  const email = req.body;

  const { error } = validateEmail(email);
  if (error) return res.status(400).send(error.details[0].message);

  const user = User.findOne(email);
  if (user) return res.status(400).send("Email is already taken");

  res.status(200).send("Email is available");
});

module.exports = router;
