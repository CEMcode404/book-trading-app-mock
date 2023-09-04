import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./common/Footer.jsx";
import Parallax from "./common/Parallax.jsx";
import { getTransactions } from "../services/transactionsService.js";
import ListSlider from "./common/ListSlider.jsx";
import DisplayCard from "./common/DisplayCard.jsx";

const HomePage = () => {
  const scrollRef = useRef(null);
  const [parallaxState, setParallaxState] = useState(0);
  const [trendingBooks, setTrendingBooksData] = useState([]);
  const [newUploads, setNewUploads] = useState([]);

  useEffect(() => {
    getTransactions((res, err) => {
      if (res) {
        const trending = res.data.slice(0, 6);
        const newlyUploaded = res.data.slice(6);
        setTrendingBooksData(trending);
        setNewUploads(newlyUploaded);
      }
    });
  }, []);
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8000/";

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
          <div className="home-page__card-list">
            <h2>TRENDING RIGHT NOW...</h2>
            <ListSlider>
              {trendingBooks.map((bookData, index) => (
                <div
                  key={index}
                  className="home-page__display-card list-slider__item"
                >
                  <DisplayCard
                    imgSrc={
                      bookData?.images && `${baseUrl}${bookData?.images[0]}`
                    }
                    title={bookData?.title}
                    authors={bookData?.authors}
                    _id={bookData?._id}
                    onClick={() => {
                      navigate("/transaction", { state: bookData._id });
                    }}
                  />
                </div>
              ))}
            </ListSlider>
            <h2>NEW UPLOADS...</h2>
            <ListSlider>
              {newUploads.map((bookData, index) => (
                <div
                  key={index}
                  className="home-page__display-card list-slider__item"
                >
                  <DisplayCard
                    imgSrc={bookData?.images && bookData?.images[0]?.img}
                    title={bookData?.title}
                    authors={bookData?.authors}
                    _id={bookData?._id}
                    onClick={() => {
                      navigate("/transaction", { state: bookData._id });
                    }}
                  />
                </div>
              ))}
            </ListSlider>
          </div>
        </main>
        <div className="diagonal-separator"></div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
