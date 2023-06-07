import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/book-no-image.svg";
import { storeBookId } from "../../services/transactionsService.js";

const DisplayCard = ({ imgSrc, title, authors, _id, bcClassName = "" }) => {
  const navigate = useNavigate();

  function gotoDetails() {
    storeBookId(_id);
    navigate("/transaction");
  }

  return (
    <div
      className={"display-card " + bcClassName}
      onClick={gotoDetails}
      title={`${title} by ${authors}`}
      style={{ backgroundImage: `url(${imgSrc || bgImage})` }}
    >
      <p className="display-card__p">View Details</p>
      {title && (
        <div className="display-card__title-wrapper">
          <p
            className="display-card__title animate--moveToRight"
            style={{ animationDuration: `${title.length}s` }}
          >{`${title}`}</p>
        </div>
      )}
    </div>
  );
};

export default DisplayCard;
