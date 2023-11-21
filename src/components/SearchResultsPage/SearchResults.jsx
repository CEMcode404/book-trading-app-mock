import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BookSaleCard from "./bookSaleCard/BookSaleCard.jsx";
import ListSlider from "../commonComponents/listSlider/ListSlider.jsx";
import ShowMoreDropDown from "../commonComponents/showMoreDropDown/ShowMoreDropDown.jsx";
import SearchResultsInfoField from "./searchResultsInfoField/SearchResultsInfoField.jsx";

import defaultPhoto from "../../assets/book-no-image.svg";
import { getTransactions } from "../../services/transactionsService.js";
import "./searchResults.scss";

const SearchResults = () => {
  const { state: passedBookInfo } = useLocation();
  const [searchBooks] = useState([]);
  const navigate = useNavigate();
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  //Needed to make this to prevent destructuring error if there is no data pass which result
  //in it being undefined
  let bookInfo = passedBookInfo;
  if (!bookInfo) bookInfo = {};

  let {
    authors,
    categories,
    description,
    imageLinks,
    industryIdentifiers,
    pageCount,
    publisher,
    publishedDate,
    subtitle,
    title,
  } = bookInfo;

  useEffect(() => {
    getTransactions((res, err) => {
      if (res) setRecommendedBooks(res.data);
    });
  }, []);

  function handleCardsOnClick(_id) {
    navigate("/transaction", { state: _id });
  }

  const baseUrl = process.env.RESOURCE_SERVER_URL;

  return (
    <div className="search-results">
      <main className="search-results__main">
        <div className="search-results__book-details-section">
          <img
            src={
              imageLinks?.thumbnail ||
              imageLinks?.smallThumbnail ||
              defaultPhoto
            }
            className="search-results__thumb-nail"
          />
          <div className="search-results__book-details">
            {passedBookInfo && (
              <ShowMoreDropDown minHeight="400px">
                {/* Note: Only put elements that is allowed inside p element as child
                of SearchResultsInfoField*/}

                <SearchResultsInfoField fieldName={"Title"} isVisible={!!title}>
                  {`${title}${subtitle ? " : " + subtitle : ""}`}
                </SearchResultsInfoField>

                <SearchResultsInfoField
                  fieldName="Author/s"
                  isVisible={Array.isArray(authors)}
                >
                  {authors?.reduce((accumulator, author, index, authors) =>
                    index === authors.length - 1
                      ? (accumulator += ` and ${author}`)
                      : (accumulator += `, ${author}`)
                  )}
                </SearchResultsInfoField>

                <SearchResultsInfoField
                  fieldName="Categories"
                  isVisible={Array.isArray(categories)}
                >
                  {categories?.reduce(
                    (accumulator, category, index, categories) =>
                      index === categories.length - 1
                        ? (accumulator += ` and ${category}`)
                        : (accumulator += `, ${category}`)
                  )}
                </SearchResultsInfoField>

                <SearchResultsInfoField
                  fieldName="Pages"
                  isVisible={!!pageCount}
                >
                  {pageCount}
                </SearchResultsInfoField>

                <SearchResultsInfoField
                  fieldName="Date published"
                  isVisible={!!publishedDate}
                >
                  {publishedDate}
                </SearchResultsInfoField>

                <SearchResultsInfoField
                  fieldName="Publisher"
                  isVisible={!!publisher}
                >
                  {publisher}
                </SearchResultsInfoField>

                {industryIdentifiers &&
                  industryIdentifiers.map((identifiers, index) => (
                    <SearchResultsInfoField
                      fieldName={identifiers?.type}
                      key={index}
                    >
                      {identifiers.identifier}
                    </SearchResultsInfoField>
                  ))}

                <SearchResultsInfoField
                  fieldName="Description"
                  isVisible={!!description}
                >
                  {description}
                </SearchResultsInfoField>
              </ShowMoreDropDown>
            )}

            <div className="search-results__bookshelf">
              <p>Results for {title}</p>
              {searchBooks?.length < 1 && (
                <div className="search-results__book-list--no-data">
                  <p>Book not found</p>
                </div>
              )}

              <div className="search-results__book-list">
                {searchBooks?.length > 0 && (
                  <ListSlider>
                    {searchBooks.map(
                      ({ currency, _id, images, price, title }, index) => (
                        <BookSaleCard
                          currency={currency}
                          imgSrc={`${baseUrl}/${images?.[0]}`}
                          key={index}
                          onClick={() => handleCardsOnClick(_id)}
                          price={price}
                          title={title}
                        />
                      )
                    )}
                  </ListSlider>
                )}
              </div>

              <p>Recommended</p>
              <div className="search-results__book-list">
                {recommendedBooks?.length > 0 && (
                  <ListSlider>
                    {recommendedBooks.map(
                      ({ currency, _id, images, price, title }, index) => (
                        <BookSaleCard
                          currency={currency}
                          imgSrc={`${baseUrl}/${images?.[0]}`}
                          key={index}
                          onClick={() => handleCardsOnClick(_id)}
                          price={price}
                          title={title}
                        />
                      )
                    )}
                  </ListSlider>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
