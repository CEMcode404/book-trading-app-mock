import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from "react";

const BinaryPrompt = forwardRef(function BinaryPrompt(
  { message, dialogClass, yesBttnClass, noBttnClass, yesBttnHookFunc },
  ref
) {
  const dialogRef = useRef();

  function handleOpenDialog() {
    const dialogElement = dialogRef.current;
    dialogElement.showModal();
  }

  function closeBinaryPrompt() {
    const dialogElement = dialogRef.current;
    dialogElement.close();
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        close: closeBinaryPrompt,
        open: handleOpenDialog,
      };
    },
    []
  );

  const [isBttnsDisabled, disableButtons] = useState(false);

  function handleClickYes() {
    if (yesBttnHookFunc)
      return yesBttnHookFunc({ closeBinaryPrompt, disableButtons });
  }

  return (
    <dialog className={"binary-prompt " + dialogClass} ref={dialogRef}>
      {message}
      <div className="binary-prompt__bttns-wrapper">
        <input
          type="button"
          value="Yes"
          className={yesBttnClass}
          onClick={handleClickYes}
          disabled={isBttnsDisabled}
        />
        <input
          type="button"
          value="No"
          className={noBttnClass}
          onClick={closeBinaryPrompt}
          disabled={isBttnsDisabled}
        />
      </div>
    </dialog>
  );
});

export default BinaryPrompt;
