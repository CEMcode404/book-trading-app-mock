import React from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../commonComponents/searchBar/SearchBar.jsx";

import bookTradeFont from "../../assets/bookTrade-fontLogo.svg";
import defaultImg from "../../assets/book-no-image.svg";
import { searchBookWithName } from "../../services/searchService.js";
import "./homepage.scss";

const HomePage = () => {
  const navigate = useNavigate();

  function handleSearch({ inputValue, resolveCallback, waitForCallback }) {
    searchBookWithName(inputValue, (res, err) =>
      resolveCallback(res?.data?.items)
    );

    return waitForCallback();
  }

  return (
    <div className="homepage">
      <img
        alt="booktrading.com"
        className="homepage__book-img"
        src={bookTradeFont}
      />

      <SearchBar
        className="homepage__search-bar"
        formatFunc={(searchResult) =>
          searchResult.map((data, index) => {
            const volumeInfo = data?.volumeInfo;
            const { title } = volumeInfo;

            return (
              <div
                className="homepage__search-result-list"
                key={index}
                onClick={() =>
                  navigate("/search-results", {
                    state: volumeInfo,
                  })
                }
              >
                <img
                  alt={title}
                  className="homepage__search-result-img"
                  src={volumeInfo?.imageLinks?.smallThumbnail || defaultImg}
                />
                <p className="homepage__search-result-title">{title}</p>
              </div>
            );
          })
        }
        id="homepage__search-bar"
        onChange={handleSearch}
        placeholder="Find books . . ."
      />
    </div>
  );
};

export default HomePage;
