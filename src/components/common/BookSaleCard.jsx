import React from "react";
import defaultPhoto from "../../assets/book-no-image.svg";

const BookSaleCard = ({ imgSrc = "", title, price, currency, onClick }) => {
  return (
    <div className="book-sale-card" onClick={onClick}>
      <img className="book-sale-card__img" src={imgSrc || defaultPhoto}></img>
      <div className="book-sale-card__info">
        <p>{currency + price}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default BookSaleCard;
