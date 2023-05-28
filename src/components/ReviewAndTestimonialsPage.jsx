import React, { useEffect, useState } from "react";
import Footer from "./common/Footer.jsx";
import ReviewCard from "./common/ReviewCard.jsx";
import reviewDatas from "../../mockDatas/reviewCardComments.json";
import Pagination from "./common/Pagination.jsx";
import ReviewForm from "./common/ReviewForm.jsx";
import { getReviews } from "../services/reviewService.js";

const ReviewsAndTestimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews((res, err) => {
      if (res) {
        setReviews(res.data);
      }
    });
  }, [getReviews]);

  const [currentPage, changeCurrentPageNo] = useState(1);

  const handlePageChange = (e) => {
    //an event or pageNo
    if (e?.target?.textContent)
      return changeCurrentPageNo(parseInt(e.target.textContent));

    changeCurrentPageNo(e);
  };

  const pageShown = 7;
  const itemCount = reviews.length;
  const maxItemsPerPage = 5;

  const startingIndex = maxItemsPerPage * currentPage - maxItemsPerPage;
  const endingIndex = maxItemsPerPage * currentPage;
  const dataOnDisplay = reviews.slice(startingIndex, endingIndex);

  return (
    <section aria-label="reviews and testimonials" className="reviews">
      <div className="reviews__header-main-wrapper">
        <header>
          <h1>Review And Testimonials</h1>
        </header>
        <main>
          <div className="reviews__review-list">
            {dataOnDisplay.map(({ name, message, star, imgSrc }) => (
              <ReviewCard
                name={name}
                review={message}
                star={star}
                imgSrc={imgSrc}
              />
            ))}
            <ReviewForm />
            <Pagination
              pageShown={pageShown}
              itemCount={itemCount}
              currentPage={currentPage}
              maxItemsPerPage={maxItemsPerPage}
              pageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
      <footer>
        <div className="diagonal-separator"></div>
        <Footer />
      </footer>
    </section>
  );
};

export default ReviewsAndTestimonials;
