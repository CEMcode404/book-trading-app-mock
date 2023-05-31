import React from "react";

const TransactionContacts = ({ openChat }) => {
  return (
    <div aria-label="Contact Owner" className="transaction-contact">
      <div className="transaction-contact__chat">
        <hr className="transaction-contact__hr"></hr>
        <p className="transaction-contact__p">
          The owner is currently not online:
        </p>
        <input
          type="button"
          value="Chat Owner"
          className="transaction-contact__chat-bttn bttn--slide-up--gray"
          onClick={openChat}
        />
      </div>
      <div className="transaction-contact__request">
        <hr className="transaction-contact__hr"></hr>
        <p className="transaction-contact__p">
          Request the owner contact details:
        </p>
        <input
          type="button"
          value="Request"
          className="transaction-contact__request-bttn bttn--slide-up--green"
        />
      </div>
    </div>
  );
};

export default TransactionContacts;
