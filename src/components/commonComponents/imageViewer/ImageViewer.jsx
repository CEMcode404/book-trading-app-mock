import PropTypes from "prop-types";
import React from "react";

import Dialog from "../Dialog.jsx";

import "./imageViewer.scss";

const ImageViewer = ({
  backDropClickCallBack,
  crossOrigin = "anonymous",
  isOpen,
  imgSrcs,
}) => {
  return (
    <Dialog
      backDropClickCallBack={backDropClickCallBack}
      className="image-viewer"
      isOpen={isOpen}
    >
      {imgSrcs && (
        <div className="image-viewer__img-list">
          {imgSrcs.map((src, index) => (
            <img
              className="image-viewer__img"
              crossOrigin={crossOrigin}
              key={index}
              src={src}
            ></img>
          ))}
        </div>
      )}
      {!imgSrcs && <p>No image/s uploaded</p>}
    </Dialog>
  );
};

ImageViewer.propTypes = {
  backDropClickCallBack: PropTypes.func,
  crossOrigin: PropTypes.string,
  imgSrcs: PropTypes.arrayOf(PropTypes.string),
  isOpen: PropTypes.bool,
};

export default ImageViewer;
