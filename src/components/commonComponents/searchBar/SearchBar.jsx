import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";

import findIcon from "./find_icon.svg";

import "./searchBar.scss";

const SearchBar = ({
  className = "",
  disabled = false,
  formatFunc,
  hideFindIcon = false,
  id,
  onChange,
  placeholder = "",
}) => {
  const [isSearchResultsHidden, setIsSearchResultsHidden] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const inputElementRef = useRef();
  const timeOutHandleRef = useRef();

  useEffect(() => {
    if (disabled) return;

    //use a timeout here to prevent multiple request while typing which is expensive
    clearTimeout(timeOutHandleRef.current);
    hideSearchResults();
    !inputValue ? setIsTyping(false) : setIsTyping(true);

    const isValidInput = inputValue.trim();
    timeOutHandleRef.current = setTimeout(() => {
      if (isValidInput) {
        const response = onChange({
          inputValue: isValidInput,
          resolveCallback: showSearchResults,
          waitForCallback,
        });

        if (response === waitForCallback()) return;
        else showSearchResults(response);
      } else setIsTyping(false);
    }, 1000);
  }, [inputValue]);

  function hideSearchResults() {
    setIsSearchResultsHidden(true);
    setSearchResults([]);
  }

  function showSearchResults(data) {
    setIsTyping(false);

    if (data && Array.isArray(data) && data.length > 0) {
      setSearchResults(data);

      //Prevents search result from showing if input element is not active
      //This prevents bug where doing onblur while querying will make the search results show and will be
      //stuck unless input element is refocus again
      if (document.activeElement?.id === inputElementRef.current?.id)
        setIsSearchResultsHidden(false);
    }
  }

  function waitForCallback() {
    return "waiting";
  }

  function handleOnBlur() {
    //Set time out give enough time so that onclick functions in the search results can be executed before closing
    setTimeout(() => {
      setIsTyping(false);
      setIsSearchResultsHidden(true);
    }, 100);
  }

  return (
    <div className={"search-bar " + className}>
      <div className={"search-bar__input-wrapper"}>
        <input
          className="search-bar__input"
          disabled={disabled}
          id={id}
          onBlur={handleOnBlur}
          onFocus={() => setIsSearchResultsHidden(false)}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          ref={inputElementRef}
          type="text"
          value={inputValue}
        ></input>

        {!hideFindIcon && (
          <img
            alt="search icon"
            className="search-bar__find-icon"
            src={findIcon}
          ></img>
        )}
      </div>

      {isTyping && (
        <div className="search-bar__typing">
          <p>typing...</p>
        </div>
      )}

      <div
        className="search-bar__suggestion-list"
        style={
          isSearchResultsHidden || searchResults.length < 1
            ? { display: "none" }
            : null
        }
      >
        {formatFunc(searchResults)}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  formatFunc: PropTypes.func.isRequired,
  hideFindIcon: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
