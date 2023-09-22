import React from "react";
import paginate from "../../utility/paginate";

const Pagination = ({
  pageShown = 7,
  itemCount,
  currentPage = 1,
  maxItemsPerPage = 5,
  pageChange,
  className = "",
  activeColor = "lightgray",
}) => {
  const pageNo = Math.ceil(itemCount / maxItemsPerPage);
  const currentPageClamp = Math.max(1, Math.min(currentPage, pageNo));

  if (currentPageClamp !== currentPage) pageChange(currentPageClamp);

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
              key={number}
              onClick={pageChange}
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
