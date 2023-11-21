import PropTypes from "prop-types";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import IsbnSearchResultCard from "../isbnSearchResultCard/IsbnSearchResultCard.jsx";
import SearchBar from "../../commonComponents/searchBar/SearchBar.jsx";

import defaultImg from "../../../assets/book-no-image.svg";
import { searchBookWithName } from "../../../services/searchService.js";

import "./isbnInput.scss";

const IsbnInput = forwardRef(function (
  { disabled, id, onChange, onSelectType },
  externalRef
) {
  const searchTypes = {
    TITLE: "title",
    ISBN: "isbn",
  };

  const defaults = {
    isbn: "",
    searchType: searchTypes.TITLE,
    selectedSearchIsbn: undefined,
  };

  const [isbn, setIsbn] = useState(defaults.isbn);
  const [searchType, setSearchType] = useState(defaults.searchType);
  const [selectedSearchIsbn, setSelectedSearchIsbn] = useState(
    defaults.selectedSearchIsbn
  );

  useEffect(() => {
    onChange(isbn);
  }, [isbn]);

  useEffect(() => {
    setIsbnAndSelectedSearchIsbn(defaults.isbn, defaults.selectedSearchIsbn);
    onSelectType();
  }, [searchType]);

  function setIsbnAndSelectedSearchIsbn(isbn, selectedSearchIsbn) {
    setIsbn(isbn);
    setSelectedSearchIsbn(selectedSearchIsbn);
  }

  useImperativeHandle(externalRef, () => ({
    reset: () => {
      setIsbnAndSelectedSearchIsbn(defaults.isbn, defaults.selectedSearchIsbn);
      setSearchType(defaults.searchType);
    },
  }));

  function handleSelectIsbn(isbnDetails) {
    if (disabled) return;

    const isbn = isbnDetails?.volumeInfo?.industryIdentifiers?.[0]?.identifier;
    if (isbn) setIsbnAndSelectedSearchIsbn(isbn, isbnDetails);
  }

  function handleDeselectIsbn() {
    if (disabled) return;

    setIsbnAndSelectedSearchIsbn(defaults.isbn, defaults.selectedSearchIsbn);
  }

  function handleIsbnSearch({ inputValue, resolveCallback, waitForCallback }) {
    searchBookWithName(inputValue, (res, err) =>
      resolveCallback(res?.data?.items)
    );

    return waitForCallback();
  }

  return (
    <div className="isbn-input">
      {isbn && searchType === searchTypes.TITLE ? null : (
        <select
          className="isbn-input__select"
          disabled={disabled}
          id="isbn-input__select"
          onChange={(e) => setSearchType(e.target.value)}
          value={searchType}
        >
          {Object.entries(searchTypes).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      )}

      {!selectedSearchIsbn && (
        <div className="isbn-input__input-wrapper">
          {searchType === searchTypes.ISBN && (
            <input
              disabled={disabled}
              id={id}
              onChange={(e) => setIsbn(e.currentTarget.value)}
              placeholder="Manually input ISBN"
              type="text"
              value={isbn}
            />
          )}

          {searchType === searchTypes.TITLE && (
            <SearchBar
              className="isbn-input__search-bar"
              disabled={disabled}
              formatFunc={(searchResults) =>
                searchResults.map((isbndetails, index) => {
                  return (
                    <IsbnSearchResultCard
                      data={isbndetails}
                      key={index}
                      onClick={() => handleSelectIsbn(isbndetails)}
                    />
                  );
                })
              }
              hideFindIcon
              id={id}
              onChange={handleIsbnSearch}
              placeholder="Find ISBN by title"
            />
          )}
        </div>
      )}

      {selectedSearchIsbn && searchType === searchTypes.TITLE && (
        <div>
          <div className="isbn-input__selected-isbn-card">
            <img
              alt={selectedSearchIsbn?.volumeInfo?.title}
              src={
                selectedSearchIsbn?.volumeInfo?.imageLinks?.smallThumbnail ||
                defaultImg
              }
            />
            <div className="isbn-input__isbn-and-title-wrapper">
              <p>{selectedSearchIsbn?.volumeInfo?.title}</p>
              {selectedSearchIsbn?.volumeInfo?.industryIdentifiers.map(
                ({ type, identifier }, index) => (
                  <div key={index}>
                    <p>{`${type}: ${identifier}`}</p>
                  </div>
                )
              )}
            </div>
            <span
              className="isbn-input__deselect-isbn-card-bttn"
              onClick={handleDeselectIsbn}
            >
              +
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

IsbnInput.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onSelectType: PropTypes.func,
};

export default IsbnInput;
