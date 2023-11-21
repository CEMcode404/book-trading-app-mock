import React, { useEffect, useState } from "react";

import MyDetails from "./myDetails/MyDetails.jsx";
import MyTransaction from "./myTransaction/MyTransaction.jsx";

import { fetchUserData } from "../../services/userService.js";
import "./accountPage.scss";

const AccounPage = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
  });

  useEffect(() => {
    fetchUserData((result, err) => {
      if (result) setUserInfo(result.data);
    });
  }, []);

  const sections = [
    {
      title: "My Details",
      component: (
        <MyDetails
          key={"mydetails"}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      ),
    },
    {
      title: "My Transaction",
      component: <MyTransaction key={"mytransaction"} />,
    },
  ];

  const [activeSectionTitle, setActiveSectionTitle] = useState(
    sections[0].title
  );

  return (
    <div className="account-page">
      <header>
        <h1>My Account</h1>
      </header>

      <div className="account-page__sections-and-titles">
        <aside>
          <h2>Contents</h2>
          <nav aria-label="table of contents" className="account-page__toc">
            {sections.map((section) => (
              <p
                className={
                  section.title === activeSectionTitle
                    ? "account-page__section-title"
                    : null
                }
                key={section.title}
                onClick={() => setActiveSectionTitle(section.title)}
              >
                {section.title}
              </p>
            ))}
          </nav>
        </aside>

        <main>
          <h2>{activeSectionTitle}</h2>

          {sections.map((section) =>
            section.title === activeSectionTitle ? section.component : null
          )}
        </main>
      </div>
    </div>
  );
};

export default AccounPage;
