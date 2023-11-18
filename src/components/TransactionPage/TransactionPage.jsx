import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ChatBox from "../commonComponents/chatBox/ChatBox.jsx";
import ImageSlider from "../commonComponents/imageSlider/ImageSlider.jsx";
import TransactionPageInfoField from "./transactionPageInfoField/TransactionPageInfoField.jsx";

import { getTransactionById } from "../../services/transactionsService.js";
import "./transactionPage.scss";

const TransactionPage = () => {
  const [transaction, setTransaction] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { state: id } = useLocation();
  const navigate = useNavigate();

  const baseUrl = process.env.RESOURCE_SERVER_URL;
  useEffect(() => {
    if (!id) return navigate("/");

    getTransactionById(id, (res, err) => {
      if (res) {
        const { images, ...rest } = res.data;
        const modifiedImagesUrl = images.map((path) => `${baseUrl}/${path}`);

        setTransaction({ ...rest, images: modifiedImagesUrl });
      }
    });
  }, []);

  return (
    <div className="transaction__wrapper">
      <main className="transaction">
        <h1 className="transaction__h1">Transaction Details</h1>

        <ImageSlider imgSrcs={transaction?.images && transaction.images} />

        <div className="transaction__details">
          <TransactionPageInfoField fieldName={"Title"}>
            {transaction?.title}
          </TransactionPageInfoField>

          <TransactionPageInfoField fieldName="Author/s">
            {transaction?.authors?.map((author, index) => (
              <Fragment key={index}>
                <span
                  style={
                    index === 0
                      ? null
                      : {
                          marginTop: "1rem",
                          display: "inline-block",
                        }
                  }
                >
                  {author}
                </span>
                <br />
              </Fragment>
            ))}
          </TransactionPageInfoField>

          <TransactionPageInfoField fieldName="ISBN">
            {transaction?.isbn || "-"}
          </TransactionPageInfoField>

          <TransactionPageInfoField fieldName="Owner">
            {transaction?.owner}
          </TransactionPageInfoField>

          <TransactionPageInfoField fieldName="Condition">
            <span
              className="transaction__status-box"
              style={
                transaction?.bookCondition === "New"
                  ? null
                  : { backgroundColor: "yellow" }
              }
            ></span>
            {transaction?.bookCondition}
          </TransactionPageInfoField>

          <TransactionPageInfoField fieldName="Price">
            {`${transaction?.currency}${transaction?.price}`}
          </TransactionPageInfoField>

          <TransactionPageInfoField fieldName="Use Duration">
            {`${transaction?.useDuration} ${transaction.timeUnit}`}
          </TransactionPageInfoField>

          <TransactionPageInfoField fieldName="Status">
            {transaction.status ? "PENDING" : "AVAILABLE"}
          </TransactionPageInfoField>
        </div>

        <section
          aria-label="Contact Owner"
          className="transaction__contact-section"
        >
          <div className="transaction__chat">
            <hr className="transaction__hr" />
            <p className="transaction__p">The owner is currently not online:</p>
            <input
              type="button"
              value="Chat Owner"
              className="transaction__chat-bttn bttn--slide-up--gray"
              onClick={() => setIsChatOpen(true)}
            />
          </div>
        </section>
      </main>

      <ChatBox
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default TransactionPage;
