import React, { useState, useRef } from "react";
import ListSlider from "./ListSlider.jsx";
import ImageViewer from "./ImageViewer.jsx";

const PicViewer = ({ imgSrcs, crossOrigin = "anonymous" }) => {
  const imgViewerRef = useRef();
  return (
    <div className="picviewer">
      <hr className="picviewer__hr"></hr>
      {imgSrcs && (
        <ListSlider>
          {imgSrcs.map((imgSrc, index) => (
            <img
              crossOrigin={crossOrigin}
              key={index}
              className="picviewer__picture list-viewer__item"
              src={imgSrc}
              onClick={() => {
                imgViewerRef.current.open();
              }}
            ></img>
          ))}
        </ListSlider>
      )}
      {!imgSrcs && (
        <section aria-label="Book Photos" className="picviewer__picture-list">
          <span className="picviewer__picture"></span>
          <span className="picviewer__picture"></span>
          <span className="picviewer__picture"></span>
        </section>
      )}
      <hr className="picviewer__hr"></hr>
      <ImageViewer
        imgSrcs={imgSrcs}
        ref={imgViewerRef}
        crossOrigin={crossOrigin}
      />
    </div>
  );
};

export default PicViewer;
