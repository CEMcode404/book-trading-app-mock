import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import AccounPage from "./AccountPage/AccountPage.jsx";
import Footer from "./Footer/Footer.jsx";
import HomePage from "./HomePage/Homepage.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx";
import NavBar from "./navBar/NavBar.jsx";
import NotFoundAndRedirect from "./commonComponents/NotFoundAndRedirect.jsx";
import PolicyPage from "./PolicyPage/PolicyPage.jsx";
import ProtectedRoute from "./commonComponents/ProtectedRoute.jsx";
import ReviewsAndTestimonials from "./ReviewAndTestimonialsPage/ReviewAndTestimonialsPage.jsx";
import SignUpPage from "./SignupPage/SignUpPage.jsx";
import SearchResults from "./SearchResultsPage/SearchResults.jsx";
import TransactionPage from "./TransactionPage/TransactionPage.jsx";

import { getCurrentUser } from "../services/tokenService.js";
import { UserContext } from "./contexts/userContext.js";

const App = () => {
  const [user, changeUser] = useState(getCurrentUser());

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/account"
            element={<ProtectedRoute component={AccounPage} />}
          />
          <Route path="/index" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/policies" element={<PolicyPage />} />
          <Route path="/reviews" element={<ReviewsAndTestimonials />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route
            path="/transaction"
            element={<ProtectedRoute component={TransactionPage} />}
          />
          <Route path="*" element={<NotFoundAndRedirect />} />
        </Routes>
      </div>
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
