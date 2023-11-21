import PropTypes from "prop-types";
import React from "react";

import "./searchResultsInfoField.scss";

const SearchResultsInfoField = ({ children, fieldName, isVisible = true }) => {
  //For now only span and plain string are allowed inside the fieldValue
  return (
    isVisible && (
      <div className="search-results-info-field">
        <p className="search-results-info-field__field-name">{fieldName}:</p>
        <div className="search-results-info-field__field-value">{children}</div>
      </div>
    )
  );
};

SearchResultsInfoField.propTypes = {
  children: PropTypes.any,
  fieldName: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
};

export default SearchResultsInfoField;
