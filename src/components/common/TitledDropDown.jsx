import React, { useState, useRef } from "react";

const TitledDropDown = ({ children, title = "Title" }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [onTransition, setOnTransition] = useState(false);
  const [isArrowUp, setIsArrowUp] = useState(false);
  const containerRef = useRef();
  const contentRef = useRef();

  function toggleContentVisibility() {
    if (onTransition) return;
    const lastLineHeight = 20;
    const containerElement = containerRef.current;
    const contentElement = contentRef.current;
    if (isHidden) {
      setOnTransition(true);
      if (!isArrowUp) setIsArrowUp(!isArrowUp);
      containerElement.style.height = containerElement.scrollHeight + "px";

      setTimeout(() => {
        containerElement.style.height = "auto";
        setOnTransition(false);
        setIsHidden(!isHidden);
      }, 1000);
    } else if (!isHidden) {
      containerElement.style.height =
        contentElement.scrollHeight + lastLineHeight + "px";
      setOnTransition(true);

      setTimeout(() => {
        if (isArrowUp) setIsArrowUp(!isArrowUp);
        containerElement.style.height = 0;
        setOnTransition(false);
        setIsHidden(!isHidden);
      }, 100);
    }
  }

  return (
    <section aria-label={title} className="titled-drop-down">
      <div
        className="titled-drop-down__headbar"
        onClick={toggleContentVisibility}
      >
        <h2 className="titled-drop-down__title">{title}</h2>
        <hr className="titled-drop-down__hr"></hr>
        <div
          className="titled-drop-down__triangle-up"
          style={
            isArrowUp
              ? { transition: "transform 1s" }
              : { transition: "transform 1s", transform: "rotateX(180deg)" }
          }
        ></div>
      </div>
      <div
        className="titled-drop-down__body"
        ref={containerRef}
        style={{ transition: "height 1s" }}
      >
        <div
          ref={contentRef}
          style={{ display: "inline-block", width: "100%" }}
        >
          {children}
        </div>
        <hr className="titled-drop-down__hr"></hr>
      </div>
    </section>
  );
};

export default TitledDropDown;
