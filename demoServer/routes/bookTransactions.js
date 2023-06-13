const express = require("express");
const router = express.Router();
const { Transactions } = require("../models/transaction");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const fs = require("fs");

router.get("/", (req, res) => {
  let transaction = Transactions.getAll();
  if (!transaction) return res.status(500).end();

  reviews = Object.values(transaction);
  res.send(reviews);
});

router.get("/user", auth, (req, res) => {
  const { _id: userId } = req.user;

  let userTransactions = User.select(User.findById(userId), "transactions");
  if (!userTransactions) return res.status(404).end();

  userTransactions = Object.values(userTransactions.transactions);

  res.send(userTransactions).status(200);
});

router.get("/:_id", (req, res) => {
  const { _id } = req.params;
  res.send(Transactions.findById(_id)).status(200);
});

router.delete("/:_id", auth, (req, res) => {
  const { _id: userId } = req.user;
  const { _id: transactionId } = req.params;

  const result = Transactions.deleteById(transactionId);
  if (!result) return res.status(400).end();

  const transactions = User.select(
    User.findById(userId),
    "transactions"
  ).transactions;

  if (!transactions[transactionId]) return res.status(400).end();

  delete transactions[transactionId];

  res.send("Successful deletion");
});

router.put("/:_id", auth, (req, res) => {
  const { _id: userId } = req.user;
  const { _id: transactionId } = req.params;
  const { status } = req.body;

  let user = User.findById(userId);

  user = User.select(user, "transactions");
  user.transactions[transactionId].status = status;

  user = User.findByIdAndUpdate(userId, user);

  Transactions.findByIdAndUpdate(transactionId, {
    status: status,
  });

  res.send("Update successful").status(200);
});

router.post("/", auth, (req, res) => {
  const { _id: userId } = req.user;
  const { transaction } = req.body;

  const savedTransaction = Transactions.save(transaction);

  const user = User.findById(userId);

  const transactions = JSON.parse(JSON.stringify(user.transactions));
  transactions[savedTransaction._id] = savedTransaction;

  let newTransaction = User.select(
    User.findByIdAndUpdate(userId, { transactions }),
    "transactions"
  );

  newTransaction = newTransaction.transactions[savedTransaction._id];
  res.send(newTransaction).status(200);
});

module.exports = router;
