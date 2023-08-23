import React, { useState, useEffect, useRef, useContext } from "react";
import TransactionCard from "./common/TransactionCard.jsx";
import Pagination from "./common/Pagination.jsx";
import AddBookTransaction from "./AddBookTransaction.jsx";
import {
  requestTransactionUpdate,
  getUserTransactions,
  addTransaction,
  deleteTransaction,
} from "../services/transactionsService.js";
import { UserContext } from "./context/userContext.js";

const MyTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, changeCurrentPageNo] = useState(1);
  const { user } = useContext(UserContext);
  const bookFormRef = useRef();

  //continue this
  useEffect(() => {
    getUserTransactions(user._id, null, (res, err) => {
      if (res) {
        //Modify image field and add server baseurl
        const modifiedData = res.data.map(({ images, ...rest }) => {
          const newImages = images.map(
            ({ path, fileName }) => `http://localhost:8000/${path}/${fileName}`
          );

          return {
            images: newImages,
            ...rest,
          };
        });

        setTransactions(modifiedData);
      }
    });
  }, []);

  const handlePageChange = (e) => {
    if (e?.target?.textContent)
      return changeCurrentPageNo(parseInt(e.target.textContent));

    changeCurrentPageNo(e);
  };

  const handleAddBookTransaction = (transaction) => {
    addTransaction(transaction, (res, err) => {
      if (res) {
        //Modify image field and add server baseurl
        let { images, ...rest } = res.data;
        const modifiedImageField = images.map(
          (imagePath) => `http://localhost:8000/${imagePath}`
        );

        setTransactions([
          ...transactions,
          { ...rest, images: modifiedImageField },
        ]);
      }
    });
  };

  const handleDeleteBookTrasaction = (_id, prompt) => {
    const originalBooks = [...transactions];
    const changedBooks = originalBooks.filter((book) => book._id !== _id);

    //disable pop up prompt activities while request is not finished
    prompt.disableButtons(true);

    deleteTransaction(_id, (res, err) => {
      if (res) setTransactions(changedBooks);

      //close and reenable buttons of pop up prompt
      prompt.closeBinaryPrompt();
      prompt.disableButtons(false);
    });
  };

  const handleChangeStatus = (transactionId, status, prompt) => {
    //duplicate book transactions state in case the change request fail
    const originalBooks = transactions.map((transaction) =>
      Object.assign({}, transaction)
    );

    //find specific book transaction, make a copy and switch status
    const index = originalBooks.findIndex((book) => book._id === transactionId);
    const modifiedCopy = originalBooks.map((transaction) =>
      Object.assign({}, transaction)
    );
    let newStatus = status === "AVAILABLE" ? "PENDING" : "AVAILABLE";
    modifiedCopy[index].status = newStatus;

    setTransactions(modifiedCopy);

    //disable prompt buttons while request is pending
    prompt.disableButtons(true);

    requestTransactionUpdate(transactionId, newStatus, (res, err) => {
      // if error revert to original state
      if (err) setTransactions(originalBooks);

      //reenable and close prompt
      prompt.closeBinaryPrompt();
      prompt.disableButtons(false);
    });
  };

  const handleOpenAddTransactionForm = () => {
    bookFormRef?.current?.openForm();
  };

  //pagination
  const pageShown = 7;
  const itemCount = transactions.length;
  const maxItemsPerPage = 5;

  const startingIndex = maxItemsPerPage * currentPage - maxItemsPerPage;
  const endingIndex = maxItemsPerPage * currentPage;
  const dataOnDisplay = transactions.slice(startingIndex, endingIndex);

  return (
    <div>
      {dataOnDisplay.map((data, index) => (
        <TransactionCard
          key={index}
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
