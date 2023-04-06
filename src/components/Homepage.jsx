import React from "react";
import BookCardList from "./common/BookCardList.jsx";
import Footer from "./common/Footer.jsx";
import Parallax from "./common/Parallax.jsx";

const HomePage = () => {
  return (
    <div className="home-page">
      <Parallax />
      <BookCardList title={"TRENDING RIGHT NOW..."} />
      <BookCardList title={"NEW UPLOADS..."} />
      <div className="home-page__diagonal-separator"></div>
      <Footer />
    </div>
  );
};

export default HomePage;
