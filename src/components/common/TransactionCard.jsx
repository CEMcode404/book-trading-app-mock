import React from "react";

const TransactionCard = ({
  data: { title, price, bookCondition, useDuration },
}) => {
  return (
    <section className="transaction-card">
      <input
        value="+"
        type="button"
        className="transaction-card__delete-bttn"
      />
      <h3>{title}</h3>
      <p>
        Price: <span>{price}</span>
      </p>
      <p>
        Book Condition: <span>{bookCondition}</span>
      </p>
      <p>
        Use Duration: <span>{useDuration}</span>
      </p>
    </section>
  );
};

export default TransactionCard;
