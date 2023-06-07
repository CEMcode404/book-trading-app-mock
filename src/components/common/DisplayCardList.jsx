import React from "react";
import DisplayCard from "./DisplayCard.jsx";

const DisplayCardList = ({ title, data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <h2 className="display-card-list__header">{title}</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="display-card-list">
              {data.map((bookData) => (
                <DisplayCard
                  imgSrc={bookData?.imgSrc}
                  title={bookData?.title}
                  authors={bookData?.authors}
                  _id={bookData?._id}
                />
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DisplayCardList;
