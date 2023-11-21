import PropTypes from "prop-types";
import React from "react";

import star1 from "./assets/star1.svg";
import star2 from "./assets/star2.svg";
import star3 from "./assets/star3.svg";
import star4 from "./assets/star4.svg";
import star5 from "./assets/star5.svg";
import defaultUserImg from "../../../assets/User.svg";

import "./reviewCard.scss";

const ReviewCard = ({ imgSrc, name, review, star }) => {
  const starSrc = [null, star1, star2, star3, star4, star5];
  return (
    <div className="review-card">
      <div className="review-card__user-photo-and-name">
        <img
          className="review-card__user-photo"
          src={imgSrc ? imgSrc : defaultUserImg}
        ></img>
        <div>
          <span className="review-card__name">{name}</span>
          <img
            alt={`${star} stars/s`}
            className="review-card__star"
            src={starSrc[star]}
          ></img>
        </div>
      </div>
      <p>{review}</p>
    </div>
  );
};

ReviewCard.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  review: PropTypes.string,
  star: PropTypes.number,
};

export default ReviewCard;
