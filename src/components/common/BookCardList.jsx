import React from "react";
import BookCard from "./BookCard.jsx";

const BookCardList = ({ title }) => {
  return (
    <div className="book-card-list">
      <h1 className="book-card-list__header">{title}</h1>
      <div className="book-list">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
};

export default BookCardList;

//bookcard needs to be passable and put a defalt card / fix css if there is lesser cards
