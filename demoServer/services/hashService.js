const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPasswordwSalt = await bcrypt.hash(password, salt);
    return hashPasswordwSalt;
  } catch (err) {
    return new Error("Failed to hashed a password.");
  }
}

async function verifyPassword(password, hashPassword) {
  try {
    const isValid = await bcrypt.compare(password, hashPassword);
    return isValid;
  } catch (err) {
    return new Error("Failed to verify the password.");
  }
}

module.exports = { hashPassword, verifyPassword };
