import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState } from "react";
import NavBar from "./common/NavBar.jsx";
import HomePage from "./Homepage.jsx";
import LoginPage from "./LoginPage.jsx";
import isNavbarAllowed from "../utility/isNavbarAllowed.js";
import SignUpPage from "./SignUpPage.jsx";
import TransactionPage from "./TransactionPage.jsx";
import AccounPage from "./AccountPage.jsx";
import PolicyPage from "./PolicyPage.jsx";
import ProtectedRoute from "./common/ProtectedRoute.jsx";
import { getCurrentUser } from "../services/tokenService.js";
import { UserContext } from "./context/userContext.js";

const App = () => {
  const [user, changeUser] = useState(getCurrentUser());

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      <div className="app">
        <NavBar showHeadBar={!isNavbarAllowed(useLocation().pathname)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/policies" element={<PolicyPage />} />
          <Route
            path="/transaction"
            element={<ProtectedRoute component={TransactionPage} />}
          />
          <Route
            path="/account"
            element={<ProtectedRoute component={AccounPage} />}
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
