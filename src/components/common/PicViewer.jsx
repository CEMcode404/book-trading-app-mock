import React, { useState, useRef } from "react";
import ListSlider from "./ListSlider.jsx";
import ImageViewer from "./ImageViewer.jsx";

const PicViewer = ({ imgSrcs }) => {
  const imgViewerRef = useRef();
  return (
    <div className="picviewer">
      <hr className="picviewer__hr"></hr>
      {imgSrcs && (
        <ListSlider>
          {imgSrcs.map((imgSrc) => (
            <img
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
      <ImageViewer imgSrcs={imgSrcs} ref={imgViewerRef} />
    </div>
  );
};

export default PicViewer;
