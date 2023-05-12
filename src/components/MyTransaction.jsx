import React, { useState, useEffect, useRef } from "react";
import TransactionCard from "./common/TransactionCard.jsx";
import Pagination from "./common/Pagination.jsx";

const MyTransaction = () => {
  let mockData = [
    {
      title: "Harry Potter",
      bookCondition: "Good",
      price: 300,
      useDuration: "5 years",
    },
    {
      title: "Quantum Prophecy",
      bookCondition: "Good",
      price: 300,
      useDuration: "5 years",
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

  const handleAddBook = () => {
    bookFormRef.current.showModal();
  };

  function handleClosePrompt(e) {
    const dialogElement = bookFormRef.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();
    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right
    ) {
      dialogElement.close();
    }
  }

  const pageShown = 7;
  const itemCount = booksData.length;
  const maxItemsPerPage = 5;

  const startingIndex = maxItemsPerPage * currentPage - maxItemsPerPage;
  const endingIndex = maxItemsPerPage * currentPage;
  const dataOnDisplay = booksData.slice(startingIndex, endingIndex);

  return (
    <div>
      {dataOnDisplay.map((data) => (
        <TransactionCard data={data} />
      ))}
      <div className="my-transaction__add-bttn-wrapper" onClick={handleAddBook}>
        <input type="button" value="+" className="my-transaction__add-bttn" />
      </div>
      <Pagination
        pageShown={pageShown}
        itemCount={itemCount}
        currentPage={currentPage}
        maxItemsPerPage={maxItemsPerPage}
        onClick={handlePageChange}
      />
      <dialog ref={bookFormRef} onClick={handleClosePrompt}>
        <form>
          <input type="text" placeholder="Price" />
          <input type="text" placeholder="Book Condition" />
          <input type="text" placeholder="Use Duration" />
          <input type="submit" />
        </form>
      </dialog>
    </div>
  );
};

export default MyTransaction;

//to do
//add card
//delete card
