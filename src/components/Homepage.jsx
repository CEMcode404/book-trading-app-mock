// import React, { useState, useRef, useEffect } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/book-no-image.svg";
// import Footer from "./common/Footer.jsx";
// import Parallax from "./common/Parallax.jsx";
// import { getTransactions } from "../services/transactionsService.js";
// import ListSlider from "./common/ListSlider.jsx";
// import DisplayCard from "./common/DisplayCard.jsx";
// import BookSaleCard from "./common/BookSaleCard.jsx";
import SearchBar from "./common/SearchBar.jsx";
import { searchBookWithName } from "../services/searchService.js";
import books from "../assets/books.svg";
import bookTradeFont from "../assets/bookTrade-fontLogo.svg";

const HomePage = () => {
  // const scrollRef = useRef(null);
  // const [newUploads, setNewUploads] = useState([]);
  // const baseUrl = "http://localhost:8000/";

  // useEffect(() => {
  //   getTransactions((res, err) => {
  //     if (res) {
  //       const newlyUploaded = res.data.map(({ images, ...rest }) => {
  //         const modifiedImagesURl = images.map((image) => baseUrl + image);
  //         return { ...rest, images: modifiedImagesURl };
  //       });
  //       setNewUploads(newlyUploaded);
  //     }
  //   });
  // }, []);
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
        console.log(res, err);
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
