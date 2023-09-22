import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PicViewer from "./common/PicViewer.jsx";
import TransactionContacts from "./common/TransactionContacts.jsx";
import { getTransactionById } from "../services/transactionsService.js";
import ChatBox from "./common/ChatBox.jsx";

const TransactionPage = () => {
  const [transaction, setTransaction] = useState({});
  const chatboxRef = useRef();
  const { state: id } = useLocation();
  const navigate = useNavigate();
  const baseUrl = process.env.RESOURCE_SERVER_URL;

  useEffect(() => {
    if (!id) return navigate("/");
    const bookId = id;
    getTransactionById(bookId, (res, err) => {
      if (res) {
        const { images, ...rest } = res.data;
        const modifiedImagesUrl = images.map((path) => `${baseUrl}/${path}`);
        setTransaction({ ...rest, images: modifiedImagesUrl });
      }
    });
  }, [setTransaction]);

  return (
    <div className="transaction__wrapper">
      <main className="transaction">
        <h1 className="transaction__h1">Transaction Details</h1>
        <PicViewer imgSrcs={transaction?.images && transaction.images} />
        <div className="transaction__details">
          <div className="transaction__field-wrapper">
            <p className="transaction__field-name">Title:</p>
            <p className="transaction__field-data">{transaction?.title}</p>
          </div>

          <div className="transaction__field-wrapper">
            <p className="transaction__field-name">Author/s:</p>
            <p className="transaction__field-data">{transaction?.authors}</p>
          </div>
          <div className="transaction__field-wrapper">
            <p className="transaction__field-name">ISBN:</p>
            <p className="transaction__field-data">
              {transaction?.isbn || "-"}
            </p>
          </div>
          <div className="transaction__field-wrapper">
            <p className="transaction__field-name">Owner:</p>
            <p className="transaction__field-data">{`${transaction?.owner}`}</p>
          </div>
          <div className="transaction__field-wrapper">
            <p className="transaction__field-name">Condition:</p>
            <p className="transaction__field-data">
              <span
                className="transaction__status-box"
                style={
                  transaction?.bookCondition === "New"
                    ? null
                    : { backgroundColor: "yellow" }
                }
              ></span>
              {transaction?.bookCondition}
            </p>
          </div>
          <div className="transaction__field-wrapper">
            <p className="transaction__field-name">Price:</p>
            <p className="transaction__field-data">{`${transaction?.currency}${transaction?.price}`}</p>
          </div>
          <div className="transaction__field-wrapper">
            <p className="transaction__field-name">Use Duration:</p>
            <p className="transaction__field-data">{`${transaction?.useDuration} ${transaction.timeUnit}`}</p>
          </div>
          <div className="transaction__field-wrapper">
            <p className="transaction__field-name">Status:</p>
            <p className="transaction__field-data">
              {transaction.status ? "PENDING" : "AVAILABLE"}
            </p>
          </div>
        </div>
        <TransactionContacts openChat={chatboxRef?.current?.openChat} />
      </main>
      <ChatBox ref={chatboxRef} />
    </div>
  );
};

export default TransactionPage;
