import React from "react";

const BookCard = () => {
  return (
    <div className="book-card">
      <div className="book-card__picture"></div>
      <input
        type="button"
        value="View Details"
        className="book-card__bttn bttn--slide-up--purple"
      ></input>
    </div>
  );
};

export default BookCard;
