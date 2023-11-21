import React, { useState, useEffect, useContext } from "react";

import AddBookTransaction from "../addBookTransaction/AddBookTransaction.jsx";
import Pagination from "../../commonComponents/pagination/Pagination.jsx";
import TransactionCard from "../transactionCard/TransactionCard.jsx";

import {
  getUserTransactions,
  requestAddTransaction,
  requestDeleteTransaction,
  requestTransactionUpdate,
} from "../../../services/transactionsService.js";
import { UserContext } from "../../contexts/userContext.js";
import "./myTransaction.scss";

const MyTransaction = () => {
  const baseUrl = process.env.RESOURCE_SERVER_URL;
  const [isBookTransactionFormOpen, setIsBookTransactionFormOpen] =
    useState(false);
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getUserTransactions(user._id, null, (res, err) => {
      if (res) {
        //Modify image field and prepend image paths with resource server domain name
        //because the api only return images paths
        const transactionsWithModifiedImgURL = res.data.map(
          ({ images: imgSrcs, ...rest }) => {
            return {
              imgSrcs: imgSrcs.map((path) => `${baseUrl}/${path}`),
              ...rest,
            };
          }
        );

        setTransactions(transactionsWithModifiedImgURL);
      }
    });
  }, []);

  const handleAddBookTransaction = (transaction) => {
    requestAddTransaction(transaction, (res, err) => {
      if (res) {
        //prepend image path with domain name;
        let { images: imgSrcs, ...rest } = res.data;

        setTransactions([
          ...transactions,
          {
            ...rest,
            imgSrcs: imgSrcs.map((imagePath) => `${baseUrl}/${imagePath}`),
          },
        ]);
      }
    });
  };

  const handleDeleteBookTransaction = (transactionId) => {
    const duplicateBookTransactions = transactions.map((transaction) =>
      Object.assign({}, transaction)
    );

    const bookTransactionsWithDeletionApplied =
      duplicateBookTransactions.filter(
        (transaction) => transaction._id !== transactionId
      );

    setTransactions(bookTransactionsWithDeletionApplied);
    requestDeleteTransaction(transactionId, (res, err) => {
      if (err) setTransactions(duplicateBookTransactions);
    });
  };

  const handleChangeStatus = (transactionId) => {
    const duplicateBookTransactions = transactions.map((transaction) =>
      Object.assign({}, transaction)
    );

    let newStatus;
    const bookTransactionsWithStatusModification = transactions.map(
      (bookTransaction) => {
        if (bookTransaction._id === transactionId) {
          newStatus =
            bookTransaction.status === "AVAILABLE" ? "PENDING" : "AVAILABLE";

          return Object.assign({}, bookTransaction, {
            status: newStatus,
          });
        } else return bookTransaction;
      }
    );

    setTransactions(bookTransactionsWithStatusModification);
    requestTransactionUpdate(transactionId, newStatus, (res, err) => {
      if (err) setTransactions(duplicateBookTransactions);
    });
  };

  return (
    <div className="my-transaction">
      <Pagination
        insertFooterElement={
          <div
            className="my-transaction__add-bttn-wrapper"
            onClick={() => setIsBookTransactionFormOpen(true)}
          >
            <input
              className="my-transaction__add-bttn"
              type="button"
              value="+"
            />
          </div>
        }
      >
        {transactions.map((transaction, index) => (
          <TransactionCard
            data={transaction}
            key={index}
            onDelete={handleDeleteBookTransaction}
            onChangeStatus={handleChangeStatus}
          />
        ))}
      </Pagination>

      <AddBookTransaction
        isOpen={isBookTransactionFormOpen}
        onClose={() => setIsBookTransactionFormOpen(false)}
        onSubmit={handleAddBookTransaction}
      />
    </div>
  );
};

export default MyTransaction;
