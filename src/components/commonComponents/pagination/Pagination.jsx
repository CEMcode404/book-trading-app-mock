import PropTypes from "prop-types";
import React, { Children, Fragment, useEffect, useState } from "react";

import paginate, { clamp } from "./paginate";
import "./pagination.scss";

//inserting a footer element/elements allow you to add Element in between  page number nav and items
//this element persist across every page

const Pagination = ({
  activeColor = "lightgray",
  children,
  className = "",
  insertFooterElement: insertedElements,
  maxItemsPerPage = 5,
  noOfPageVisible = 7,
}) => {
  const [currentPage, setCurrentPageNo] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    setItemsCount(Children.count(children));
    setCurrentPageNo(calculatePageNo());
  }, [children]);

  function calculatePageNo() {
    const lowestPageNumber = 1;
    const totalPages = Math.ceil(Children.count(children) / maxItemsPerPage);

    return clamp(currentPage, totalPages, lowestPageNumber);
  }

  const endingIndex = maxItemsPerPage * currentPage;
  const startingIndex = endingIndex - maxItemsPerPage;

  return (
    <Fragment>
      {Children.toArray(children).filter(
        (element, index) => index >= startingIndex && index < endingIndex
      )}

      {insertedElements}

      {itemsCount > maxItemsPerPage && (
        <nav className={`pagination ${className}`}>
          <ul>
            {paginate(
              calculatePageNo(),
              itemsCount,
              maxItemsPerPage,
              noOfPageVisible
            ).map((pageNo) => (
              <li
                key={pageNo}
                onClick={() => setCurrentPageNo(pageNo)}
                style={
                  pageNo === currentPage
                    ? { backgroundColor: activeColor }
                    : null
                }
              >
                {pageNo}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </Fragment>
  );
};

Pagination.propTypes = {
  activeColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  insertFooterElement: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  maxItemsPerPage: PropTypes.number,
  noOfPageVisible: PropTypes.number,
};

export default Pagination;
