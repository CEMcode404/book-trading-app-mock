import React, { forwardRef, useRef, useImperativeHandle } from "react";

const BinaryPrompt = forwardRef(function BinaryPrompt(
  { message, dialogClass, yesBttnClass, noBttnClass, yesBttnHookFunc },
  ref
) {
  const dialogRef = useRef();

  function handleOpenDialog() {
    const dialogElement = dialogRef.current;
    dialogElement.showModal();
  }

  function handleCloseDialog(e) {
    const dialogElement = dialogRef.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();
    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.target.value === "No"
    ) {
      dialogElement.close();
    }
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        close: handleCloseDialog,
        open: handleOpenDialog,
      };
    },
    []
  );

  return (
    <dialog
      className={"binary-prompt " + dialogClass}
      ref={dialogRef}
      onClick={handleCloseDialog}
    >
      {message}
      <div className="binary-prompt__bttns-wrapper">
        <input
          type="button"
          value="Yes"
          className={yesBttnClass}
          onClick={yesBttnHookFunc || null}
        />
        <input
          type="button"
          value="No"
          className={noBttnClass}
          onClick={handleCloseDialog}
        />
      </div>
    </dialog>
  );
});

export default BinaryPrompt;
