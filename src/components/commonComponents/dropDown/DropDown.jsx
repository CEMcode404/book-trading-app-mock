import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import { useFirstRender } from "../../customHooks/customHooks";

import "./dropdown.scss";

const DropDown = ({
  children,
  className = "",
  getHeightCallBack,
  isHidden = true,
  minHeight = "0",
  transitionSpeed = 1000,
}) => {
  const contentsContainerRef = useRef();
  const contentsRef = useRef();
  const timeOutHandleRef = useRef();

  const [height, setHeight] = useState(minHeight);
  const isFirstRender = useFirstRender();

  useEffect(() => {
    resolveGetHeightCallBack();
  }, [isHidden]);

  function resolveGetHeightCallBack() {
    if (getHeightCallBack)
      getHeightCallBack({
        contentsHeight: contentsRef.current.scrollHeight,
        containerHeight: contentsContainerRef.current.scrollHeight,
      });
  }

  useEffect(() => {
    if (isFirstRender) return;
    clearTimeout(timeOutHandleRef.current);

    if (isHidden) {
      //I just put setTimeout here to have a little time to set an exact
      //height to container to enable animation since 'auto' prevent transition animation
      setHeight(contentsRef.current.scrollHeight);

      timeOutHandleRef.current = setTimeout(() => {
        setHeight(minHeight);
      }, 100);
    } else {
      setHeight(contentsRef.current.scrollHeight);

      //After animation, put height to auto to resize container if contents is dynamic
      //This also make the container adaptive to window resize
      timeOutHandleRef.current = setTimeout(() => {
        setHeight("auto");
      }, transitionSpeed);
    }
  }, [isHidden]);

  //This is needed to prevent bugs from happening if ever user resize the window during animation
  useEffect(() => {
    window.addEventListener("resize", handleViewportResize);

    return () => window.removeEventListener("resize", handleViewportResize);
  }, [isHidden]);

  function handleViewportResize() {
    clearTimeout(timeOutHandleRef.current);

    isHidden ? setHeight(minHeight) : setHeight("auto");
    resolveGetHeightCallBack();
  }

  return (
    <div
      className={`dropdown__contents-container ${className}`}
      ref={contentsContainerRef}
      style={{ height, transition: `height ${transitionSpeed / 1000}s` }}
    >
      <div ref={contentsRef} className="dropdown__contents">
        {children}
      </div>
    </div>
  );
};

DropDown.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  getHeightCallBack: PropTypes.func,
  isHidden: PropTypes.bool,
  minHeight: PropTypes.string,
  transitionSpeed: PropTypes.number,
};

export default DropDown;
