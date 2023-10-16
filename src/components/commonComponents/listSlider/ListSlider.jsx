import PropTypes from "prop-types";
import React, { useRef } from "react";

import "./listSlider.scss";

const ListSlider = ({ children }) => {
  const contentSliderRef = useRef();

  function scrollLeft() {
    const contentSliderElement = contentSliderRef.current;
    const width = contentSliderElement.offsetWidth;

    contentSliderElement.scrollBy({ left: -width, behavior: "smooth" });
  }

  function scrollRight() {
    const contentSliderElement = contentSliderRef.current;
    const width = contentSliderElement.offsetWidth;

    contentSliderElement.scrollBy({ left: width, behavior: "smooth" });
  }

  //To enable slider to inject style to the component need to have a style attribute
  //Add it to the outer element of your component
  function injectDefaultCss(children) {
    return React.Children.map(children, (child, index) => {
      let defaultStyle = {
        flexGrow: 0,
        flexShrink: 0,
      };

      // remove first element right margin
      if (index + 1 === React.Children.count(children))
        defaultStyle = { ...defaultStyle, marginRight: 0 };

      // remove last element left margin
      if (index === 0) defaultStyle = { ...defaultStyle, marginLeft: 0 };

      return React.cloneElement(child, {
        style: defaultStyle,
      });
    });
  }

  return (
    <div className="list-slider">
      <div className="list-slider__contents-wrapper" ref={contentSliderRef}>
        <span className="list-slider__left-arrow-wrapper" onClick={scrollLeft}>
          <span className="arrow left"></span>
        </span>
        {injectDefaultCss(children)}
        <span
          className="list-slider__right-arrow-wrapper"
          onClick={scrollRight}
        >
          <span className="arrow right"></span>
        </span>
      </div>
    </div>
  );
};

ListSlider.propTyes = {
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default ListSlider;
