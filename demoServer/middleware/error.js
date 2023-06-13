const { getLogger } = require("../startup/logging");

module.exports = function (err, req, res, next) {
  getLogger().log("error", err);

  res.status(500).send("Something failed.");
};
