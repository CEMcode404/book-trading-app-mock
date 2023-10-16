import PropTypes from "prop-types";
import React from "react";

import "./transactionPageInfoField.scss";

const TransactionPageInfoField = ({ children, fieldName }) => {
  return !children ? null : (
    <div className="transaction-page-info-field">
      <p className="transaction-page-info-field__field-name">{fieldName}:</p>
      <p className="transaction-page-info-field__field-value">{children}</p>
    </div>
  );
};

TransactionPageInfoField.propTypes = {
  children: PropTypes.any,
  fieldName: PropTypes.string.isRequired,
};

export default TransactionPageInfoField;
