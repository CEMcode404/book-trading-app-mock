import React, { useRef, useImperativeHandle, forwardRef } from "react";

const ImageViewer = forwardRef(function ImageViewer({ imgSrcs }, externalRef) {
  const imagesDialogRef = useRef();
  function handleCloseImagesDialog(e) {
    const dialogElement = imagesDialogRef.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();
    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right
    ) {
      dialogElement.close();
    }
  }

  function handleOpenImagesDialog() {
    imagesDialogRef.current.showModal();
  }

  useImperativeHandle(
    externalRef,
    () => {
      return {
        close: handleCloseImagesDialog,
        open: handleOpenImagesDialog,
      };
    },
    []
  );

  return (
    <dialog
      ref={imagesDialogRef}
      onClick={handleCloseImagesDialog}
      className="image-viewer"
    >
      {imgSrcs && (
        <div className="image-viewer__img-list">
          {imgSrcs.map((src, index) => (
            <img key={index} className="image-viewer__imgs" src={src}></img>
          ))}
        </div>
      )}
      {!imgSrcs && <p>No image/s uploaded</p>}
    </dialog>
  );
});

export default ImageViewer;
