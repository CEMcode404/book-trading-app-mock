import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

const Dialog = ({
  backDropClickCallBack,
  children,
  className,
  isOpen = false,
  style = {},
}) => {
  const dialogRef = useRef();

  useEffect(() => {
    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [isOpen]);

  function handleBackDropClickCallBack(e) {
    const dialogElement = dialogRef.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();
    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right
    ) {
      if (backDropClickCallBack) backDropClickCallBack();
    }
  }

  return (
    <dialog
      className={className}
      ref={dialogRef}
      onClick={handleBackDropClickCallBack}
      style={style}
    >
      {children}
    </dialog>
  );
};

Dialog.propTypes = {
  backDropClickCallBack: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  style: PropTypes.object,
};

export default Dialog;
