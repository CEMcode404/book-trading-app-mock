const express = require("express");
const router = express.Router();
const filterAllowedPaths = require("../middleware/filterAllowedPath");

router.get("*", filterAllowedPaths, (req, res) => {
  res.sendFile("/index.html", { root: "../build" }, (err) => {
    if (err) {
      res.status(err.status).end();
      throw err;
    }
  });
});

module.exports = router;
