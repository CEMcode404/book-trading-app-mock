import React, { useState } from "react";
import Footer from "./common/Footer.jsx";

const AccounPage = () => {
  const verticalNavTitles = ["My Details", "Transactions", "Account Settings"];
  const [activeNavTitle, setActiveNavTitle] = useState("My Details");

  const handleVNavTitleChange = (title) => {
    setActiveNavTitle(title);
  };

  return (
    <div className="account">
      <div className="account__content-wrapper">
        <header>
          <h1>My Account</h1>
        </header>
        <div className="account__body">
          <aside>
            <h2>Contents</h2>
            <nav aria-label="table of contents" className="account__toc">
              {verticalNavTitles.map((title) => (
                <p
                  onClick={() => handleVNavTitleChange(title)}
                  className={
                    title === activeNavTitle
                      ? "account__vertical-title-active"
                      : null
                  }
                  key={title}
                >
                  {title}
                </p>
              ))}
            </nav>
          </aside>
          <main>
            <section aria-label={activeNavTitle}>
              <h2>{activeNavTitle}</h2>
              <div className="account__data-display"></div>
            </section>
          </main>
        </div>
      </div>
      <div className="diagonal-separator"></div>
      <Footer />
    </div>
  );
};

export default AccounPage;
