import React from "react";
import BookCardList from "./common/BookCardList.jsx";
import Footer from "./common/Footer.jsx";
import Parallax from "./common/Parallax.jsx";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* <div className="banner">
        <img className="banner__img" alt=""></img>
      </div> */}
      <Parallax />
      <BookCardList title={"TRENDING RIGHT NOW..."} />
      <BookCardList title={"NEW UPLOADS..."} />
      <Footer />
    </div>
  );
};

export default HomePage;
