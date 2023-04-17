import React from "react";
import PicViewer from "./common/PicViewer.jsx";
import TransactionContacts from "./common/TransactionContacts.jsx";
import Footer from "./common/Footer.jsx";

const TransactionPage = () => {
  return (
    <div>
      <main className="transaction">
        <h1 className="transaction__h1">Transaction Details</h1>
        <PicViewer />
        <div className="transaction__details">
          <p>
            Owner: <span className="transaction__span">John Smith</span>
          </p>
          <p>
            Book Condition:
            <span className="transaction__span">
              <span className="transaction__status-box"></span>Good
            </span>
          </p>
          <p>
            Price: <span className="transaction__span">P300.00</span>
          </p>
          <p>
            Use Duration: <span className="transaction__span">5 yrs.</span>
          </p>
          <p>
            Status:
            <span className="transaction__span">Pending Transaction</span>
          </p>
        </div>
        <TransactionContacts />
      </main>
      <Footer fclass="footer--bg-light-green" />
    </div>
  );
};

export default TransactionPage;
