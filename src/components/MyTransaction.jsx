import React, { useState, useEffect, useRef } from "react";
import TransactionCard from "./common/TransactionCard.jsx";
import Pagination from "./common/Pagination.jsx";
import AddBookTransaction from "./AddBookTransaction.jsx";
import transactionsData from "../../mockDatas/bookTransactions.json";

const MyTransaction = () => {
  const [booksData, setBooksData] = useState([]);
  const [currentPage, changeCurrentPageNo] = useState(1);

  const bookFormRef = useRef();

  useEffect(() => {
    setBooksData(transactionsData);
  }, [setBooksData]);

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
  const handleAddBook = (book) => {
    book.transactionId = id + 1;
    setId(book.transactionId);
    const data = [...booksData, book];
    setBooksData(data);
  };

  const handleDeleteBookTrasaction = (transactionId) => {
    const originalBooks = [...booksData];
    const changeBooks = originalBooks.filter(
      (book) => book.transactionId !== transactionId
    );

    setBooksData(changeBooks);
  };

  const pageShown = 7;
  const itemCount = booksData.length;
  const maxItemsPerPage = 5;

  const startingIndex = maxItemsPerPage * currentPage - maxItemsPerPage;
  const endingIndex = maxItemsPerPage * currentPage;
  const dataOnDisplay = booksData.slice(startingIndex, endingIndex);

  return (
    <div>
      {dataOnDisplay.map((data) => (
        <TransactionCard data={data} onDelete={handleDeleteBookTrasaction} />
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
      <AddBookTransaction ref={bookFormRef} onSubmitHookFunc={handleAddBook} />
    </div>
  );
};

export default MyTransaction;
