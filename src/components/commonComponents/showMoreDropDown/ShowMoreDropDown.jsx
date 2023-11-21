import PropTypes from "prop-types";
import React, { useState } from "react";

import DropDown from "../dropDown/DropDown.jsx";

import "./showMoreDropDown.scss";

const ShowMoreDropDown = ({
  children,
  minHeight = "300px",
  transitionSpeed = 1000,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [buttonValue, setButtonValue] = useState("");

  function determineBttnValue(height) {
    const isContentsHeightBelowMinHeight =
      height <= parseInt(minHeight.replace("px", ""));

    if (isHidden) return isContentsHeightBelowMinHeight ? "" : "show more...";
    return "show less...";
  }

  return (
    <div className="showmore-dropdown">
      <DropDown
        getHeightCallBack={({ contentsHeight: height }) =>
          setButtonValue(determineBttnValue(height))
        }
        isHidden={isHidden}
        minHeight={minHeight}
        transitionSpeed={transitionSpeed}
      >
        {children}
      </DropDown>

      <div className="showmore-dropdown__bttn-wrapper">
        <span
          className="showmore-dropdown__bttn"
          onClick={() => setIsHidden(!isHidden)}
        >
          {buttonValue}
        </span>
      </div>
    </div>
  );
};

ShowMoreDropDown.propTypes = {
  children: PropTypes.any,
  minHeight: PropTypes.string,
  transitionSpeed: PropTypes.number,
};

export default ShowMoreDropDown;
