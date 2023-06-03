import React, { useState, useEffect, useRef } from "react";
import TransactionCard from "./common/TransactionCard.jsx";
import Pagination from "./common/Pagination.jsx";
import AddBookTransaction from "./AddBookTransaction.jsx";
import {
  requestTransactionUpdate,
  getUserTransactions,
  addTransaction,
  deleteTransaction,
} from "../services/transactionsService.js";

const MyTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, changeCurrentPageNo] = useState(1);

  const bookFormRef = useRef();

  useEffect(() => {
    getUserTransactions((res, err) => {
      if (res) setTransactions(res.data);
    });
  }, []);

  const handlePageChange = (e) => {
    //an event or pageNo
    if (e?.target?.textContent)
      return changeCurrentPageNo(parseInt(e.target.textContent));

    changeCurrentPageNo(e);
  };

  const handleAddBookTransaction = (transaction) => {
    addTransaction({ transaction }, (res, err) => {
      if (res) setTransactions([...transactions, res.data]);
    });
  };

  const handleDeleteBookTrasaction = (_id, prompt) => {
    const originalBooks = [...transactions];
    const changedBooks = originalBooks.filter((book) => book._id !== _id);
    prompt.disableButtons(true);

    deleteTransaction(_id, (res, err) => {
      if (res) setTransactions(changedBooks);

      prompt.closeBinaryPrompt();
      prompt.disableButtons(false);
    });
  };

  const handleChangeStatus = (transactionId, status, prompt) => {
    const originalBooks = transactions.map((transaction) =>
      Object.assign({}, transaction)
    );
    const index = originalBooks.findIndex((book) => book._id === transactionId);
    const modifiedCopy = originalBooks.map((transaction) =>
      Object.assign({}, transaction)
    );
    modifiedCopy[index].status = !status;
    setTransactions(modifiedCopy);
    prompt.disableButtons(true);

    requestTransactionUpdate(transactionId, { status: !status }, (res, err) => {
      if (err) setTransactions(originalBooks);

      prompt.closeBinaryPrompt();
      prompt.disableButtons(false);
    });
  }; //skipped this

  const handleOpenAddTransactionForm = () => {
    bookFormRef?.current?.openForm();
  };

  const pageShown = 7;
  const itemCount = transactions.length;
  const maxItemsPerPage = 5;

  const startingIndex = maxItemsPerPage * currentPage - maxItemsPerPage;
  const endingIndex = maxItemsPerPage * currentPage;
  const dataOnDisplay = transactions.slice(startingIndex, endingIndex);

  return (
    <div>
      {dataOnDisplay.map((data) => (
        <TransactionCard
          data={data}
          onDelete={handleDeleteBookTrasaction}
          onChangeStatus={handleChangeStatus}
        />
      ))}
      <div
        className="my-transaction__add-bttn-wrapper"
        onClick={handleOpenAddTransactionForm}
      >
        <input type="button" value="+" className="my-transaction__add-bttn" />
      </div>
      <Pagination
        pageShown={pageShown}
        itemCount={itemCount}
        currentPage={currentPage}
        maxItemsPerPage={maxItemsPerPage}
        pageChange={handlePageChange}
      />
      <AddBookTransaction
        ref={bookFormRef}
        onSubmitHookFunc={handleAddBookTransaction}
      />
    </div>
  );
};

export default MyTransaction;
