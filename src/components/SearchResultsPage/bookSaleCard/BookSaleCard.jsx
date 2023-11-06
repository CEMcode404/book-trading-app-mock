import PropTypes from "prop-types";
import React from "react";

import defaultPhoto from "../../../assets/book-no-image.svg";
import "./bookSaleCard.scss";

const BookSaleCard = ({
  currency,
  className = "",
  crossOrigin = "anonymous",
  imgSrc = "",
  onClick,
  price,
  style = {},
  title,
}) => {
  return (
    <div
      className={`book-sale-card ${className}`}
      onClick={onClick}
      style={style}
    >
      <img
        crossOrigin={crossOrigin}
        className="book-sale-card__img"
        src={imgSrc || defaultPhoto}
      />
      <div className="book-sale-card__details">
        <p>{currency + price}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

BookSaleCard.propTypes = {
  currency: PropTypes.string,
  className: PropTypes.string,
  crossOrigin: PropTypes.string,
  imgSrc: PropTypes.string,
  onClick: PropTypes.func,
  price: PropTypes.number,
  style: PropTypes.object,
  title: PropTypes.string,
};

export default BookSaleCard;
