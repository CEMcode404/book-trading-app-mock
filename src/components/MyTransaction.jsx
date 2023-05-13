import React, { useState, useEffect, useRef } from "react";
import TransactionCard from "./common/TransactionCard.jsx";
import Pagination from "./common/Pagination.jsx";
import AddBookTransaction from "./AddBookTransaction.jsx";

const MyTransaction = () => {
  let mockData = [
    {
      transactionId: "9999",
      title: "Harry Potter",
      bookCondition: "Used",
      currency: "$",
      price: 300,
      useDuration: "5",
      timeUnit: "Year/s",
      authors: "unknown",
      isbn: "",
    },
    {
      transactionId: "9998",
      title: "Quantum Prophecy",
      bookCondition: "New",
      currency: "$",
      price: 300,
      useDuration: "5",
      timeUnit: "Year/s",
      authors: "unknown",
      isbn: "",
    },
  ];

  const [booksData, setBooksData] = useState([]);
  const [currentPage, changeCurrentPageNo] = useState(1);
  const bookFormRef = useRef();

  useEffect(() => {
    setBooksData(mockData);
  }, [setBooksData]);

  const handlePageChange = (e) => {
    changeCurrentPageNo(parseInt(e.target.textContent));
  };

  const handleShowBookFormModal = () => {
    bookFormRef.current.showModal();
  };

  const handleAddBook = (book) => {
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
        onClick={handlePageChange}
      />
      <AddBookTransaction ref={bookFormRef} onSubmitHookFunc={handleAddBook} />
    </div>
  );
};

export default MyTransaction;

//to do
//add card
//delete card