import React from "react";
import defaultPhoto from "../../assets/book-no-image.svg";

const BookSaleCard = ({ imgSrc = "", title, price, currency }) => {
  return (
    <div className="book-sale-card">
      <div className="book-sale-card__img-info-wrapper">
        <div className="book-sale-card__img-wrapper">
          <img
            className="book-sale-card__img"
            src={imgSrc || defaultPhoto}
          ></img>
        </div>
        <div className="book-sale-card__info">
          <p>{currency + price}</p>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default BookSaleCard;
