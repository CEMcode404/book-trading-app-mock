import React from "react";
import star1 from "../../assets/star1.svg";
import star2 from "../../assets/star2.svg";
import star3 from "../../assets/star3.svg";
import star4 from "../../assets/star4.svg";
import star5 from "../../assets/star5.svg";
import defaultUserImg from "../../assets/User.svg";

const ReviewCard = ({ name, review, imgSrc, star }) => {
  const starSrc = [null, star1, star2, star3, star4, star5];
  return (
    <div className="review-card">
      <div className="review-card__img-name-wrapper">
        <img
          src={imgSrc ? imgSrc : defaultUserImg}
          className="review-card__user-photo"
        ></img>
        <div>
          <span className="review-card__name">{name}</span>
          <img
            src={starSrc[star]}
            className="review-card__star"
            alt={`${star} stars/s`}
          ></img>
        </div>
      </div>
      <p>{review}</p>
    </div>
  );
};

export default ReviewCard;
