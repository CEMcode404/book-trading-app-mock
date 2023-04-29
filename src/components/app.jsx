import { Route, Routes, useLocation } from "react-router-dom";
import React, { createContext } from "react";
import NavBar from "./common/NavBar.jsx";
import HomePage from "./Homepage.jsx";
import LoginPage from "./LoginPage.jsx";
import isNavbarAllowed from "../utility/isNavbarAllowed.js";
import SignUpPage from "./SignUpPage.jsx";
import TransactionPage from "./TransactionPage.jsx";
import AccounPage from "./AccountPage.jsx";
import { getCurrentUser } from "../services/authService.js";
import ProtectedRoute from "./common/ProtectedRoute.jsx";

export const UserContext = createContext();

const App = () => {
  return (
    <div className="app">
      <UserContext.Provider value={getCurrentUser()}>
        {<NavBar showHeadBar={!isNavbarAllowed(useLocation().pathname)} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <ProtectedRoute path="/transaction" element={<TransactionPage />} />
          <Route path="/account" element={<AccounPage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
