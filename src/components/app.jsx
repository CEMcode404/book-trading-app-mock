import { Route, Routes, useLocation } from "react-router-dom";
import React, { Fragment } from "react";
import NavBar from "./common/NavBar.jsx";
import HomePage from "./Homepage.jsx";
import LoginPage from "./LoginPage.jsx";
import isNavbarAllowed from "../scripts/isNavbarAllowed.js";

const App = () => {
  return (
    <Fragment>
      {<NavBar showHeadBar={!isNavbarAllowed(useLocation().pathname)} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
