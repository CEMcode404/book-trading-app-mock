import React from "react";
import BookCard from "./BookCard.jsx";

const BookCardList = ({ title, data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <h2 className="book-card-list__header">{title}</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="book-card-list">
              {data.map((bookData) => (
                <BookCard
                  imgSrc={bookData?.imgSrc}
                  title={bookData?.title}
                  authors={bookData?.authors}
                />
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BookCardList;
