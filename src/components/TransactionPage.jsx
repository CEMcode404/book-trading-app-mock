import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import PicViewer from "./common/PicViewer.jsx";
import TransactionContacts from "./common/TransactionContacts.jsx";
import Footer from "./common/Footer.jsx";
import {
  getBookId,
  getTransactionById,
} from "../services/transactionsService.js";
import ChatBox from "./common/ChatBox.jsx";

const TransactionPage = () => {
  const [transaction, setTransaction] = useState({});
  const chatboxRef = useRef();
  const { state: id } = useLocation();

  useEffect(() => {
    const bookId = id || getBookId();
    getTransactionById(bookId, (res, err) => {
      if (res) {
        setTransaction({ ...res.data });
      }
    });
  }, [setTransaction]);

  return (
    <div>
      <main className="transaction">
        <h1 className="transaction__h1">Transaction Details</h1>
        <PicViewer />
        <div className="transaction__details">
          <p>
            Book Title:
            <span className="transaction__span">{transaction?.title}</span>
          </p>
          <p>
            Book Author/s:
            <span className="transaction__span">{transaction?.authors}</span>
          </p>
          <p>
            ISBN:
            <span className="transaction__span">
              {transaction?.isbn || "-"}
            </span>
          </p>
          <p>
            Owner:{" "}
            <span className="transaction__span">{`${transaction?.owner}`}</span>
          </p>
          <p>
            Book Condition:
            <span className="transaction__span">
              <span
                className="transaction__status-box"
                style={
                  transaction?.bookCondition === "New"
                    ? null
                    : { backgroundColor: "yellow" }
                }
              ></span>
              {transaction?.bookCondition}
            </span>
          </p>
          <p>
            Price:{" "}
            <span className="transaction__span">{`${transaction?.currency}${transaction?.price}`}</span>
          </p>
          <p>
            Use Duration:{" "}
            <span className="transaction__span">{`${transaction?.useDuration} ${transaction.timeUnit}`}</span>
          </p>
          <p>
            Status:
            <span className="transaction__span">
              {transaction.status ? "Pending transaction" : "On market"}
            </span>
          </p>
        </div>
        <TransactionContacts openChat={chatboxRef?.current?.openChat} />
      </main>
      <Footer fclass="footer--bg-light-green" />
      <ChatBox ref={chatboxRef} />
    </div>
  );
};

export default TransactionPage;
