import React, { useEffect, useState } from "react";

import Pagination from "../commonComponents/pagination/Pagination.jsx";
import ReviewCard from "../commonComponents/reviewCard/ReviewCard.jsx";
import ReviewForm from "./reviewForm/ReviewForm.jsx";

import { getReviews } from "../../services/reviewService.js";
import "./reviewAndTestimonialsPage.scss";

const ReviewsAndTestimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews((res, err) => {
      if (res) {
        setReviews(res.data);
      }
    });
  }, []);

  return (
    <section
      aria-label="reviews and testimonials"
      className="review-and-testimonials-page"
    >
      <div className="review-and-testimonials-page__reviews-section">
        <header>
          <h1>Review And Testimonials</h1>
        </header>
        <main>
          <div className="review-and-testimonials-page__review-list">
            <Pagination insertFooterElement={<ReviewForm />}>
              {reviews.map(({ name, message, star, imgSrc }, index) => (
                <ReviewCard
                  imgSrc={imgSrc}
                  key={index}
                  name={name}
                  review={message}
                  star={star}
                />
              ))}
            </Pagination>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ReviewsAndTestimonials;
