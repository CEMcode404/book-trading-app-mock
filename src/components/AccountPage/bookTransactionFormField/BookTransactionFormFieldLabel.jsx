import PropTypes from "prop-types";
import React from "react";

import "./bookTransactionFormFieldLabel.scss";

const BookTransactionFormFieldLabel = ({
  children,
  className = "",
  htmlFor,
  label,
}) => {
  return (
    <div className={`book-transaction-form-field-label ${className}`}>
      <label
        className="book-transaction-form-field-label__label"
        htmlFor={htmlFor}
      >
        {`${label}:`}
      </label>
      {children}
    </div>
  );
};

BookTransactionFormFieldLabel.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default BookTransactionFormFieldLabel;
