import React, { useState, useRef } from "react";
import BookCardList from "./common/BookCardList.jsx";
import Footer from "./common/Footer.jsx";
import Parallax from "./common/Parallax.jsx";
import booksData from "../../bookTransactions.json";

const HomePage = () => {
  const scrollRef = useRef(null);
  const [parallaxState, setParallaxState] = useState(0);
  return (
    <div
      className="home-page"
      ref={scrollRef}
      onScroll={() => {
        setParallaxState(scrollRef.current.scrollTop);
      }}
    >
      <div className="home-page__contents-max-width">
        <header>
          <Parallax parallaxState={parallaxState} />
          <h1>Book, we got it!</h1>
        </header>
        <main>
          <BookCardList title={"TRENDING RIGHT NOW..."} data={booksData} />
          <BookCardList title={"NEW UPLOADS..."} data={booksData} />
        </main>
        <div className="diagonal-separator"></div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
