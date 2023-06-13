const { Context } = require("../db");
const getPhoneCodes = require("../services/PhoneNoRulesService");
const { generateAuthToken } = require("../services/jwtService");
const Joi = require("joi");

const User = new Context([
  "firstName",
  "lastName",
  "mobileNo",
  "email",
  "password",
  "date",
  "transactions",
]);

const generateUserAuthToken = function (id, context) {
  const result = context.findById(id);
  return generateAuthToken({
    _id: result._id,
    firstName: result.firstName,
    lastName: result.lastName,
  });
};

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().max(15).required(),
    lastName: Joi.string().max(15).required(),
    mobileNo: Joi.string().regex(getPhoneCodes()).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(50).min(5).required(),
    confirmPassword: Joi.string(),
  }).required();

  return schema.validate(user);
}

function validateUserUpdate(user) {
  const method = (value, helpers) => {
    if (Object.keys(value).length < 1) {
      return helpers.message("Object must not be empty.");
    }
    return value;
  };

  const schema = Joi.object({
    firstName: Joi.string().max(15),
    lastName: Joi.string().max(15),
    mobileNo: Joi.string().regex(getPhoneCodes()),
    email: Joi.string().email(),
    password: Joi.string().max(50).min(5),
  })
    .required()
    .custom(method, "custom validation");

  return schema.validate(user);
}

function validateEmail(email) {
  const schema = Joi.object({
    email: Joi.string().email(),
  }).required();

  return schema.validate(email);
}

module.exports = {
  User,
  validateUser,
  validateUserUpdate,
  validateEmail,
  generateUserAuthToken,
};
