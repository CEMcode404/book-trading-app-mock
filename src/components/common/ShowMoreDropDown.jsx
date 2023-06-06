import React, { useEffect, useRef, useState } from "react";

const ShowMoreDropDown = ({
  children,
  height = "300px",
  transition = "height 1s",
  dynamicContent = null,
}) => {
  const contentsContainerRef = useRef();
  const [isHidden, setHidden] = useState(true);
  const [isTimeOut, setIsTimeOut] = useState(false);

  function resizeHandler() {
    const contentsContainerElement = contentsContainerRef.current;

    if (!isHidden) {
      contentsContainerElement.style.height = "auto";
    }
  }

  useEffect(() => {
    const contentsContainerElement = contentsContainerRef.current;

    if (!isHidden) {
      contentsContainerElement.style.height = "auto";
    }
  }, [dynamicContent]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [isHidden]);

  return (
    <div className="show-more-drop-down">
      <div
        className="show-more-drop-down__contents"
        style={{ height, transition }}
        ref={contentsContainerRef}
      >
        {children}
      </div>
      <div className="show-more-drop-down__bttn-wrapper">
        <span
          className="show-more-drop-down__bttn"
          onClick={() => {
            if (isHidden) {
              contentsContainerRef.current.style.height =
                contentsContainerRef.current.scrollHeight + "px";

              return setHidden(!isHidden);
            }
            if (!isHidden) {
              if (isTimeOut) return;

              contentsContainerRef.current.style.height =
                contentsContainerRef.current.scrollHeight + "px";
              setIsTimeOut(true);
              setTimeout(() => {
                contentsContainerRef.current.style.height = height;
                setHidden(!isHidden);
                setIsTimeOut(false);
              }, 100);
            }
          }}
        >
          show more...
        </span>
      </div>
    </div>
  );
};

export default ShowMoreDropDown;
