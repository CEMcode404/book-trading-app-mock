import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/book-no-image.svg";
import { storeBookId } from "../../services/transactionsService.js";

const BookCard = ({ imgSrc, title, authors, _id }) => {
  const navigate = useNavigate();

  function gotoDetails() {
    storeBookId(_id);
    navigate("/transaction");
  }

  return (
    <div
      className="book-card"
      onClick={gotoDetails}
      title={`${title} by ${authors}`}
      style={{ backgroundImage: `url(${imgSrc || bgImage})` }}
    >
      <p className="book-card__p">View Details</p>
      {title && (
        <div className="book-card__title-wrapper">
          <p
            className="book-card__title animate--moveToRight"
            style={{ animationDuration: `${title.length}s` }}
          >{`${title}`}</p>
        </div>
      )}
    </div>
  );
};

export default BookCard;
