import React, { useState } from "react";
import { searchBookWithName } from "../../services/searchService.js";
import SearchBar from "./SearchBar.jsx";
import defaultImg from "../../assets/book-no-image.svg";

const IsbnInput = ({ register, setValue, clearErrors, id, disabled }) => {
  const [searchType, setSearchType] = useState("title");

  function handleSearchTypeSelect(e) {
    setSearchType(e.target.value);
    clearErrors(["isbn"]);
  }

  const [timeOutHandle, setTimeOutHandle] = useState();

  const handleSearchInput = (search) => {
    if (disabled) return;
    search.closeSuggestionList();

    if (timeOutHandle) {
      clearTimeout(timeOutHandle);
    }
    search.setIsTyping(true);

    if (!search.inputValue) return search.setIsTyping(false);

    const timeOutId = setTimeout(() => {
      searchBookWithName(search.inputValue, (res, err) => {
        search.setIsTyping(false);
        if (res) search.showSuggestionList(res.data.items);
      });
    }, [3000]);
    setTimeOutHandle(timeOutId);
  };

  const [isbnDisplayData, setIsbnDisplayData] = useState();
  function handleSearchResultsClick(bookInfo) {
    if (disabled) return;
    const isbns = bookInfo?.volumeInfo?.industryIdentifiers;
    if (isbns[0] && isbns[0]?.identifier) {
      setValue("isbn", isbns[0]?.identifier);
      clearErrors(["isbn"]);
      setIsbnDisplayData(bookInfo);
    }
  }

  function handleCloseIsbnDisplay() {
    if (disabled) return;
    setValue("isbn", "");
    setIsbnDisplayData("");
  }

  return (
    <div className="isbn-input">
      {isbnDisplayData && (
        <div>
          <div className="isbn-input__search-result-format--display">
            <img
              src={
                isbnDisplayData?.volumeInfo?.imageLinks?.smallThumbnail ||
                defaultImg
              }
              alt={isbnDisplayData?.volumeInfo?.title}
            ></img>
            <div className="isbn-input__isbn-and-title-wrapper">
              <p>{isbnDisplayData?.volumeInfo?.title}</p>
              {isbnDisplayData?.volumeInfo?.industryIdentifiers.map(
                ({ type, identifier }) => (
                  <div>
                    <p>{`${type}: ${identifier}`}</p>
                  </div>
                )
              )}
            </div>
            <span
              className="isbn-input__close-isbn-display-bttn"
              onClick={handleCloseIsbnDisplay}
            >
              +
            </span>
          </div>
        </div>
      )}

      {!isbnDisplayData && (
        <select
          value={"title"}
          disabled={disabled}
          onChange={handleSearchTypeSelect}
          className="isbn-input__select"
        >
          <option value="isbn">ISBN</option>
          <option value="title">TITLE</option>
        </select>
      )}

      {!isbnDisplayData && (
        <div className="isbn-input__input-wrapper">
          {searchType === "isbn" && (
            <input
              disabled={disabled}
              id={id}
              type="text"
              placeholder="Manually input ISBN"
              {...register("isbn")}
            />
          )}
          {searchType === "title" && (
            <SearchBar
              hideFindIcon
              placeholder="Find ISBN by title"
              onChange={(searchString) => handleSearchInput(searchString)}
              formatFunc={(searchResult) =>
                searchResult.map((book) => {
                  const isbns = book?.volumeInfo?.industryIdentifiers;
                  if (!isbns) return;
                  return (
                    <div
                      className="isbn-input__search-result-format"
                      onClick={() => handleSearchResultsClick(book)}
                    >
                      <img
                        className="isbn-input__img"
                        src={
                          book?.volumeInfo?.imageLinks?.smallThumbnail ||
                          defaultImg
                        }
                        alt={book.volumeInfo?.title}
                      ></img>
                      <div>
                        <p>{book?.volumeInfo?.title}</p>
                        {isbns &&
                          isbns.map(({ type, identifier }) => (
                            <div>
                              <p>{`${type}: ${identifier}`}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                })
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default IsbnInput;
