import React, { useEffect, useRef, useState } from "react";

const ShowMoreDropDown = ({
  children,
  height = "300px",
  transition = "height 1s",
  dynamicContent = null,
}) => {
  const contentsContainerRef = useRef();
  const contentsRef = useRef();
  const [isHidden, setHidden] = useState(true);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [bttnValue, setBttnValue] = useState("");

  function resizeHandler() {
    const contentsContainerElement = contentsContainerRef.current;
    setBttnValue(determineBttnValue());

    if (!isHidden) {
      contentsContainerElement.style.height = "auto";
    }
  }

  useEffect(() => {
    setBttnValue(determineBttnValue());
    const contentsContainerElement = contentsContainerRef.current;

    if (!isHidden) {
      contentsContainerElement.style.height = "auto";
    }
  }, [dynamicContent]);

  useEffect(() => {
    setBttnValue(determineBttnValue());
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [isHidden]);

  function determineBttnValue() {
    const scrollHeight = contentsContainerRef?.current?.scrollHeight;
    const initHeight = parseInt(height.replace("px", ""));
    if (isHidden) {
      if (scrollHeight <= initHeight) return "";
      return "show more...";
    }

    if (scrollHeight <= initHeight) return "";
    return "show less...";
  }

  return (
    <div className="show-more-drop-down">
      <div
        className="show-more-drop-down__contents"
        style={{ height, transition }}
        ref={contentsContainerRef}
      >
        <div ref={contentsRef}>{children}</div>
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
          {bttnValue}
        </span>
      </div>
    </div>
  );
};

export default ShowMoreDropDown;
