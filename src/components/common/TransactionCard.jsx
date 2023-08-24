import React, { useRef } from "react";
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
  console.log(authors);

  return (
    <section className="transaction-card">
      <input
        value="+"
        type="button"
        className="transaction-card__delete-bttn"
        onClick={handleOpenDeletePrompt}
      />
      <h3>{title}</h3>
      <div className="transaction-card__field-wrapper">
        <p className="transaction-card__label">Author/s:</p>
        <div className="transaction-card__field-value">
          {authors.map((author, index) => (
            <span key={index}>{author}</span>
          ))}
        </div>
      </div>
      <div className="transaction-card__field-wrapper">
        <p className="transaction-card__label">Price:</p>
        <span className="transaction-card__field-value">
          {currency}
          {price}
        </span>
      </div>
      <div className="transaction-card__field-wrapper">
        <p className="transaction-card__label">Book Condition:</p>
        <span className="transaction-card__field-value">{bookCondition}</span>
      </div>
      <div className="transaction-card__field-wrapper">
        <p className="transaction-card__label">Use Duration:</p>
        <span className="transaction-card__field-value">
          {useDuration}
          {"  " + timeUnit}
        </span>
      </div>
      <div className="transaction-card__field-wrapper">
        <p className="transaction-card__label">ISBN:</p>
        <span className="transaction-card__field-value">{isbn}</span>
      </div>
      <div className="transaction-card__field-wrapper">
        <p className="transaction-card__label">Status:</p>
        <span className="transaction-card__field-value">{status}</span>
      </div>
      <div>
        <input
          type="button"
          onClick={handleOpenImageViewer}
          value="Show Image/s"
          className="transaction-card__show-images-bttn"
        />
        <ImageViewer
          ref={imageViewerRef}
          imgSrcs={Array.isArray(images) && images}
        />
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
