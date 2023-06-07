import React, { useState, useRef, useEffect } from "react";
import DisplayCardList from "./common/DisplayCardList.jsx";
import Footer from "./common/Footer.jsx";
import Parallax from "./common/Parallax.jsx";
import { getTransactions } from "../services/transactionsService.js";

const HomePage = () => {
  const scrollRef = useRef(null);
  const [parallaxState, setParallaxState] = useState(0);
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    getTransactions((res, err) => {
      if (res) {
        setBooksData(res.data.slice(0, 6));
      }
    });
  }, []);

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
          <DisplayCardList title={"TRENDING RIGHT NOW..."} data={booksData} />
          <DisplayCardList title={"NEW UPLOADS..."} data={booksData} />
        </main>
        <div className="diagonal-separator"></div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
