const { Context } = require("../db");
const transactions = require("../mockDatas/bookTransactions.json");

const Transactions = new Context(
  [
    "owner",
    "title",
    "bookCondition",
    "currency",
    "price",
    "useDuration",
    "timeUnit",
    "authors",
    "isbn",
    "status",
    "transactions",
    "images",
  ],
  { ...transactions }
);

module.exports = { Transactions };
