const { verifyToken } = require("../services/jwtService");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  const decoded = verifyToken(token);
  if (!decoded) return res.status(400).send("Invalid token.");

  req.user = decoded;
  next();
};
