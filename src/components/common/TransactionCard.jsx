import React from "react";

const TransactionCard = ({
  data: {
    transactionId,
    title,
    price,
    bookCondition,
    useDuration,
    authors,
    isbn,
    currency,
    timeUnit,
  },
  onDelete,
}) => {
  return (
    <section className="transaction-card">
      <input
        value="+"
        type="button"
        className="transaction-card__delete-bttn"
        onClick={() => onDelete(transactionId)}
      />
      <h3>{title}</h3>
      <div>
        <label>Author/s:</label>
        <span>{authors}</span>
      </div>
      <div>
        <label>Price:</label>
        <span>
          {currency}
          {price}
        </span>
      </div>
      <div>
        <label>Book Condition:</label>
        <span>{bookCondition}</span>
      </div>
      <div>
        <label>Use Duration:</label>
        <span>
          {useDuration}
          {"  " + timeUnit}
        </span>
      </div>
      <div>
        <label>ISBN:</label>
        <span>{isbn}</span>
      </div>
    </section>
  );
};

export default TransactionCard;
