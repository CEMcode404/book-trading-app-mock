import React, { useEffect, useState } from "react";
import Footer from "./common/Footer.jsx";
import MyDetails from "./MyDetails.jsx";
import MyTransaction from "./MyTransaction.jsx";
import { fetchUserData } from "../services/userService.js";

const AccounPage = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
  });

  function getProps(title) {
    switch (title) {
      case "myDetails":
        return { userInfo, setUserInfo };
      default:
        return null;
    }
  }

  const accountSections = [
    { title: "My Details", component: MyDetails },
    { title: "My Transactions", component: MyTransaction },
  ];

  useEffect(() => {
    fetchUserData((result) => {
      setUserInfo(result.data);
    });
  }, []);

  const [activeSection, setActiveSection] = useState(accountSections[0]);

  const handleSectionChange = (title) => {
    setActiveSection(title);
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
              {accountSections.map((title) => (
                <p
                  onClick={() => handleSectionChange(title)}
                  className={
                    title.title === activeSection.title
                      ? "account__vertical-title-active"
                      : null
                  }
                  key={title.title}
                >
                  {title.title}
                </p>
              ))}
            </nav>
          </aside>
          <main>
            <section aria-label={activeSection.title}>
              <h2>{activeSection.title}</h2>
              <div className="account__data-display">
                <activeSection.component getProps={getProps} />
              </div>
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
