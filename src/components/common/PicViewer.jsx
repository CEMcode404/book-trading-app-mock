import React from "react";

const PicViewer = () => {
  return (
    <div className="picviewer">
      <hr className="picviewer__hr"></hr>
      <section aria-label="Book Photos" className="picviewer__picture-list">
        <span className="picviewer__picture"></span>
        <span className="picviewer__picture"></span>
        <span className="picviewer__picture"></span>
      </section>
      <hr className="picviewer__hr"></hr>
    </div>
  );
};

export default PicViewer;
