import PropTypes from "prop-types";
import React, { useState } from "react";

import BinaryPrompt from "../../commonComponents/binaryPrompt/BinaryPrompt.jsx";
import ImageViewer from "../../commonComponents/imageViewer/ImageViewer.jsx";

import "./transactionCard.scss";

const TransactionCard = ({
  data: {
    authors,
    bookCondition,
    currency,
    _id,
    isbn,
    imgSrcs,
    price,
    status,
    title,
    timeUnit,
    useDuration,
  },
  onDelete,
  onChangeStatus,
}) => {
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [isStatusPromptOpen, setIsStatusPromptOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  function handleDeleteTransaction(_id) {
    onDelete(_id);
    setIsDeletePromptOpen(false);
  }

  function handleChangeStatus(_id) {
    onChangeStatus(_id);
    setIsStatusPromptOpen(false);
  }

  const infoFields = [
    { fieldName: "Author/s", value: authors },
    { fieldName: "Price", value: `${currency}${price}` },
    { fieldName: "Book Condition", value: bookCondition },
    { fieldName: "Use Duration", value: `${useDuration} ${timeUnit}` },
    { fieldName: "ISBN", value: isbn },
    { fieldName: "Status", value: status },
  ];

  return (
    <section className="transaction-card">
      {/* display fields  */}
      <h3>{title}</h3>

      {infoFields.map(({ fieldName, value }, index) => {
        return (
          <div className="transaction-card__field-wrapper" key={fieldName}>
            <p className="transaction-card__label">{fieldName}:</p>
            <div className="transaction-card__field-value">
              {Array.isArray(value) &&
                value.map((value, index) => <span key={index}>{value}</span>)}
              {!Array.isArray(value) && value}
            </div>
          </div>
        );
      })}

      {/* Buttons  */}
      <div>
        <input
          className="transaction-card__delete-bttn"
          onClick={() => setIsDeletePromptOpen(true)}
          type="button"
          value="+"
        />
        <BinaryPrompt
          isOpen={isDeletePromptOpen}
          onNo={() => setIsDeletePromptOpen(false)}
          onYes={() => handleDeleteTransaction(_id)}
        >
          Are you sure you want to delete this transaction?
        </BinaryPrompt>
      </div>

      <div>
        <input
          className="transaction-card__show-images-bttn"
          onClick={() => setIsImageViewerOpen(true)}
          type="button"
          value="Show Image/s"
        />
        <ImageViewer
          isOpen={isImageViewerOpen}
          imgSrcs={Array.isArray(imgSrcs) && imgSrcs}
          onClose={() => setIsImageViewerOpen(false)}
        />
      </div>

      <div>
        <input
          className="transaction-card__change-status-bttn"
          onClick={() => setIsStatusPromptOpen(true)}
          type="button"
          value="Change Status"
        />
        <BinaryPrompt
          isOpen={isStatusPromptOpen}
          onNo={() => setIsStatusPromptOpen(false)}
          onYes={() => handleChangeStatus(_id)}
        >
          Are you sure you want to change status?
        </BinaryPrompt>
      </div>
    </section>
  );
};

TransactionCard.propTypes = {
  data: PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string),
    bookCondition: PropTypes.string,
    currency: PropTypes.string,
    _id: PropTypes.string.isRequired,
    isbn: PropTypes.string,
    imgSrcs: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    status: PropTypes.string,
    title: PropTypes.string,
    timeUnit: PropTypes.string,
    useDuration: PropTypes.number,
  }),
  onDelete: PropTypes.func,
  onChangeStatus: PropTypes.func,
};

export default TransactionCard;
