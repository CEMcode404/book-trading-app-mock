const jwt = require("jsonwebtoken");

function generateAuthToken(data) {
  return jwt.sign(data, process.env.JWT_PRIVATE_KEY);
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return decoded;
  } catch (err) {
    return false;
  }
}

module.exports = { generateAuthToken, verifyToken };
