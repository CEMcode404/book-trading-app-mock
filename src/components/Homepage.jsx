import React, { useState, useRef } from "react";
import BookCardList from "./common/BookCardList.jsx";
import Footer from "./common/Footer.jsx";
import Parallax from "./common/Parallax.jsx";

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
      <Parallax parallaxState={parallaxState} />
      <h1>Book, we got it!</h1>
      <BookCardList title={"TRENDING RIGHT NOW..."} />
      <BookCardList title={"NEW UPLOADS..."} />
      <div className="home-page__diagonal-separator"></div>
      <Footer />
    </div>
  );
};

export default HomePage;
