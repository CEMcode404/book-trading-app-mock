import http from "./httpService";

const baseUrl = process.env.RESOURCE_SERVER_URL;

function getTransactions(cb) {
  http
    .get(`${baseUrl}/api/bookTransactions/getFeaturedTransactions`)
    .then((transaction) => {
      let err;
      cb(transaction, err);
    })
    .catch((err) => {
      let transaction;
      cb(transaction, err);
    });
}

function getUserTransactions(_id, paginate, cb) {
  if (!paginate) {
    paginate = { skip: 0, limit: 20 };
  }

  http
    .get(`${baseUrl}/api/bookTransactions/getUserTransactions`, {
      params: {
        ...paginate,
        _id,
      },
    })
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
    .get(`${baseUrl}/api/bookTransactions/getTransaction/${_id}`)
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
    .put(`${baseUrl}/api/bookTransactions/updateTransactionStatus`, {
      _id,
      status: data,
    })
    .then((transaction) => {
      let err;
      cb(transaction, err);
    })
    .catch((err) => {
      let transaction;
      cb(transaction, err);
    });
}

function requestAddTransaction(data, cb) {
  http
    .post(`${baseUrl}/api/bookTransactions/createTransaction`, data)
    .then((transaction) => {
      let err;
      cb(transaction, err);
    })
    .catch((err) => {
      let transaction;
      cb(transaction, err);
    });
}

function requestDeleteTransaction(_id, cb) {
  http
    .delete(`${baseUrl}/api/bookTransactions/deleteTransaction/${_id}`)
    .then((result) => {
      let err;
      cb(result, err);
    })
    .catch((err) => {
      let result;
      cb(result, err);
    });
}

export {
  getTransactions,
  getTransactionById,
  requestTransactionUpdate,
  requestAddTransaction,
  getUserTransactions,
  requestDeleteTransaction,
};
