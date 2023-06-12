import React from "react";
import bgImage from "../../assets/book-no-image.svg";

const DisplayCard = ({
  imgSrc,
  title,
  authors,
  _id,
  bcClassName = "",
  onClick,
}) => {
  const animationDuration = title?.length < 10 ? "20s" : title.length + "s";
  return (
    <div
      className={"display-card " + bcClassName}
      onClick={onClick}
      title={`${title} by ${authors}`}
      style={{ backgroundImage: `url(${imgSrc || bgImage})` }}
    >
      <p className="display-card__p">View Details</p>
      {title && (
        <div className="display-card__title-wrapper">
          <p
            className="display-card__title animate--moveToRight"
            style={{ animationDuration }}
          >{`${title}`}</p>
        </div>
      )}
    </div>
  );
};

export default DisplayCard;
