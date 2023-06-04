import React, { useState, useEffect } from "react";
import findIcon from "../../assets/find_icon.svg";

const SearchBar = ({
  hideFindIcon,
  className = "",
  placeholder = "",
  onChange,
  formatFunc = () => {},
}) => {
  const [searchResult, setSearchResultList] = useState([]);
  const [inputValue, changeInputValue] = useState("");
  const [isListHidden, setListHidden] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  function showSuggestionList(data) {
    if (Array.isArray(data) && data.length > 0) {
      setSearchResultList(data);
      setListHidden(false);
    }
  }

  function closeSuggestionList() {
    setListHidden(true);
    setSearchResultList([]);
  }

  function handleOnBlur() {
    setTimeout(() => {
      setListHidden(true);
    }, 100);
  }

  function handleOnClick(e) {}

  useEffect(() => {
    if (onChange)
      onChange({
        inputValue,
        setIsTyping,
        showSuggestionList,
        closeSuggestionList,
      });
  }, [inputValue]);

  return (
    <div className={"search-bar " + className}>
      <div className={"search-bar__input-wrapper"}>
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          onChange={(e) => changeInputValue(e.target.value)}
          value={inputValue}
          onFocus={() => setListHidden(false)}
          onBlur={handleOnBlur}
        ></input>
        <img
          onClick={handleOnClick}
          className="search-bar__find-icon"
          style={hideFindIcon ? { display: "none" } : null}
          src={findIcon}
          alt="search icon"
        ></img>
      </div>
      {isTyping && (
        <div className="search-bar__typing">
          <p>is typing...</p>
        </div>
      )}
      <div
        className="search-bar__suggestion-list"
        style={
          isListHidden || searchResult.length < 1 ? { display: "none" } : null
        }
      >
        {formatFunc(searchResult)}
      </div>
    </div>
  );
};

export default SearchBar;
