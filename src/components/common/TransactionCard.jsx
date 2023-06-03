import React, { useRef, useState } from "react";
import BinaryPrompt from "./BinaryPrompt.jsx";
import ImageViewer from "./ImageViewer.jsx";

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
    images,
    status,
  },
  onDelete,
  onChangeStatus,
}) => {
  const statusDialogRef = useRef();
  const imageViewerRef = useRef();
  const deleletTransactionBttnRef = useRef();

  function handleOpenStatusDialog() {
    statusDialogRef?.current?.open();
  }

  function handleOpenImageViewer() {
    imageViewerRef.current.open();
  }

  function handleOpenDeletePrompt() {
    deleletTransactionBttnRef.current.open();
  }

  const interpretStatus = (currentStatus) => {
    if (currentStatus) return "PENDING";
    return "AVAILABLE";
  };

  return (
    <section className="transaction-card">
      <input
        value="+"
        type="button"
        className="transaction-card__delete-bttn"
        onClick={handleOpenDeletePrompt}
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
        <label>Status:</label>
        <span>{interpretStatus(status)}</span>
      </div>
      <div>
        <input
          type="button"
          onClick={handleOpenImageViewer}
          value="Show Image/s"
          className="transaction-card__show-images-bttn"
        />
        <ImageViewer ref={imageViewerRef} imgSrcs={images} />
      </div>
      <div>
        <input
          type="button"
          onClick={handleOpenStatusDialog}
          value="Change Status"
          className="transaction-card__change-status-bttn"
        />
        <BinaryPrompt
          ref={statusDialogRef}
          message={`Are you sure you want to change status?`}
          yesBttnClass="bttn--slide-up--green"
          noBttnClass="bttn--slide-up--gray"
          yesBttnHookFunc={(prompt) => onChangeStatus(_id, status, prompt)}
        />
      </div>
      <div>
        <BinaryPrompt
          ref={deleletTransactionBttnRef}
          message={"Are you sure you want to delete this transaction?"}
          yesBttnClass="bttn--slide-up--green"
          noBttnClass="bttn--slide-up-gray"
          yesBttnHookFunc={(prompt) => onDelete(_id, prompt)}
        />
      </div>
    </section>
  );
};

export default TransactionCard;
