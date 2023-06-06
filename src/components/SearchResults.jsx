import React from "react";
import defaultPhoto from "../assets/book-no-image.svg";
import { useNavigate, useLocation } from "react-router-dom";
import ShowMoreDropDown from "./common/ShowMoreDropDown.jsx";

const SearchResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return null;
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
  } = state;
  return (
    <div className="search-results">
      <div className="search-results__book-info-bar">
        <img
          src={
            imageLinks?.thumbnail || imageLinks?.smallThumbnail || defaultPhoto
          }
          className="search-results__thumb-nail"
        ></img>
        <div className="search-results__book-details">
          <ShowMoreDropDown dynamicContent={industryIdentifiers} height="400px">
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
                      return <span>{author}</span>;
                    if (index === authorsArray.length - 2)
                      return <span>{author + " and "}</span>;
                    return <span>{author + ", "}</span>;
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
                      return <span>{category}</span>;
                    if (index === categoriesArray.length - 2)
                      return <span>{category + " and "}</span>;
                    return <span>{category + ", "}</span>;
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
                <p className="search-results__field-col1">Date published:</p>
                <p className="search-results__field-col2">{publishedDate}</p>
              </div>
            )}

            {publisher && (
              <div className="search-results__field-wrappers">
                <p className="search-results__field-col1">Publisher:</p>
                <p className="search-results__field-col2">{publisher}</p>
              </div>
            )}

            {industryIdentifiers &&
              industryIdentifiers.map((identifiers) => (
                <div className="search-results__field-wrappers">
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
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
