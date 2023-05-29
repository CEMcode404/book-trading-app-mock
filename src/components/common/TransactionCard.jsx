import React, { useRef } from "react";

const TransactionCard = ({
  data: {
    _id,
    title,
    price,
    bookCondition,
    useDuration,
    authors,
    isbn,
    currency,
    timeUnit,
    imgSrcs,
  },
  onDelete,
}) => {
  const dialogRef = useRef();

  function handleOpenImagesDialog() {
    const dialogElement = dialogRef.current;
    dialogElement.showModal();
  }

  function handleCloseImagesDialog(e) {
    const dialogElement = dialogRef.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();
    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right
    ) {
      dialogElement.close();
    }
  }

  return (
    <section className="transaction-card">
      <input
        value="+"
        type="button"
        className="transaction-card__delete-bttn"
        onClick={() => onDelete(_id)}
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
      <div>
        <input
          type="button"
          onClick={handleOpenImagesDialog}
          value="Show Image/s"
          className="transaction-card__show-images-bttn"
        />
        <dialog
          ref={dialogRef}
          onClick={handleCloseImagesDialog}
          className="transaction-card__images-dialog"
        >
          {imgSrcs && imgSrcs.map((src) => <img src={src}></img>)}
          {!imgSrcs && <p>No image/s uploaded</p>}
        </dialog>
      </div>
    </section>
  );
};

export default TransactionCard;
