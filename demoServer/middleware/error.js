const { getLogger } = require("../startup/logging");

module.exports = function (err, req, res, next) {
  getLogger().log("error", err);
  //Try logging out if data won't load after restart. It may be cause
  //by the server restart since the server data storage run on memory.

  res.status(500).send("Something failed.");
};
