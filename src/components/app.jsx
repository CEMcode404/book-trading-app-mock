import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import NavBar from "./common/NavBar.jsx";
import HomePage from "./Homepage.jsx";
import LoginPage from "./LoginPage.jsx";
import isNavbarAllowed from "../utility/isNavbarAllowed.js";
import SignUpPage from "./SignUpPage.jsx";
import TransactionPage from "./TransactionPage.jsx";
import AccounPage from "./AccountPage.jsx";

const App = () => {
  return (
    <div className="app">
      {<NavBar showHeadBar={!isNavbarAllowed(useLocation().pathname)} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/account" element={<AccounPage />} />
      </Routes>
    </div>
  );
};

export default App;
