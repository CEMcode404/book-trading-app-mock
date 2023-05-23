import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = () => {
  const navigate = useNavigate();

  function gotoDetails() {
    navigate("/transaction");
    console.log("yeah");
  }

  return (
    <div className="book-card" onClick={gotoDetails}>
      <p className="book-card__p">View Details</p>
    </div>
  );
};

export default BookCard;
