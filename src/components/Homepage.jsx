import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/book-no-image.svg";
import SearchBar from "./common/SearchBar.jsx";
import { searchBookWithName } from "../services/searchService.js";
import bookTradeFont from "../assets/bookTrade-fontLogo.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const [timeOutHandle, setTimeOutHandle] = useState();

  const handleSearchInput = (search) => {
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

  return (
    <div className="homepage">
      <img className="homepage__book-img" src={bookTradeFont}></img>
      <SearchBar
        id="homepage__search-bar"
        className="homepage__search-bar"
        placeholder="Find books . . ."
        onChange={(searchString) => handleSearchInput(searchString)}
        formatFunc={(searchResult) =>
          searchResult.map((book, index) => (
            <div
              key={index}
              className="homepage__search-result-list"
              onChange={(searchString) => handleSearchInput(searchString)}
              onClick={() =>
                navigate("/search-results", {
                  state: book.volumeInfo,
                })
              }
            >
              <img
                className="homepage__search-result-img"
                src={book?.volumeInfo?.imageLinks?.smallThumbnail || defaultImg}
                alt={book.volumeInfo?.title}
              ></img>
              <p className="homepage__search-result-title">
                {book?.volumeInfo?.title}
              </p>
            </div>
          ))
        }
      />
    </div>
  );
};

export default HomePage;
