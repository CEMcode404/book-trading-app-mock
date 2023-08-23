import React, { useEffect, useState } from "react";
import defaultPhoto from "../assets/book-no-image.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ShowMoreDropDown from "./common/ShowMoreDropDown.jsx";
import Footer from "./common/Footer.jsx";
import { getTransactions } from "../services/transactionsService.js";
import BookSaleCard from "./common/BookSaleCard.jsx";
import ListSlider from "./common/ListSlider.jsx";

const SearchResults = () => {
  const { state } = useLocation();
  const [searchBooks, setSearchBooks] = useState([]);
  const navigate = useNavigate();
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  let bookInfo = state;
  if (!bookInfo) {
    bookInfo = {};
  }
  const {
    imageLinks,
    title,
    subtitle,
    authors,
    categories,
    description,
    pageCount,
    publisher,
    publishedDate,
    industryIdentifiers,
  } = bookInfo;

  useEffect(() => {
    getTransactions((res, err) => {
      if (res) setRecommendedBooks(res.data);
    });
  }, []);

  function handleCardsOnClick(_id) {
    navigate("/transaction", { state: _id });
  }

  return (
    <div className="search-results">
      <main className="search-results__main">
        <div className="search-results__book-info-bar">
          <img
            src={
              imageLinks?.thumbnail ||
              imageLinks?.smallThumbnail ||
              defaultPhoto
            }
            className="search-results__thumb-nail"
          ></img>
          <div className="search-results__book-details">
            {state && (
              <ShowMoreDropDown
                dynamicContent={industryIdentifiers}
                height="400px"
              >
                <div className="search-results__field-wrappers">
                  <p className="search-results__field-col1">Title:</p>
                  {
                    <p className="search-results__field-col2">
                      {`${title}${subtitle ? " : " + subtitle : ""}`}
                    </p>
                  }
                </div>
                {authors && (
                  <div className="search-results__field-wrappers">
                    <p className="search-results__field-col1">Author/s:</p>
                    <p className="search-results__field-col2">
                      {authors.map((author, index, authorsArray) => {
                        if (index === authorsArray.length - 1)
                          return <span key={index}>{author}</span>;
                        if (index === authorsArray.length - 2)
                          return <span key={index}>{author + " and "}</span>;
                        return <span key={index}>{author + ", "}</span>;
                      })}
                    </p>
                  </div>
                )}
                {categories && (
                  <div className="search-results__field-wrappers">
                    <p className="search-results__field-col1">Categories:</p>
                    <p className="search-results__field-col2">
                      {categories.map((category, index, categoriesArray) => {
                        if (index === categoriesArray.length - 1)
                          return <span key={index}>{category}</span>;
                        if (index === categoriesArray.length - 2)
                          return <span key={index}>{category + " and "}</span>;
                        return <span key={index}>{category + ", "}</span>;
                      })}
                    </p>
                  </div>
                )}
                {pageCount ? (
                  <div className="search-results__field-wrappers">
                    <p className="search-results__field-col1">Pages:</p>
                    <p className="search-results__field-col2">{pageCount}</p>
                  </div>
                ) : null}

                {publishedDate && (
                  <div className="search-results__field-wrappers">
                    <p className="search-results__field-col1">
                      Date published:
                    </p>
                    <p className="search-results__field-col2">
                      {publishedDate}
                    </p>
                  </div>
                )}

                {publisher && (
                  <div className="search-results__field-wrappers">
                    <p className="search-results__field-col1">Publisher:</p>
                    <p className="search-results__field-col2">{publisher}</p>
                  </div>
                )}

                {industryIdentifiers &&
                  industryIdentifiers.map((identifiers, index) => (
                    <div key={index} className="search-results__field-wrappers">
                      <p className="search-results__field-col1">
                        {identifiers?.type}
                      </p>
                      <p className="search-results__field-col2">
                        {identifiers?.identifier}
                      </p>
                    </div>
                  ))}

                {description && (
                  <div className="search-results__field-wrappers">
                    <p className="search-results__field-col1">Description:</p>
                    <p className="search-results__field-col2">{description}</p>
                  </div>
                )}
              </ShowMoreDropDown>
            )}
            <div className="search-results__data">
              <p>Results for {title}</p>
              {searchBooks?.length < 1 && (
                <div className="search-results__no-data">
                  <p>Book not found</p>
                </div>
              )}
              <div className="search-results__book-list">
                {searchBooks?.length > 0 && (
                  <ListSlider>
                    {searchBooks.map((book, index) => (
                      <div key={index}>
                        <BookSaleCard
                          title={book.title}
                          currency={book.currency}
                          price={book.price}
                          onClick={() => handleCardsOnClick(book._id)}
                        />
                      </div>
                    ))}
                  </ListSlider>
                )}
              </div>
              <p>Recommended</p>
              <div className="search-results__book-list">
                {recommendedBooks?.length > 0 && (
                  <ListSlider>
                    {recommendedBooks.map((book, index) => (
                      <div key={index}>
                        <BookSaleCard
                          imgSrc={book?.images && book?.images[0]?.img}
                          title={book.title}
                          currency={book.currency}
                          price={book.price}
                          onClick={() => handleCardsOnClick(book._id)}
                        />
                      </div>
                    ))}
                  </ListSlider>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="search-results__footer">
        <div className="diagonal-separator search-results__ds"></div>
        <Footer />
      </footer>
    </div>
  );
};

export default SearchResults;
