import PropTypes from "prop-types";
import React from "react";

import Dialog from "../Dialog.jsx";

import "./binaryPrompt.scss";

const BinaryPrompt = ({
  children,
  dialogClass,
  isOpen,
  isBttnsDisabled = false,
  noBttnClass,
  onNo,
  onYes,
  yesBttnClass,
}) => {
  return (
    <Dialog className={"binary-prompt " + dialogClass} isOpen={isOpen}>
      {children}
      <div className="binary-prompt__bttns-wrapper">
        <input
          className={`bttn--slide-up--green ${yesBttnClass}`}
          disabled={isBttnsDisabled}
          onClick={onYes}
          type="button"
          value="Yes"
        />
        <input
          className={`bttn--slide-up--gray ${noBttnClass}`}
          disabled={isBttnsDisabled}
          onClick={onNo}
          type="button"
          value="No"
        />
      </div>
    </Dialog>
  );
};

BinaryPrompt.propTypes = {
  children: PropTypes.string.isRequired,
  dialogClass: PropTypes.string,
  isOpen: PropTypes.bool,
  isBttnsDisabled: PropTypes.bool,
  noBttnClas: PropTypes.string,
  onNo: PropTypes.func,
  onYes: PropTypes.func,
  yesBttnClass: PropTypes.string,
};

export default BinaryPrompt;
