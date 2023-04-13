import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import NavBar from "./common/NavBar.jsx";
import HomePage from "./Homepage.jsx";
import LoginPage from "./LoginPage.jsx";
import isNavbarAllowed from "../scripts/isNavbarAllowed.js";
import SignUpPage from "./SignUpPage.jsx";

const App = () => {
  return (
    <div className="app">
      {<NavBar showHeadBar={!isNavbarAllowed(useLocation().pathname)} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
