const express = require("express");
const clientAccessibleRoutes = require("../routes/clientAccessibleRoutes");
const books = require("../routes/books");
const error = require("../middleware/error.js");
const signup = require("../routes/signup");
const auth = require("../routes/auth");
const user = require("../routes/user");
const reviews = require("../routes/reviews");
const bookTransaction = require("../routes/bookTransactions");

module.exports = function (app) {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.static("../build/"));
  app.use("/api/auth/", auth);
  app.use("/api/books/", books);
  app.use("/api/signup/", signup);
  app.use("/api/user/", user);
  app.use("/api/reviews", reviews);
  app.use("/api/bookTransactions", bookTransaction);
  app.use("/", clientAccessibleRoutes);
  app.use(error);
};
