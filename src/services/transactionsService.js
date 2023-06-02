import http from "./httpService";

function getTransactions(cb) {
  http
    .get("/api/bookTransactions")
    .then((transaction) => {
      let err;
      cb(transaction, err);
    })
    .catch((err) => {
      let transaction;
      cb(transaction, err);
    });
}

function getUserTransactions(cb) {
  http
    .get("/api/bookTransactions/user")
    .then((transactions) => {
      let err;
      cb(transactions, err);
    })
    .catch((err) => {
      let transactions;
      cb(transactions, err);
    });
}

function getTransactionById(_id, cb) {
  http
    .get("/api/bookTransactions/" + _id)
    .then((transaction) => {
      let err;
      cb(transaction, err);
    })
    .catch((err) => {
      let transaction;
      cb(transaction, err);
    });
}

function requestTransactionUpdate(_id, data, cb) {
  http
    .put("/api/bookTransactions/" + _id, data)
    .then((transaction) => {
      let err;
      cb(transaction, err);
    })
    .catch((err) => {
      let transaction;
      cb(transaction, err);
    });
}

function addTransaction(data, cb) {
  http
    .post("/api/bookTransactions", data)
    .then((transaction) => {
      let err;
      cb(transaction, err);
    })
    .catch((err) => {
      let transaction;
      cb(transaction, err);
    });
}

function deleteTransaction(_id, cb) {
  http
    .delete("/api/bookTransactions/" + _id)
    .then((result) => {
      let err;
      cb(result, err);
    })
    .catch((err) => {
      let result;
      cb(result, err);
    });
}

function storeBookId(_id) {
  localStorage.setItem("bookId", _id);
}

function getBookId() {
  return localStorage.getItem("bookId");
}

export {
  getTransactions,
  storeBookId,
  getBookId,
  getTransactionById,
  requestTransactionUpdate,
  addTransaction,
  getUserTransactions,
  deleteTransaction,
};
