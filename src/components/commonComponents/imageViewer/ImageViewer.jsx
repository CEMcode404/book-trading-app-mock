import PropTypes from "prop-types";
import React, { useState } from "react";

import Dialog from "../Dialog.jsx";

import "./imageViewer.scss";

const ImageViewer = ({
  crossOrigin = "anonymous",
  isOpen,
  imgSrcs,
  onClose: onCloseCallBack,
}) => {
  const firstImage = 0;
  const lastImage = imgSrcs?.length - 1;
  const [currentImage, setCurrentImage] = useState(firstImage);

  function next(e) {
    e.stopPropagation();

    currentImage >= lastImage
      ? setCurrentImage(firstImage)
      : setCurrentImage(currentImage + 1);
  }

  function previous(e) {
    e.stopPropagation();

    currentImage <= firstImage
      ? setCurrentImage(lastImage)
      : setCurrentImage(currentImage - 1);
  }

  return (
    <Dialog className="image-viewer" isOpen={isOpen}>
      {imgSrcs && (
        <div className="image-viewer__container">
          <div className="image-viewer__prev-arrow">
            <div className="image-viewer__arrow-wrapper" onClick={previous}>
              <span className="image-viewer__arrow image-viewer__left"></span>
            </div>
          </div>
          {imgSrcs.map((src, index) =>
            index === currentImage ? (
              <img
                className="image-viewer__img"
                crossOrigin={crossOrigin}
                key={index}
                src={src}
              />
            ) : null
          )}
          {!imgSrcs && <p>No image/s uploaded</p>}
          <div className="image-viewer__next-arrow">
            <div className="image-viewer__arrow-wrapper" onClick={next}>
              <span className="image-viewer__arrow image-viewer__right"></span>
            </div>
          </div>
          <div
            className="image-viewer__close-bttn-wrapper"
            onClick={onCloseCallBack}
          >
            <span className="image-viewer__close-bttn">+</span>
          </div>
        </div>
      )}
    </Dialog>
  );
};

ImageViewer.propTypes = {
  crossOrigin: PropTypes.string,
  imgSrcs: PropTypes.arrayOf(PropTypes.string),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ImageViewer;
