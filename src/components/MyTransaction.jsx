import React, { useState, useEffect, useRef, useContext } from "react";
import TransactionCard from "./common/TransactionCard.jsx";
import Pagination from "./common/Pagination.jsx";
import AddBookTransaction from "./AddBookTransaction.jsx";
import {
  getTransactions,
  requestTransactionUpdate,
  addTransaction,
} from "../services/transactionsService.js";
import { UserContext } from "./context/userContext.js";

const MyTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, changeCurrentPageNo] = useState(1);

  const bookFormRef = useRef();
  const { user } = useContext(UserContext);

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

  const handleAddBookTransaction = (transaction) => {
    const { _id } = user;
    addTransaction({ transaction, _id }, (res, err) => {
      if (res) {
        console.log(res.data);
        setTransactions([...transactions, res.data]);
      }
    });
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
        onClick={bookFormRef?.current?.openForm}
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
