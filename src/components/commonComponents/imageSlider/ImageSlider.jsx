import PropTypes from "prop-types";
import React, { useState } from "react";

import ImageViewer from "../imageViewer/ImageViewer.jsx";
import ListSlider from "../listSlider/ListSlider.jsx";

import "./imageSlider.scss";

const ImageSlider = ({ imgSrcs, crossOrigin = "anonymous" }) => {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <div className="image-slider">
      <hr className="image-slider__hr" />
      {imgSrcs && (
        <ListSlider>
          {imgSrcs.map((imgSrc, index) => (
            <img
              crossOrigin={crossOrigin}
              className="image-slider__img"
              key={index}
              onClick={() => setIsImageViewerOpen(true)}
              src={imgSrc}
            />
          ))}
        </ListSlider>
      )}

      {/* this is the default image display */}
      {!imgSrcs && (
        <section
          aria-label="Book Photos"
          className="image-slider__default-img-list"
        >
          <span className="image-slider__img"></span>
          <span className="image-slider__img"></span>
          <span className="image-slider__img"></span>
        </section>
      )}

      <hr className="image-slider__hr" />
      <ImageViewer
        crossOrigin={crossOrigin}
        isOpen={isImageViewerOpen}
        imgSrcs={imgSrcs}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </div>
  );
};

ImageSlider.prototype = {
  crossOrigin: PropTypes.string,
  imgSrcs: PropTypes.arrayOf(PropTypes.string),
};

export default ImageSlider;
