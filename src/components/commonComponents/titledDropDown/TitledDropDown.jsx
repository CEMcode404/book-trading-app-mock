import PropTypes from "prop-types";
import React, { useState } from "react";

import DropDown from "../dropDown/DropDown.jsx";

import "./titledDropDown.scss";

const TitledDropDown = ({ children, title = "Title" }) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <section aria-label={title} className="titled-dropdown">
      <div
        className="titled-dropdown__headbar"
        onClick={() => setIsHidden(!isHidden)}
      >
        <h2 className="titled-dropdown__title">{title}</h2>
        <hr className="titled-dropdown__hr" />
        <div
          className="titled-dropdown__triangle-up"
          style={
            !isHidden
              ? { transition: "transform 1s" }
              : { transition: "transform 1s", transform: "rotateX(180deg)" }
          }
        ></div>
      </div>

      <DropDown isHidden={isHidden}>
        {children}
        <hr className="titled-dropdown__hr" />
      </DropDown>
    </section>
  );
};

TitledDropDown.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default TitledDropDown;
