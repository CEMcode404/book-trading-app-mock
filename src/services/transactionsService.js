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

export { getTransactions };
