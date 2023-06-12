import React, { useRef } from "react";

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

  return (
    <div className="list-slider">
      <div className="list-slider__contents-wrapper" ref={contentSliderRef}>
        <span className="list-slider__left-arrow-wrapper" onClick={scrollLeft}>
          <span className="arrow left"></span>
        </span>
        {children}
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

export default ListSlider;
