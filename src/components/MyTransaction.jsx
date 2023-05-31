import React, { useState, useEffect, useRef } from "react";
import TransactionCard from "./common/TransactionCard.jsx";
import Pagination from "./common/Pagination.jsx";
import AddBookTransaction from "./AddBookTransaction.jsx";
import {
  getTransactions,
  requestTransactionUpdate,
} from "../services/transactionsService.js";

const MyTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, changeCurrentPageNo] = useState(1);

  const bookFormRef = useRef();

  useEffect(() => {
    getTransactions((res, err) => {
      if (res) {
        setTransactions(res.data);
      }
    });
  }, []);

  const handlePageChange = (e) => {
    //an event or pageNo
    if (e?.target?.textContent)
      return changeCurrentPageNo(parseInt(e.target.textContent));

    changeCurrentPageNo(e);
  };

  const handleShowBookFormModal = () => {
    bookFormRef.current.showModal();
  };

  const [id, setId] = useState(0);
  const handleAddBookTransaction = (book) => {
    book._id = id + 1;
    setId(book._id);
    const data = [...transactions, book];
    setTransactions(data);
  };

  const handleDeleteBookTrasaction = (_id) => {
    const originalBooks = [...transactions];
    const changeBooks = originalBooks.filter((book) => book._id !== _id);
    setTransactions(changeBooks);
  };

  const handleChangeStatus = (transactionId) => {}; //skipped this

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
        onClick={handleShowBookFormModal}
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
