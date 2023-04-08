import React from "react";
import BookCard from "./BookCard.jsx";

const BookCardList = ({ title }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <h1 className="book-card-list__header">{title}</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="book-card-list">
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BookCardList;
