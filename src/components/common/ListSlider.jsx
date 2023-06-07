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
        <span className="arrow left" onClick={scrollLeft}></span>
        {children}
        <span className="arrow right" onClick={scrollRight}></span>
      </div>
    </div>
  );
};

export default ListSlider;
