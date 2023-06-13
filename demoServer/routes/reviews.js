const express = require("express");
const router = express.Router();
const { Review } = require("../models/review");

router.get("/", (req, res) => {
  let reviews = Review.getAll();
  reviews = Object.values(reviews);
  res.send(reviews);
});

module.exports = router;
