import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import NavBar from "./common/NavBar.jsx";
import HomePage from "./Homepage.jsx";
import LoginPage from "./LoginPage.jsx";
import SignUpPage from "./SignUpPage.jsx";
import TransactionPage from "./TransactionPage.jsx";
import AccounPage from "./AccountPage.jsx";
import PolicyPage from "./PolicyPage.jsx";
import ReviewsAndTestimonials from "./ReviewAndTestimonialsPage.jsx";
import ProtectedRoute from "./common/ProtectedRoute.jsx";
import { getCurrentUser } from "../services/tokenService.js";
import { UserContext } from "./context/userContext.js";
import SearchResults from "./SearchResults.jsx";
import Footer from "./common/Footer.jsx";
import NotFoundAndRedirect from "./NotFoundAndRedirect.jsx";

const App = () => {
  const [user, changeUser] = useState(getCurrentUser());

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/policies" element={<PolicyPage />} />
          <Route path="/reviews" element={<ReviewsAndTestimonials />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route
            path="/transaction"
            element={<ProtectedRoute component={TransactionPage} />}
          />
          <Route
            path="/account"
            element={<ProtectedRoute component={AccounPage} />}
          />
          <Route path="*" element={<NotFoundAndRedirect />} />
        </Routes>
      </div>
      <Footer></Footer>
    </UserContext.Provider>
  );
};

export default App;
