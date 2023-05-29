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

function storeBookId(_id) {
  localStorage.setItem("bookId", _id);
}

function getBookId() {
  return localStorage.getItem("bookId");
}

export { getTransactions, storeBookId, getBookId, getTransactionById };
