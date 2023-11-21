import PropTypes from "prop-types";
import React from "react";

import defaultImg from "../../../assets/book-no-image.svg";
import "./isbnSearchResultCard.scss";

const IsbnSearchResultCard = ({ data, onClick }) => {
  const volumeInfo = data?.volumeInfo;
  const { industryIdentifiers: isbns, title } = volumeInfo;

  return (
    <div className="isbn-search-result-card" onClick={onClick}>
      <img
        alt={title}
        className="isbn-search-result-card__img"
        src={volumeInfo?.imageLinks?.smallThumbnail || defaultImg}
      ></img>
      <div>
        <p>{title}</p>
        {isbns &&
          isbns.map(({ type, identifier }, index) => (
            <div key={index}>
              <p>{`${type}: ${identifier}`}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

IsbnSearchResultCard.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default IsbnSearchResultCard;
