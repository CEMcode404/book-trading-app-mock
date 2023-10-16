import PropTypes from "prop-types";
import React from "react";

import bookLoading from "./bookLoading.gif";
import "./loadingIcon.scss";

const LoadingIcon = ({ className = "", isVisible = true, style }) => {
  return (
    isVisible && (
      <img
        className={`loading-icon__img ${className}`}
        alt="loading..."
        src={bookLoading}
        style={style}
      />
    )
  );
};

LoadingIcon.propTypes = {
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  style: PropTypes.object,
};

export default LoadingIcon;
