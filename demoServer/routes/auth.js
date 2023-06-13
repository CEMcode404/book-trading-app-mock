const express = require("express");
const { User, generateUserAuthToken } = require("../models/user");
const { verifyPassword } = require("../services/hashService");
const Joi = require("joi");
const { validateId } = require("../db");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", async (req, res) => {
  const loginCredential = req.body;

  const { error } = validateLoginCredential(loginCredential);
  if (error) return res.status(400).send(error.details[0].message);

  const user = User.findOne({ email: loginCredential.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const isValid = await verifyPassword(loginCredential.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password.");

  const token = generateUserAuthToken(user._id, User);
  res.send(token);
});

router.post("/withID", auth, async (req, res) => {
  const { password } = req.body;
  const { _id: id } = req.user;

  let isValid = validateId(id);
  if (!isValid) return res.status(400).send("Invalid ID or Password.");

  const { error } = validatePassword({ password });
  if (error) return res.status(400).send("Invalid ID or Password");

  const user = User.select(User.findById(id), "password");
  if (!user) return res.status(400).send("Invalid ID or Password.");

  isValid = await verifyPassword(password, user.password);
  if (!isValid) return res.status(400).send("Invalid ID or Password.");

  res.status(200).send("Valid Identity");
});

function validateLoginCredential(user) {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(50).min(5).required(),
  });

  return userSchema.validate(user);
}

function validatePassword(password) {
  const passwordSchema = Joi.object({
    password: Joi.string().max(50).min(5).required(),
  });

  return passwordSchema.validate(password);
}

module.exports = router;
