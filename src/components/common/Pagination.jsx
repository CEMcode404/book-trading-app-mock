import React from "react";
import paginate from "../../utility/paginate";

const Pagination = ({
  pageShown = 7,
  itemCount,
  currentPage = 1,
  maxItemsPerPage = 5,
  onClick,
  className = "",
  activeColor = "lightgray",
}) => {
  const pagesArray = paginate(
    pageShown,
    itemCount,
    currentPage,
    maxItemsPerPage
  );

  return (
    <nav className={"pagination " + className}>
      <ul>
        {pagesArray &&
          pagesArray.map((number) => (
            <li
              onClick={onClick}
              style={
                number === currentPage ? { backgroundColor: activeColor } : null
              }
            >
              {number}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
